import { useAuthStore } from "@/store/authStore";

class TokenManager {
  private refreshTimeout: NodeJS.Timeout | null = null;
  private refreshInterval: NodeJS.Timeout | null = null;

  /**
   * Get the current authentication token
   */
  getAuthToken(): string | null {
    // Check if we're in a browser environment before accessing localStorage
    if (typeof window === 'undefined') {
      return null;
    }
    return localStorage.getItem('accessToken');
  }

  /**
   * Set authentication tokens and sync with server
   */
  async setAuthTokens(accessToken: string, refreshToken: string): Promise<void> {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
      return;
    }

    // Store in localStorage
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    // Sync with server-side HTTP-only cookies
    try {
      await fetch('/api/auth/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accessToken, refreshToken }),
      });
    } catch (error) {
      console.error('Failed to sync tokens with server:', error);
    }
  }

  /**
   * Clear authentication tokens and sync with server
   */
  async clearAuthTokens(): Promise<void> {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
      return;
    }

    // Clear from localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    // Clear from server-side HTTP-only cookies
    try {
      await fetch('/api/auth/sync', {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('Failed to clear tokens from server:', error);
    }
  }

  /**
   * Initialize token manager with automatic refresh
   */
  async initialize() {
    // Check if we're in a browser environment before accessing localStorage
    if (typeof window === 'undefined') {
      return;
    }
    
    const token = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    
    if (token && refreshToken) {
      // Sync with server-side cookies
      try {
        await fetch('/api/auth/sync', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ accessToken: token, refreshToken }),
        });
      } catch (error) {
        console.error('Failed to sync tokens during initialization:', error);
      }

      // Set up automatic token refresh
      this.setupAutoRefresh();
    }
  }

  /**
   * Set up automatic token refresh
   */
  private setupAutoRefresh() {
    // Check if we're in a browser environment before accessing localStorage
    if (typeof window === 'undefined') {
      return;
    }
    
    // Clear any existing intervals
    this.clearRefreshIntervals();

    // Refresh token every 29 minutes (before the 30-minute expiry)
    this.refreshInterval = setInterval(() => {
      this.refreshToken();
    }, 29 * 60 * 1000); // 29 minutes

    // Also set up a one-time refresh for when the token is about to expire 
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expiresAt = payload.exp * 1000; // Convert to milliseconds
        const now = Date.now();
        const timeUntilExpiry = expiresAt - now;
        
        // If token expires in less than 29 minutes, refresh immediately
        if (timeUntilExpiry < 29 * 60 * 1000) {
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
        // Get the new tokens from localStorage (they were updated by the refreshToken method)
        const newAccessToken = localStorage.getItem('accessToken');
        const newRefreshToken = localStorage.getItem('refreshToken');
        
        if (newAccessToken && newRefreshToken) {
          // Sync new tokens with server
          await this.setAuthTokens(newAccessToken, newRefreshToken);
        }
        
        // Set up next refresh
        this.setupAutoRefresh();
        return true;
      } else {
        // Refresh failed, clear auth
        await this.clearAuth();
        return false;
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
      await this.clearAuth();
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
  private async clearAuth() {
    this.clearRefreshIntervals();
    useAuthStore.getState().clearAuth();
    
    // Clear tokens from both client and server
    await this.clearAuthTokens();
    
    // Only redirect if not already on login page
    if (typeof window !== 'undefined' && window.location.pathname && !window.location.pathname.includes('/auth/login')) {
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