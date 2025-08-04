'use client';

import { useEffect, useRef } from 'react';
import { useAuthStore } from '@/store/authStore';

interface TokenManagerProps {
  children: React.ReactNode;
}

export default function TokenManager({ children }: TokenManagerProps) {
  const { isLoggedIn, checkTokenValidity, getTokenExpirationInfo, refreshToken, clearAuth } = useAuthStore();
  const monitoringRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isLoggedIn) {
      // Clear any existing monitoring
      if (monitoringRef.current) {
        clearInterval(monitoringRef.current);
        monitoringRef.current = null;
      }
      return;
    }

    // Start token monitoring
    const startMonitoring = () => {
      // Clear any existing monitoring
      if (monitoringRef.current) {
        clearInterval(monitoringRef.current);
      }

      // Check token every 30 seconds
      monitoringRef.current = setInterval(() => {
        const expirationInfo = getTokenExpirationInfo();
        
        if (!expirationInfo) {
          console.log('No valid token found, logging out');
          clearAuth();
          return;
        }

        // If token is expired, logout immediately
        if (expirationInfo.isExpired) {
          console.log('Token expired, logging out');
          clearAuth();
          return;
        }

        // If token expires in less than 5 minutes, refresh it
        if (expirationInfo.expiresIn < 300 && expirationInfo.expiresIn > 0) {
          console.log('Token expiring soon, refreshing...');
          refreshToken().catch((error) => {
            console.error('Failed to refresh token:', error);
            clearAuth();
          });
        }
      }, 30000); // Check every 30 seconds
    };

    startMonitoring();

    // Cleanup on unmount
    return () => {
      if (monitoringRef.current) {
        clearInterval(monitoringRef.current);
        monitoringRef.current = null;
      }
    };
  }, [isLoggedIn, getTokenExpirationInfo, refreshToken, clearAuth]);

  // Handle page visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && isLoggedIn) {
        // Check token validity when page becomes visible
        const isValid = checkTokenValidity();
        if (!isValid) {
          console.log('Token invalid when page became visible, logging out');
          clearAuth();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isLoggedIn, checkTokenValidity, clearAuth]);

  // Handle beforeunload to clean up
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (monitoringRef.current) {
        clearInterval(monitoringRef.current);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return <>{children}</>;
} 