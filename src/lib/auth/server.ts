import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

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

/**
 * Get server-side authentication token from cookies
 */
export async function getServerAuthToken(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;
    
    console.log('Server Auth Debug - Cookie names:', Array.from(cookieStore.getAll()).map(c => c.name));
    console.log('Server Auth Debug - accessToken found:', !!token);
    
    if (!token) {
      return null;
    }

    // Check if token is expired
    try {
      const decoded = jwtDecode<TokenPayload>(token);
      const now = Math.floor(Date.now() / 1000);
      
      console.log('Server Auth Debug - Token expires at:', new Date(decoded.exp * 1000));
      console.log('Server Auth Debug - Current time:', new Date(now * 1000));
      console.log('Server Auth Debug - Token expired:', decoded.exp < now);
      
      if (decoded.exp < now) {
        // Token is expired, try to refresh it
        console.log('Server Auth Debug - Attempting token refresh');
        const refreshed = await refreshServerToken();
        if (refreshed) {
          // Get the new token
          const newToken = await getServerAuthToken();
          return newToken;
        }
        return null;
      }
      
      return token;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  } catch (error) {
    console.error('Error getting server auth token:', error);
    return null;
  }
}

/**
 * Get server-side refresh token from cookies
 */
export async function getServerRefreshToken(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('refreshToken')?.value;
    
    if (!token) {
      return null;
    }

    // Check if refresh token is expired
    try {
      const decoded = jwtDecode<TokenPayload>(token);
      const now = Math.floor(Date.now() / 1000);
      
      if (decoded.exp < now) {
        return null; // Refresh token is expired
      }
      
      return token;
    } catch (error) {
      console.error('Error decoding refresh token:', error);
      return null;
    }
  } catch (error) {
    console.error('Error getting server refresh token:', error);
    return null;
  }
}

/**
 * Set server-side authentication tokens in cookies
 */
export async function setServerAuthTokens(token: string, refreshToken: string) {
  try {
    const cookieStore = await cookies();
    
    // Set access token (30 minutes)
    cookieStore.set('accessToken', token, {
      httpOnly: false, // Allow client-side access
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 60, // 30 minutes
      path: '/',
    });
    
    // Set refresh token (7 days)
    cookieStore.set('refreshToken', refreshToken, {
      httpOnly: false, // Allow client-side access
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });
  } catch (error) {
    console.error('Error setting server auth tokens:', error);
  }
}

/**
 * Clear server-side authentication tokens
 */
export async function clearServerAuthTokens() {
  try {
    const cookieStore = await cookies();
    
    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');
  } catch (error) {
    console.error('Error clearing server auth tokens:', error);
  }
}

/**
 * Get server-side user information
 */
export async function getServerUser(): Promise<ServerUser | null> {
  try {
    const token = await getServerAuthToken();
    
    if (!token) {
      console.log('Server Auth Debug - No token found, returning null');
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

    console.log('Server Auth Debug - API response status:', response.status);

    if (!response.ok) {
      if (response.status === 401) {
        // Token is invalid, try to refresh
        console.log('Server Auth Debug - 401 response, attempting refresh');
        const refreshed = await refreshServerToken();
        if (refreshed) {
          // Retry the request with the new token
          return getServerUser();
        }
        return null;
      }
      return null;
    }

    const result = await response.json();
    console.log('Server Auth Debug - API response success:', result.success);
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
      console.log('Server Auth Debug - No refresh token available');
      return false;
    }

    console.log('Server Auth Debug - Attempting to refresh token');

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/refresh-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      console.log('Server Auth Debug - Refresh token request failed:', response.status);
      return false;
    }

    const result = await response.json();
    
    if (result.success && result.data) {
      await setServerAuthTokens(result.data.token, result.data.refreshToken);
      console.log('Server Auth Debug - Token refresh successful');
      return true;
    }

    console.log('Server Auth Debug - Token refresh failed - invalid response');
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
  console.log('Server Auth Debug - requireAuth called');
  const user = await getServerUser();
  
  if (!user) {
    console.log('Server Auth Debug - No user found, redirecting to login');
    redirect('/auth/login');
  }
  
  console.log('Server Auth Debug - User authenticated:', user.email);
  return user;
}

/**
 * Require specific role for server components
 * Redirects to login if not authenticated or doesn't have required role
 */
export async function requireRole(requiredRole: string): Promise<ServerUser> {
  console.log('Server Auth Debug - requireRole called for:', requiredRole);
  const user = await requireAuth();
  
  if (user.role !== requiredRole && user.role !== 'SUPER_ADMIN') {
    console.log('Server Auth Debug - User role insufficient, redirecting to login');
    redirect('/auth/login');
  }
  
  console.log('Server Auth Debug - User has required role');
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
        if (refreshed) {
          // Retry the request with the new token
          return getServerUserById(id);
        }
        return null;
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