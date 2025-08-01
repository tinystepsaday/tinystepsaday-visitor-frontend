import { getAuthToken } from "@/utils/tokenManager";

export interface SocialAuthResponse {
  success: boolean;
  message: string;
  data?: {
    user: {
      id: string;
      email: string;
      username: string;
      firstName: string;
      lastName: string;
      avatar?: string;
      role: string;
      isEmailVerified: boolean;
      twoFactorEnabled: boolean;
      lastLogin: string;
      isActive: boolean;
      createdAt: string;
      updatedAt: string;
    };
    token: string;
    refreshToken: string;
    expiresIn: number;
    isNewUser: boolean;
    profileCompleted: boolean;
  };
}

export interface SocialAccountResponse {
  id: string;
  provider: string;
  providerId: string;
  providerEmail?: string;
  displayName?: string;
  avatar?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LinkSocialAccountData {
  provider: 'GOOGLE' | 'APPLE' | 'FACEBOOK' | 'GITHUB' | 'LINKEDIN' | 'TWITTER';
  providerId: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: Date;
}

// Google OAuth Configuration
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

// Apple OAuth Configuration
const APPLE_CLIENT_ID = process.env.NEXT_PUBLIC_APPLE_CLIENT_ID;
const APPLE_REDIRECT_URI = process.env.NEXT_PUBLIC_APPLE_REDIRECT_URI;

/**
 * Initialize Google OAuth
 */
export const initializeGoogleAuth = () => {
  if (typeof window === 'undefined') return null;
  
  // Load Google OAuth script
  const script = document.createElement('script');
  script.src = 'https://accounts.google.com/gsi/client';
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);

  return new Promise<void>((resolve) => {
    script.onload = () => resolve();
  });
};

/**
 * Google OAuth Sign In
 */
export const googleSignIn = (): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('Google OAuth not available on server side'));
      return;
    }

    // @ts-expect-error - Google OAuth types
    if (!window.google) {
      reject(new Error('Google OAuth not loaded'));
      return;
    }

    // @ts-expect-error - Google OAuth types
    const client = window.google.accounts.oauth2.initTokenClient({
      client_id: GOOGLE_CLIENT_ID,
      scope: 'openid email profile',
      callback: (response: unknown) => {
        if ((response as { error?: string }).error) {
          reject(new Error((response as { error?: string }).error));
        } else {
          resolve(response);
        }
      },
    });

    client.requestAccessToken();
  });
};

/**
 * Verify Google ID Token
 */
export const verifyGoogleToken = async (idToken: string): Promise<SocialAuthResponse> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/google/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idToken }),
    });

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    throw new Error((error as { response?: { data?: { message: string } } }).response?.data?.message || 'Google authentication failed');
  }
};

/**
 * Apple OAuth Sign In
 */
export const appleSignIn = (): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('Apple OAuth not available on server side'));
      return;
    }

    // @ts-expect-error - Apple OAuth types
    if (!window.AppleID) {
      reject(new Error('Apple OAuth not loaded'));
      return;
    }

    // @ts-expect-error - Apple OAuth types
    window.AppleID.auth.signIn().then((response: unknown) => {
      resolve(response);
    }).catch((error: unknown) => {
      reject(error);
    });
  });
};

/**
 * Initialize Apple OAuth
 */
export const initializeAppleAuth = () => {
  if (typeof window === 'undefined') return null;
  
  // Load Apple OAuth script
  const script = document.createElement('script');
  script.src = 'https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js';
  script.async = true;
  document.head.appendChild(script);

  return new Promise<void>((resolve) => {
    script.onload = () => {
      // @ts-expect-error - Apple OAuth types
      window.AppleID.init({
        clientId: APPLE_CLIENT_ID,
        scope: 'name email',
        redirectURI: APPLE_REDIRECT_URI,
        state: 'origin:web',
        usePopup: true,
      });
      resolve();
    };
  });
};

/**
 * Get OAuth URL for server-side flow
 */
export const getOAuthUrl = (provider: 'google' | 'apple' | 'facebook' | 'github' | 'linkedin' | 'twitter'): string => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  
  switch (provider) {
    case 'google':
      return `${baseUrl}/auth/google`;
    case 'apple':
      return `${baseUrl}/auth/apple`;
    case 'facebook':
      return `${baseUrl}/auth/facebook`;
    case 'github':
      return `${baseUrl}/auth/github`;
    case 'linkedin':
      return `${baseUrl}/auth/linkedin`;
    case 'twitter':
      return `${baseUrl}/auth/twitter`;
    default:
      throw new Error(`Unsupported provider: ${provider}`);
  }
};

/**
 * Link social account to existing user
 */
export const linkSocialAccount = async (linkData: LinkSocialAccountData): Promise<{ success: boolean; data: SocialAccountResponse }> => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/social/link`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(linkData),
    });

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    throw new Error((error as { response?: { data?: { message: string } } }).response?.data?.message || 'Failed to link social account');
  }
};

/**
 * Unlink social account
 */
export const unlinkSocialAccount = async (provider: string): Promise<{ success: boolean; message: string }> => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/social/unlink/${provider}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    throw new Error((error as { response?: { data?: { message: string } } }).response?.data?.message || 'Failed to unlink social account');
  }
};

/**
 * Get user's linked social accounts
 */
export const getLinkedSocialAccounts = async (): Promise<{ success: boolean; data: SocialAccountResponse[] }> => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/social/accounts`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    throw new Error((error as { response?: { data?: { message: string } } }).response?.data?.message || 'Failed to get linked social accounts');
  }
};

/**
 * Handle social authentication callback
 */
export const handleSocialCallback = async (provider: string, code: string, state?: string): Promise<SocialAuthResponse> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/social/callback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        provider,
        code,
        state
      }),
    });

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    throw new Error((error as { response?: { data?: { message: string } } }).response?.data?.message || 'Social authentication callback failed');
  }
}; 