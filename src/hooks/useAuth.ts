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
    isSyncingUser,
    lastUserSync,
    login, 
    logout, 
    refreshToken,
    syncUserData,
    updateUserData,
    setRememberMe,
    hasPermission,
    hasSubscription,
    isSubscriptionActive
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

  // Check authentication status and sync user data on mount
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
      
      // If logged in, sync user data
      if (isLoggedIn && user) {
        // Sync user data if it's been more than 5 minutes or never synced
        const shouldSync = !lastUserSync || (Date.now() - lastUserSync) > 5 * 60 * 1000;
        if (shouldSync) {
          await syncUserData();
        }
      }
    };

    checkAuth();
  }, [isLoggedIn, refreshToken, logout, syncUserData, user, lastUserSync]);

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

  // Manual user data sync
  const handleSyncUserData = useCallback(async () => {
    return await syncUserData();
  }, [syncUserData]);

  // Update user data locally
  const handleUpdateUserData = useCallback((userData: Partial<typeof user>) => {
    updateUserData(userData ?? {});
  }, [updateUserData]);

  return {
    // User state
    user,
    isLoggedIn,
    isAdmin,
    isLoading,
    isSyncingUser,
    rememberMe,
    
    // Auth methods
    login: handleLogin,
    logout: handleLogout,
    refreshToken: handleRefreshToken,
    setRememberMe,
    
    // User data management
    syncUserData: handleSyncUserData,
    updateUserData: handleUpdateUserData,
    
    // Access control helpers
    hasPermission,
    hasSubscription,
    isSubscriptionActive,
    
    // Helper methods
    isAuthenticated: isLoggedIn && !!user,
    isAdminUser: isLoggedIn && isAdmin,
    shouldRememberUser: tokenManager.shouldRememberUser(),
    
    // User data freshness
    isUserDataFresh: lastUserSync ? (Date.now() - lastUserSync) < 5 * 60 * 1000 : false,
    timeSinceLastSync: lastUserSync ? Date.now() - lastUserSync : null,
  };
}; 