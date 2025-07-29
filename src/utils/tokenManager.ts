import { useAuthStore } from "@/store/authStore";

class TokenManager {
  private refreshTimeout: NodeJS.Timeout | null = null;
  private refreshInterval: NodeJS.Timeout | null = null;

  /**
   * Get the current authentication token
   */
  getAuthToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  /**
   * Initialize token manager with automatic refresh
   */
  async initialize() {
    const token = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    
    if (token && refreshToken) {
      // Set up automatic token refresh
      this.setupAutoRefresh();
    }
  }

  /**
   * Set up automatic token refresh
   */
  private setupAutoRefresh() {
    // Clear any existing intervals
    this.clearRefreshIntervals();

    // Refresh token every 14 minutes (before the 15-minute expiry)
    this.refreshInterval = setInterval(() => {
      this.refreshToken();
    }, 14 * 60 * 1000); // 14 minutes

    // Also set up a one-time refresh for when the token is about to expire
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expiresAt = payload.exp * 1000; // Convert to milliseconds
        const now = Date.now();
        const timeUntilExpiry = expiresAt - now;
        
        // If token expires in less than 14 minutes, refresh immediately
        if (timeUntilExpiry < 14 * 60 * 1000) {
          this.refreshToken();
        } else {
          // Set timeout to refresh just before expiry
          this.refreshTimeout = setTimeout(() => {
            this.refreshToken();
          }, timeUntilExpiry - 60 * 1000); // 1 minute before expiry
        }
      } catch (error) {
        console.error('Error parsing token:', error);
        // If token is invalid, try to refresh immediately
        this.refreshToken();
      }
    }
  }

  /**
   * Refresh the access token
   */
  async refreshToken(): Promise<boolean> {
    try {
      const success = await useAuthStore.getState().refreshToken();
      
      if (success) {
        // Set up next refresh
        this.setupAutoRefresh();
        return true;
      } else {
        // Refresh failed, clear auth
        this.clearAuth();
        return false;
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
      this.clearAuth();
      return false;
    }
  }

  /**
   * Clear refresh intervals and timeouts
   */
  private clearRefreshIntervals() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
      this.refreshInterval = null;
    }
    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout);
      this.refreshTimeout = null;
    }
  }

  /**
   * Clear authentication and redirect to login
   */
  private clearAuth() {
    this.clearRefreshIntervals();
    useAuthStore.getState().clearAuth();
    
    // Only redirect if not already on login page
    if (typeof window !== 'undefined' && !window.location.pathname.includes('/auth/login')) {
      window.location.href = '/auth/login';
    }
  }

  /**
   * Clean up token manager
   */
  cleanup() {
    this.clearRefreshIntervals();
  }

  /**
   * Check if user should be remembered
   */
  shouldRememberUser(): boolean {
    return useAuthStore.getState().rememberMe;
  }

  /**
   * Set remember me preference
   */
  setRememberMe(rememberMe: boolean) {
    useAuthStore.getState().setRememberMe(rememberMe);
  }
}

// Create singleton instance
const tokenManager = new TokenManager();

// Export the getAuthToken function for direct import
export const getAuthToken = () => tokenManager.getAuthToken();

export default tokenManager; 