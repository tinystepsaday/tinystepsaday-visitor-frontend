import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getSubscription } from "@/utils/localStorage";
import { login as loginApi, logout as logoutApi, signup as signupApi, LoginResponse, SignupResponse, SignupRequest } from "@/integration/auth";
import apiClient from "@/integration/apiClient";

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
  isSuperAdmin: boolean;
  isModerator: boolean;
  isInstructor: boolean;
  subscription: Subscription;
  hasActiveSubscription: boolean;
  isLoading: boolean;
  rememberMe: boolean;
  lastUserSync: number | null;
  isSyncingUser: boolean;
  
  // Core auth methods
  initializeAuth: () => void;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<{ success: boolean; message: string; user?: User }>;
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
  
  // Token management
  checkTokenValidity: () => boolean;
  getTokenExpirationInfo: () => { isExpired: boolean; expiresIn: number; expiresAt: Date } | null;
  startTokenMonitoring: () => void;
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
      isSuperAdmin: false,
      isModerator: false,
      isInstructor: false,
      subscription: initialSubscription,
      hasActiveSubscription: initialSubscription.type !== 'free',
      isLoading: false,
      rememberMe: false,
      lastUserSync: null,
      isSyncingUser: false,
      
      // Initialize auth state from localStorage with token validation
      initializeAuth: () => {
        if (typeof window === 'undefined') return;
        
        try {
          const storedUser = localStorage.getItem('user');
          const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
          
          // Check if user is actually authenticated with valid tokens
          const isAuthenticated = apiClient.isAuthenticated();
          
          if (storedUser && isLoggedIn && isAuthenticated) {
            const user = JSON.parse(storedUser);
            const isAdmin = user.role === 'ADMIN';
            const isSuperAdmin = user.role === 'SUPER_ADMIN';
            const isModerator = user.role === 'MODERATOR';
            const isInstructor = user.role === 'INSTRUCTOR';
            
            console.log('AuthStore: Initializing from localStorage with valid tokens', { user, isLoggedIn });
            set({ 
              user, 
              isLoggedIn, 
              isAdmin, 
              isSuperAdmin, 
              isModerator, 
              isInstructor,
              isLoading: false 
            });
            
            // Start token monitoring
            get().startTokenMonitoring();
          } else {
            console.log('AuthStore: No valid auth data found, clearing state');
            get().clearAuth();
          }
        } catch (error) {
          console.error('AuthStore: Error initializing from localStorage', error);
          get().clearAuth();
        }
      },
      
      login: async (email: string, password: string, rememberMe: boolean = false) => {
        set({ isLoading: true });
        
        try {
          const response: LoginResponse = await loginApi({ email, password, rememberMe });
          
          if (response.success && response.data) {
            const { user } = response.data;
            
            // Check if user is admin
            const isAdmin = user.role === 'ADMIN';
            const isSuperAdmin = user.role === 'SUPER_ADMIN';
            const isModerator = user.role === 'MODERATOR';
            const isInstructor = user.role === 'INSTRUCTOR';
            
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
              isSuperAdmin,
              isModerator,
              isInstructor,
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
            if (isSuperAdmin) {
              localStorage.setItem('isSuperAdmin', 'true');
            }
            if (isModerator) {
              localStorage.setItem('isModerator', 'true');
            }
            if (isInstructor) {
              localStorage.setItem('isInstructor', 'true');
            }
            
            // Check subscription status
            get().checkSubscription();
            
            // Start token monitoring
            get().startTokenMonitoring();
            
            // Sync user data from server
            setTimeout(() => {
              get().syncUserData();
            }, 1000);
            
            return { success: true, message: response.message, user: userWithName };
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
          isSuperAdmin: false,
          isModerator: false,
          isInstructor: false,
          isLoading: false,
          lastUserSync: null,
          isSyncingUser: false
        });
        
        // Clear from localStorage
        localStorage.removeItem('user');
        localStorage.setItem('isLoggedIn', 'false');
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('isSuperAdmin');
        localStorage.removeItem('isModerator');
        localStorage.removeItem('isInstructor');
        
        // Clear tokens using the token manager
        apiClient.getTokenManager().clearTokens();
      },
      
      setUser: (user: User) => {
        const isAdmin = user.role === 'ADMIN';
        const isSuperAdmin = user.role === 'SUPER_ADMIN';
        const isModerator = user.role === 'MODERATOR';
        const isInstructor = user.role === 'INSTRUCTOR';
        set({ 
          user, 
          isLoggedIn: true,
          isAdmin,
          isSuperAdmin,
          isModerator,
          isInstructor,
          lastUserSync: Date.now()
        });
        
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('isLoggedIn', 'true');
        if (isAdmin) {
          localStorage.setItem('isAdmin', 'true');
        }
        if (isSuperAdmin) {
          localStorage.setItem('isSuperAdmin', 'true');
        }
        if (isModerator) {
          localStorage.setItem('isModerator', 'true');
        }
        if (isInstructor) {
          localStorage.setItem('isInstructor', 'true');
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
          // Check if we're still authenticated
          if (!apiClient.isAuthenticated()) {
            console.log('User no longer authenticated during sync');
            get().clearAuth();
            return false;
          }
          
          // Fetch fresh user data from server
          const response = await apiClient.get<{ success: boolean; data?: User; message?: string }>('/api/users/me');
          
          if (response.success && response.data) {
            const updatedUser = {
              ...response.data,
              lastDataSync: new Date().toISOString()
            };
            
            get().setUser(updatedUser);
            set({ isSyncingUser: false, lastUserSync: now });
            return true;
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
          return await apiClient.refreshTokens();
        } catch (error) {
          console.error('Token refresh failed:', error);
          return false;
        }
      },
      
      setRememberMe: (rememberMe: boolean) => {
        set({ rememberMe });
      },
      
      // Token management methods
      checkTokenValidity: () => {
        return apiClient.isAuthenticated();
      },
      
      getTokenExpirationInfo: () => {
        return apiClient.getTokenExpirationInfo();
      },
      
      // Start monitoring token expiration
      startTokenMonitoring: () => {
        if (typeof window === 'undefined') return;
        
        // Check token every minute
        const interval = setInterval(() => {
          const { isLoggedIn } = get();
          
          if (!isLoggedIn) {
            clearInterval(interval);
            return;
          }
          
          const expirationInfo = apiClient.getTokenExpirationInfo();
          
          if (!expirationInfo) {
            console.log('No valid token found, logging out');
            get().clearAuth();
            clearInterval(interval);
            return;
          }
          
          // If token expires in less than 5 minutes, refresh it
          if (expirationInfo.expiresIn < 300 && expirationInfo.expiresIn > 0) {
            console.log('Token expiring soon, refreshing...');
            get().refreshToken();
          }
          
          // If token is expired, logout
          if (expirationInfo.isExpired) {
            console.log('Token expired, logging out');
            get().clearAuth();
            clearInterval(interval);
          }
        }, 60000); // Check every minute
        
        // Store interval ID for cleanup
        (window as Window & { __tokenMonitoringInterval?: NodeJS.Timeout }).__tokenMonitoringInterval = interval;
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
        isSuperAdmin: state.isSuperAdmin,
        isModerator: state.isModerator,
        isInstructor: state.isInstructor,
        subscription: state.subscription,
        hasActiveSubscription: state.hasActiveSubscription,
        rememberMe: state.rememberMe,
        lastUserSync: state.lastUserSync
      })
    }
  )
);
