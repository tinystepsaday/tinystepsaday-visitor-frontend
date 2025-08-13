import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { jwtDecode } from 'jwt-decode';

// Token management utilities
interface TokenPayload {
  userId: string;
  email: string;
  username: string;
  role: string;
  sessionId: string;
  type: 'access' | 'refresh';
  exp: number;
  iat: number;
}

interface TokenInfo {
  token: string;
  expiresAt: number;
  isExpired: boolean;
  expiresIn: number; // seconds until expiration
}

class TokenManager {
  private static instance: TokenManager;
  private refreshPromise: Promise<boolean> | null = null;

  private constructor() { }

  static getInstance(): TokenManager {
    if (!TokenManager.instance) {
      TokenManager.instance = new TokenManager();
    }
    return TokenManager.instance;
  }

  getAccessToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('accessToken');
  }

  getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('refreshToken');
  }

  setTokens(accessToken: string, refreshToken: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    // Also set cookies for server-side authentication
    // Use httpOnly: false so server-side can read them
    if (typeof document !== 'undefined' && typeof window !== 'undefined') {
      document.cookie = `accessToken=${accessToken}; path=/; max-age=1800; SameSite=Lax; secure=${window.location.protocol === 'https:'}`;
      document.cookie = `refreshToken=${refreshToken}; path=/; max-age=604800; SameSite=Lax; secure=${window.location.protocol === 'https:'}`;
    }

    console.log('Frontend Debug - Tokens set in localStorage and cookies');
    console.log('Frontend Debug - accessToken length:', accessToken.length);
    console.log('Frontend Debug - refreshToken length:', refreshToken.length);
  }

  clearTokens(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    // Also clear cookies
    if (typeof document !== 'undefined') {
      document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      document.cookie = 'refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
  }

  getTokenInfo(token: string): TokenInfo | null {
    try {
      const decoded = jwtDecode<TokenPayload>(token);
      const now = Math.floor(Date.now() / 1000);
      const expiresIn = decoded.exp - now;

      return {
        token,
        expiresAt: decoded.exp * 1000, // Convert to milliseconds
        isExpired: expiresIn <= 0,
        expiresIn: Math.max(0, expiresIn)
      };
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  isTokenExpired(token: string): boolean {
    const tokenInfo = this.getTokenInfo(token);
    return tokenInfo?.isExpired ?? true;
  }

  isTokenExpiringSoon(token: string, thresholdSeconds: number = 300): boolean {
    const tokenInfo = this.getTokenInfo(token);
    return tokenInfo ? tokenInfo.expiresIn <= thresholdSeconds : true;
  }

  async refreshTokens(): Promise<boolean> {
    // Prevent multiple simultaneous refresh attempts
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = this.performTokenRefresh();
    try {
      const result = await this.refreshPromise;
      return result;
    } finally {
      this.refreshPromise = null;
    }
  }

  private async performTokenRefresh(): Promise<boolean> {
    try {
      const refreshToken = this.getRefreshToken();
      if (!refreshToken) {
        console.error('No refresh token available');
        return false;
      }

      // Check if refresh token is expired
      if (this.isTokenExpired(refreshToken)) {
        console.error('Refresh token is expired');
        this.handleTokenExpiration();
        return false;
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/refresh-token`,
        { refreshToken },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success && response.data.data) {
        const { token: newAccessToken, refreshToken: newRefreshToken } = response.data.data;
        this.setTokens(newAccessToken, newRefreshToken);

        console.log('Tokens refreshed successfully');
        return true;
      }

      return false;
    } catch (error) {
      console.error('Token refresh failed:', error);
      this.handleTokenExpiration();
      return false;
    }
  }

  public handleTokenExpiration(): void {
    this.clearTokens();

    // Clear user data
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
      localStorage.setItem('isLoggedIn', 'false');
      localStorage.removeItem('isAdmin');
      localStorage.removeItem('isSuperAdmin');
      localStorage.removeItem('isModerator');
      localStorage.removeItem('isInstructor');

      // Redirect to login page
      // Only redirect to login page if not on a public page
      if (typeof window !== 'undefined' &&
        window.location.pathname !== '/auth/login' &&
        !window.location.pathname.includes('/blog/') &&  // Don't redirect from blog posts
        !window.location.pathname.includes('/about') &&  // Don't redirect from public pages
        !window.location.pathname.includes('/contact') &&
        !window.location.pathname.includes('/courses') &&
        !window.location.pathname.includes('/pricing')) {
        window.location.href = '/auth/login';
      }
    }
  }
}

// Enhanced API client with automatic token management
class ApiClient {
  private axiosInstance: AxiosInstance;
  private tokenManager: TokenManager;

  constructor() {
    this.tokenManager = TokenManager.getInstance();

    this.axiosInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor - add tokens and handle pre-flight refresh
    this.axiosInstance.interceptors.request.use(
      async (config) => {
        const accessToken = this.tokenManager.getAccessToken();

        if (accessToken) {
          // Check if token is expiring soon (within 5 minutes)
          if (this.tokenManager.isTokenExpiringSoon(accessToken, 300)) {
            console.log('Token expiring soon, refreshing...');
            await this.tokenManager.refreshTokens();
          }

          // Add the current (or newly refreshed) access token
          const currentToken = this.tokenManager.getAccessToken();
          if (currentToken) {
            config.headers.Authorization = `Bearer ${currentToken}`;
          }
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor - handle token refresh on 401 errors
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        // Check for new tokens in response headers (from auto-refresh middleware)
        const newAccessToken = response.headers['x-new-access-token'];
        const newRefreshToken = response.headers['x-new-refresh-token'];

        if (newAccessToken && newRefreshToken) {
          this.tokenManager.setTokens(newAccessToken, newRefreshToken);
          console.log('New tokens received from server');
        }

        return response;
      },
      async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          const refreshToken = this.tokenManager.getRefreshToken();
          if (refreshToken && !this.tokenManager.isTokenExpired(refreshToken)) {
            try {
              // Try to refresh tokens
              const refreshSuccess = await this.tokenManager.refreshTokens();

              if (refreshSuccess) {
                // Retry the original request with new token
                const newAccessToken = this.tokenManager.getAccessToken();
                if (newAccessToken) {
                  originalRequest.headers = originalRequest.headers || {};
                  originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                  return this.axiosInstance(originalRequest);
                }
              }
            } catch (refreshError) {
              console.error('Token refresh failed during request retry:', refreshError);
            }
          }

          // If refresh failed or no refresh token, handle expiration
          this.tokenManager.handleTokenExpiration();
        }

        return Promise.reject(error);
      }
    );
  }

  // Public methods for making API calls
  async get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.get<T>(url, config);
    return response.data;
  }

  async post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, data, config);
    return response.data;
  }

  async put<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.put<T>(url, data, config);
    return response.data;
  }

  async patch<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.patch<T>(url, data, config);
    return response.data;
  }

  async delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.delete<T>(url, config);
    return response.data;
  }

  // Utility methods
  getTokenManager(): TokenManager {
    return this.tokenManager;
  }

  // Method to manually refresh tokens (for use in auth store)
  async refreshTokens(): Promise<boolean> {
    return this.tokenManager.refreshTokens();
  }

  // Method to check if user is authenticated
  isAuthenticated(): boolean {
    const accessToken = this.tokenManager.getAccessToken();
    return accessToken ? !this.tokenManager.isTokenExpired(accessToken) : false;
  }

  // Method to get token expiration info
  getTokenExpirationInfo(): { isExpired: boolean; expiresIn: number; expiresAt: Date } | null {
    const accessToken = this.tokenManager.getAccessToken();
    if (!accessToken) return null;

    const tokenInfo = this.tokenManager.getTokenInfo(accessToken);
    if (!tokenInfo) return null;

    return {
      isExpired: tokenInfo.isExpired,
      expiresIn: tokenInfo.expiresIn,
      expiresAt: new Date(tokenInfo.expiresAt)
    };
  }
}

// Create singleton instance
const apiClient = new ApiClient();

export default apiClient;
export { TokenManager }; 