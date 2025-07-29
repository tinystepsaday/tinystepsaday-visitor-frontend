import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getSubscription } from "@/utils/localStorage";
import { login as loginApi, logout as logoutApi, signup as signupApi, refreshToken as refreshTokenApi, LoginResponse, SignupResponse, SignupRequest } from "@/integration/auth";

// Enhanced User type with subscription and permissions
type User = {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  role: string;
  isEmailVerified: boolean;
  twoFactorEnabled: boolean;
  lastLogin: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  // Enhanced fields for better access control
  permissions?: string[];
  subscriptionTier?: 'free' | 'starter' | 'transformation' | 'complete';
  subscriptionStatus?: 'active' | 'cancelled' | 'expired' | 'pending';
  subscriptionExpiry?: string;
  lastDataSync?: string;
};

type Subscription = {
  type: string;
  billingCycle: string;
  startDate: string | null;
  price: string | null;
};

type AuthStore = {
  user: User | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
  subscription: Subscription;
  hasActiveSubscription: boolean;
  isLoading: boolean;
  rememberMe: boolean;
  lastUserSync: number | null;
  isSyncingUser: boolean;
  
  // Core auth methods
  login: (email: string, password: string, rememberMe?: boolean) => Promise<{ success: boolean; message: string }>;
  signup: (userData: SignupRequest) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<boolean>;
  
  // Enhanced user management
  syncUserData: () => Promise<boolean>;
  updateUserData: (userData: Partial<User>) => void;
  checkSubscription: () => void;
  setUser: (user: User) => void;
  clearAuth: () => void;
  setRememberMe: (rememberMe: boolean) => void;
  
  // Access control helpers
  hasPermission: (permission: string) => boolean;
  hasSubscription: (tier?: string) => boolean;
  isSubscriptionActive: () => boolean;
};

