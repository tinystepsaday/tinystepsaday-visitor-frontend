import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getSubscription } from "@/utils/localStorage";

type User = {
  id: string;
  name: string;
  email: string;
  role?: string;
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
  login: (user: User) => void;
  logout: () => void;
  checkSubscription: () => void;
  checkAdminStatus: (email: string, password: string) => boolean;
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
      
      login: (user) => {
        // Check if user is admin
        const isAdmin = user.email === 'admin@gmail.com' && user.role === 'admin';
        set({ 
          user, 
          isLoggedIn: true,
          isAdmin
        });
        
        // Also check subscription status
        get().checkSubscription();
        
        // Store in localStorage for persistence across page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('isLoggedIn', 'true');
        if (isAdmin) {
          localStorage.setItem('isAdmin', 'true');
        }
      },
      
      logout: () => {
        set({ 
          user: null, 
          isLoggedIn: false,
          isAdmin: false
        });
        
        // Clear from localStorage
        localStorage.removeItem('user');
        localStorage.setItem('isLoggedIn', 'false');
        localStorage.removeItem('isAdmin');
      },
      
      checkSubscription: () => {
        const subscription = getSubscription();
        set({ 
          subscription,
          hasActiveSubscription: subscription.type !== 'free'
        });
      },
      
      checkAdminStatus: (email, password) => {
        if (email === 'admin@gmail.com' && password === 'Admin123!') {
          set({ isAdmin: true });
          return true;
        }
        return false;
      }
    }),
    {
      name: "auth-storage",
    }
  )
);
