/* eslint-disable @typescript-eslint/no-unused-vars */
'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
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
 * Server action to get current user
 */
export async function getCurrentUser(): Promise<ServerUser | null> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;
    
    if (!accessToken) {
      return null;
    }

    // Check if token is expired
    try {
      const decoded = jwtDecode<TokenPayload>(accessToken);
      const now = Math.floor(Date.now() / 1000);
      
      if (decoded.exp < now) {
        const refreshed = await refreshTokenAction();
        if (!refreshed) {
          return null;
        }
        // Retry with new token
        return getCurrentUser();
      }
    } catch (_error) {
      // Ignore error
      return null;
    }

    // Fetch user data
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      if (response.status === 401) {
        const refreshed = await refreshTokenAction();
        if (refreshed) {
          return getCurrentUser();
        }
      }
      return null;
    }

    const result = await response.json();
    return result.success ? result.data : null;
  } catch (error) {
    return null;
  }
}

/**
 * Server action to refresh token
 */
async function refreshTokenAction(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;
    
    if (!refreshToken) {
      return false;
    }

    // Check if refresh token is expired
    try {
      const decoded = jwtDecode<TokenPayload>(refreshToken);
      const now = Math.floor(Date.now() / 1000);
      
      if (decoded.exp < now) {
        return false;
      }
    } catch (error) {
      return false;
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/refresh-token`, {
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
      // Set new tokens in cookies
      cookieStore.set('accessToken', result.data.token, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 30 * 60, // 30 minutes
        path: '/',
      });
      
      cookieStore.set('refreshToken', result.data.refreshToken, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60, // 7 days
        path: '/',
      });
      
      return true;
    }

    return false;
  } catch (error) {
    return false;
  }
}

/**
 * Server action to require authentication
 */
export async function requireAuthAction(): Promise<ServerUser> {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/auth/login');
  }
  
  return user;
}

/**
 * Server action to require specific role
 */
export async function requireRoleAction(requiredRole: string): Promise<ServerUser> {
  const user = await requireAuthAction();
  
  if (user.role !== requiredRole && user.role !== 'SUPER_ADMIN') {
    redirect('/auth/login');
  }
  
  return user;
}

/**
 * Server action to get user by ID
 */
export async function getUserByIdAction(id: string): Promise<ServerUser | null> {
  try {
    await requireAuthAction(); // Just check authentication
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${await getAccessToken()}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return null;
    }

    const result = await response.json();
    return result.success ? result.data : null;
  } catch (error) {
    return null;
  }
}

/**
 * Helper function to get access token
 */
async function getAccessToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get('accessToken')?.value || null;
} 