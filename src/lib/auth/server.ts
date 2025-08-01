import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export interface ServerUser {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  role: "USER" | "MODERATOR" | "INSTRUCTOR" | "ADMIN" | "SUPER_ADMIN";
  isEmailVerified: boolean;
  twoFactorEnabled: boolean;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Get authentication token from HTTP-only cookies (server-side)
 */
export async function getServerAuthToken(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    return cookieStore.get('auth-token')?.value || null;
  } catch (error) {
    console.error('Error getting server auth token:', error);
    return null;
  }
}

/**
 * Get refresh token from HTTP-only cookies (server-side)
 */
export async function getServerRefreshToken(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    return cookieStore.get('refresh-token')?.value || null;
  } catch (error) {
    console.error('Error getting server refresh token:', error);
    return null;
  }
}

/**
 * Set authentication tokens in HTTP-only cookies (server-side)
 * Note: This should only be used in API routes or server actions
 */
export async function setServerAuthTokens(token: string, refreshToken: string) {
  try {
    const cookieStore = await cookies();
    
    // Set access token (short-lived, 30 minutes)
    cookieStore.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 60, // 30 minutes
      path: '/',
    });

    // Set refresh token (long-lived, 14 days)
    cookieStore.set('refresh-token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 14 * 24 * 60 * 60, // 14 days
      path: '/',
    });
  } catch (error) {
    console.error('Error setting server auth tokens:', error);
  }
}

/**
 * Clear authentication tokens from HTTP-only cookies (server-side)
 */
export async function clearServerAuthTokens() {
  try {
    const cookieStore = await cookies();
    
    cookieStore.delete('auth-token');
    cookieStore.delete('refresh-token');
  } catch (error) {
    console.error('Error clearing server auth tokens:', error);
  }
}

/**
 * Fetch user data from the server using server-side authentication
 */
export async function getServerUser(): Promise<ServerUser | null> {
  try {
    const token = await getServerAuthToken();
    
    if (!token) {
      return null;
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Don't cache user data
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Token is invalid, try to refresh
        const refreshed = await refreshServerToken();
        if (!refreshed) {
          return null;
        }
        // Retry the request with the new token
        return getServerUser();
      }
      return null;
    }

    const result = await response.json();
    return result.success ? result.data : null;
  } catch (error) {
    console.error('Error fetching server user:', error);
    return null;
  }
}

/**
 * Refresh server-side authentication token
 */
async function refreshServerToken(): Promise<boolean> {
  try {
    const refreshToken = await getServerRefreshToken();
    
    if (!refreshToken) {
      return false;
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      return false;
    }

    const result = await response.json();
    
    if (result.success && result.data) {
      await setServerAuthTokens(result.data.accessToken, result.data.refreshToken);
      return true;
    }

    return false;
  } catch (error) {
    console.error('Error refreshing server token:', error);
    return false;
  }
}

/**
 * Require authentication for server components
 * Redirects to login if not authenticated
 */
export async function requireAuth(): Promise<ServerUser> {
  const user = await getServerUser();
  
  if (!user) {
    redirect('/auth/login');
  }
  
  return user;
}

/**
 * Require specific role for server components
 * Redirects to login if not authenticated or doesn't have required role
 */
export async function requireRole(requiredRole: string): Promise<ServerUser> {
  const user = await requireAuth();
  
  if (user.role !== requiredRole && user.role !== 'SUPER_ADMIN') {
    redirect('/auth/login');
  }
  
  return user;
}

/**
 * Optional authentication for server components
 * Returns user if authenticated, null otherwise
 */
export async function optionalAuth(): Promise<ServerUser | null> {
  return getServerUser();
}

/**
 * Fetch user by ID using server-side authentication
 */
export async function getServerUserById(id: string): Promise<ServerUser | null> {
  try {
    const token = await getServerAuthToken();
    
    if (!token) {
      return null;
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Token is invalid, try to refresh
        const refreshed = await refreshServerToken();
        if (!refreshed) {
          return null;
        }
        // Retry the request with the new token
        return getServerUserById(id);
      }
      return null;
    }

    const result = await response.json();
    return result.success ? result.data : null;
  } catch (error) {
    console.error('Error fetching server user by ID:', error);
    return null;
  }
} 