// Initialize with data from localStorage if available
const initialSubscription = typeof window !== "undefined"
  ? getSubscription()
  : { type: "free", billingCycle: "monthly", startDate: null, price: null };

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,
      isAdmin: false,
      subscription: initialSubscription,
      hasActiveSubscription: initialSubscription.type !== 'free',
      isLoading: false,
      rememberMe: false,
      lastUserSync: null,
      isSyncingUser: false,
      
      login: async (email: string, password: string, rememberMe: boolean = false) => {
        set({ isLoading: true });
        
        try {
          const response: LoginResponse = await loginApi({ email, password });
          
          if (response.success && response.data) {
            const { user, token, refreshToken } = response.data;
            
            // Store tokens
            localStorage.setItem('accessToken', token);
            localStorage.setItem('refreshToken', refreshToken);
            
            // Check if user is admin
            const isAdmin = user.role === 'ADMIN';
            
            // Create user object with name
            const userWithName = {
              ...user,
              username: `${user.firstName} ${user.lastName}`.trim() || user.username,
              avatar: (user as User).avatar || '',
              lastDataSync: new Date().toISOString()
            };
            
            set({ 
              user: userWithName, 
              isLoggedIn: true,
              isAdmin,
              rememberMe,
              isLoading: false,
              lastUserSync: Date.now()
            });
            
            // Store in localStorage for persistence
            localStorage.setItem('user', JSON.stringify(userWithName));
            localStorage.setItem('isLoggedIn', 'true');
            if (isAdmin) {
              localStorage.setItem('isAdmin', 'true');
            }
            
            // Check subscription status
            get().checkSubscription();
            
            // Sync user data from server
            setTimeout(() => {
              get().syncUserData();
            }, 1000);
            
            return { success: true, message: response.message };
          } else {
            set({ isLoading: false });
            return { 
              success: false, 
              message: response.message || 'Login failed' 
            };
          }
        } catch (error: unknown) {
          set({ isLoading: false });
          
          if (error && typeof error === 'object' && 'response' in error) {
            const errorData = (error as { response: { data: { message?: string } } }).response.data;
            return { 
              success: false, 
              message: errorData.message || 'Login failed' 
            };
          }
          
          return { 
            success: false, 
            message: 'Network error. Please try again.' 
          };
        }
      },
      
      signup: async (userData: SignupRequest) => {
        set({ isLoading: true });
        
        try {
          const response: SignupResponse = await signupApi(userData);
          
          if (response.success && response.data) {
            set({ isLoading: false });
            return { success: true, message: response.message };
          } else {
            set({ isLoading: false });
            return { 
              success: false, 
              message: response.message || 'Signup failed' 
            };
          }
        } catch (error: unknown) {
          set({ isLoading: false });
          
          if (error && typeof error === 'object' && 'response' in error) {
            const errorData = (error as { response: { data: { message?: string; details?: Array<{ field: string; message: string }> } } }).response.data;
            
            // Handle validation errors
            if (errorData.details && errorData.details.length > 0) {
              const fieldErrors = errorData.details.map(detail => `${detail.field}: ${detail.message}`).join(', ');
              return { 
                success: false, 
                message: fieldErrors 
              };
            }
            
            return { 
              success: false, 
              message: errorData.message || 'Signup failed' 
            };
          }
          
          return { 
            success: false, 
            message: 'Network error. Please try again.' 
          };
        }
      },
      
      logout: async () => {
        try {
          await logoutApi();
        } catch (error) {
          console.error("Logout error:", error);
        } finally {
          get().clearAuth();
        }
      },
      
      clearAuth: () => {
        set({ 
          user: null, 
          isLoggedIn: false,
          isAdmin: false,
          isLoading: false,
          lastUserSync: null,
          isSyncingUser: false
        });
        
        // Clear from localStorage
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.setItem('isLoggedIn', 'false');
        localStorage.removeItem('isAdmin');
      },
      
      setUser: (user: User) => {
        const isAdmin = user.role === 'ADMIN';
        set({ 
          user, 
          isLoggedIn: true,
          isAdmin,
          lastUserSync: Date.now()
        });
        
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('isLoggedIn', 'true');
        if (isAdmin) {
          localStorage.setItem('isAdmin', 'true');
        }
      },
      
      // Enhanced user data synchronization
      syncUserData: async () => {
        const { isLoggedIn, lastUserSync } = get();
        
        // Don't sync if not logged in
        if (!isLoggedIn) return false;
        
        // Don't sync too frequently (max once every 5 minutes)
        const now = Date.now();
        if (lastUserSync && (now - lastUserSync) < 5 * 60 * 1000) {
          return true;
        }
        
        set({ isSyncingUser: true });
        
        try {
          const token = localStorage.getItem('accessToken');
          if (!token) {
            set({ isSyncingUser: false });
            return false;
          }
          
          // Fetch fresh user data from server
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          
          if (response.ok) {
            const data = await response.json();
            if (data.success && data.data) {
              const updatedUser = {
                ...data.data,
                lastDataSync: new Date().toISOString()
              };
              
              get().setUser(updatedUser);
              set({ isSyncingUser: false, lastUserSync: now });
              return true;
            }
          } else if (response.status === 401) {
            // Token expired, try to refresh
            const refreshSuccess = await get().refreshToken();
            if (refreshSuccess) {
              // Retry sync with new token
              return await get().syncUserData();
            } else {
              // Refresh failed, logout
              get().clearAuth();
              return false;
            }
          }
          
          set({ isSyncingUser: false });
          return false;
        } catch (error) {
          console.error('Error syncing user data:', error);
          set({ isSyncingUser: false });
          return false;
        }
      },
      
      updateUserData: (userData: Partial<User>) => {
        const { user } = get();
        if (user) {
          const updatedUser = {
            ...user,
            ...userData,
            lastDataSync: new Date().toISOString()
          };
          get().setUser(updatedUser);
        }
      },
      
      checkSubscription: () => {
        const subscription = getSubscription();
        set({ 
          subscription,
          hasActiveSubscription: subscription.type !== 'free'
        });
      },
      
      refreshToken: async () => {
        try {
          const refreshToken = localStorage.getItem('refreshToken');
          if (!refreshToken) {
            return false;
          }
          
          const response = await refreshTokenApi(refreshToken);
          if (response.success && response.data) {
            const { token, refreshToken: newRefreshToken } = response.data;
            
            // Update tokens
            localStorage.setItem('accessToken', token);
            localStorage.setItem('refreshToken', newRefreshToken);
            
            return true;
          }
          return false;
        } catch (error) {
          console.error('Token refresh failed:', error);
          return false;
        }
      },
      
      setRememberMe: (rememberMe: boolean) => {
        set({ rememberMe });
      },
      
      // Access control helpers
      hasPermission: (permission: string) => {
        const { user } = get();
        if (!user || !user.permissions) return false;
        return user.permissions.includes(permission);
      },
      
      hasSubscription: (tier?: string) => {
        const { user, hasActiveSubscription } = get();
        if (!hasActiveSubscription) return false;
        if (!tier) return true;
        return user?.subscriptionTier === tier;
      },
      
      isSubscriptionActive: () => {
        const { user } = get();
        if (!user?.subscriptionStatus) return false;
        return user.subscriptionStatus === 'active';
      }
    }),
    {
      name: "auth-storage",
      // Only persist non-sensitive data
      partialize: (state) => ({
        user: state.user ? {
          id: state.user.id,
          email: state.user.email,
          username: state.user.username,
          firstName: state.user.firstName,
          lastName: state.user.lastName,
          avatar: state.user.avatar,
          role: state.user.role,
          isEmailVerified: state.user.isEmailVerified,
          twoFactorEnabled: state.user.twoFactorEnabled,
          lastLogin: state.user.lastLogin,
          isActive: state.user.isActive,
          createdAt: state.user.createdAt,
          updatedAt: state.user.updatedAt,
          permissions: state.user.permissions,
          subscriptionTier: state.user.subscriptionTier,
          subscriptionStatus: state.user.subscriptionStatus,
          subscriptionExpiry: state.user.subscriptionExpiry,
          lastDataSync: state.user.lastDataSync
        } : null,
        isLoggedIn: state.isLoggedIn,
        isAdmin: state.isAdmin,
        subscription: state.subscription,
        hasActiveSubscription: state.hasActiveSubscription,
        rememberMe: state.rememberMe,
        lastUserSync: state.lastUserSync
      })
    }
  )
);
