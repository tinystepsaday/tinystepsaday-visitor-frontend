/**
 * Utility functions for handling role-based redirects
 */

export type UserRole = 'USER' | 'ADMIN' | 'SUPER_ADMIN' | 'INSTRUCTOR' | 'MODERATOR';

/**
 * Get the default redirect URL based on user role
 */
export function getDefaultRedirectUrl(role: UserRole): string {
  // Management roles go to management dashboard
  if (['ADMIN', 'SUPER_ADMIN', 'INSTRUCTOR', 'MODERATOR'].includes(role)) {
    return '/management';
  }
  
  // Regular users go to user dashboard
  return '/';
}

/**
 * Get the appropriate redirect URL considering user role and provided redirect
 */
export function getRedirectUrl(
  role: UserRole, 
  redirectUrl?: string | null, 
  returnUrl?: string | null
): string {
  // Priority: redirect > returnUrl > default based on role
  const providedUrl = redirectUrl || returnUrl;
  
  if (providedUrl) {
    // Validate the redirect URL to prevent open redirects
    const allowedDomains = [
      typeof window !== 'undefined' ? window.location.origin : '',
      process.env.NEXT_PUBLIC_FRONTEND_URL,
      'http://localhost:3000',
      'https://tinystepsaday.com'
    ].filter(Boolean);
    
    try {
      const url = new URL(providedUrl, typeof window !== 'undefined' ? window.location.origin : '');
      const isAllowed = allowedDomains.some(domain => 
        url.origin === domain || url.origin === new URL(domain || '').origin
      );
      
      if (isAllowed) {
        return providedUrl;
      }
    } catch (error) {
      console.warn('Invalid redirect URL:', providedUrl, error);
    }
  }
  
  // Fall back to role-based default
  return getDefaultRedirectUrl(role);
}

/**
 * Check if a user has management access
 */
export function hasManagementAccess(role: UserRole): boolean {
  return ['ADMIN', 'SUPER_ADMIN', 'INSTRUCTOR', 'MODERATOR'].includes(role);
}

/**
 * Check if a user has admin access
 */
export function hasAdminAccess(role: UserRole): boolean {
  return ['ADMIN', 'SUPER_ADMIN'].includes(role);
}

/**
 * Check if a user has super admin access
 */
export function hasSuperAdminAccess(role: UserRole): boolean {
  return role === 'SUPER_ADMIN';
} 