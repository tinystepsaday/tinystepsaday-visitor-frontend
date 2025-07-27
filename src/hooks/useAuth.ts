import { useEffect, useCallback } from 'react';
import { useAuthStore } from '@/store/authStore';
import tokenManager from '@/utils/tokenManager';

export const useAuth = () => {
  const { 
    user, 
    isLoggedIn, 
    isAdmin, 
    isLoading, 
    rememberMe,
    login, 
    logout, 
    refreshToken,
    setRememberMe 
  } = useAuthStore();

  // Initialize token manager on mount
  useEffect(() => {
    if (isLoggedIn) {
      tokenManager.initialize();
    }

    // Cleanup on unmount
    return () => {
      tokenManager.cleanup();
    };
  }, [isLoggedIn]);

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('accessToken');
      const refreshTokenValue = localStorage.getItem('refreshToken');
      
      if (token && refreshTokenValue && !isLoggedIn) {
        // Try to refresh token to restore session
        const success = await refreshToken();
        if (!success) {
          // If refresh fails, clear auth
          logout();
        }
      }
    };

    checkAuth();
  }, [isLoggedIn, refreshToken, logout]);

  // Manual token refresh
  const handleRefreshToken = useCallback(async () => {
    return await tokenManager.refreshToken();
  }, []);

  // Enhanced login with remember me
  const handleLogin = useCallback(async (email: string, password: string, rememberMe: boolean = false) => {
    const result = await login(email, password, rememberMe);
    
    if (result.success) {
      // Initialize token manager after successful login
      await tokenManager.initialize();
    }
    
    return result;
  }, [login]);

  // Enhanced logout
  const handleLogout = useCallback(async () => {
    tokenManager.cleanup();
    await logout();
  }, [logout]);

  return {
    user,
    isLoggedIn,
    isAdmin,
    isLoading,
    rememberMe,
    login: handleLogin,
    logout: handleLogout,
    refreshToken: handleRefreshToken,
    setRememberMe,
    // Helper methods
    isAuthenticated: isLoggedIn && !!user,
    isAdminUser: isLoggedIn && isAdmin,
    shouldRememberUser: tokenManager.shouldRememberUser(),
  };
}; 