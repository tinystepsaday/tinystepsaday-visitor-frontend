import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getSubscription } from "@/utils/localStorage";
import { login as loginApi, logout as logoutApi, signup as signupApi, LoginResponse, SignupResponse, SignupRequest } from "@/integration/auth";

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
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  signup: (userData: SignupRequest) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  checkSubscription: () => void;
  setUser: (user: User) => void;
  clearAuth: () => void;
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
      
      login: async (email: string, password: string) => {
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
              avatar: (user as User).avatar || ''
            };
            
            set({ 
              user: userWithName, 
              isLoggedIn: true,
              isAdmin,
              isLoading: false
            });
            
            // Store in localStorage for persistence
            localStorage.setItem('user', JSON.stringify(userWithName));
            localStorage.setItem('isLoggedIn', 'true');
            if (isAdmin) {
              localStorage.setItem('isAdmin', 'true');
            }
            
            // Check subscription status
            get().checkSubscription();
            
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
          isLoading: false
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
          isAdmin
        });
        
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('isLoggedIn', 'true');
        if (isAdmin) {
          localStorage.setItem('isAdmin', 'true');
        }
      },
      
      checkSubscription: () => {
        const subscription = getSubscription();
        set({ 
          subscription,
          hasActiveSubscription: subscription.type !== 'free'
        });
      }
    }),
    {
      name: "auth-storage",
    }
  )
);
