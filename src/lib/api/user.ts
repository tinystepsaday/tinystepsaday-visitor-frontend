import { getAuthToken } from "@/utils/tokenManager";

export interface UserProfile {
  id: string;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  role: string;
  isEmailVerified: boolean;
  twoFactorEnabled: boolean;
  lastLogin?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  username?: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export interface DeactivateAccountData {
  password: string;
  reason: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

/**
 * Fetch user profile from the server
 */
export async function getUserProfile(): Promise<UserProfile | null> {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Authentication failed');
      }
      throw new Error(`Failed to fetch user profile: ${response.statusText}`);
    }

    const result: ApiResponse<UserProfile> = await response.json();
    
    if (!result.success) {
      throw new Error(result.message || 'Failed to fetch user profile');
    }

    return result.data || null;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
}

/**
 * Update user profile
 */
export async function updateUserProfile(data: UpdateProfileData): Promise<ApiResponse<UserProfile>> {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Authentication failed');
      }
      if (response.status === 409) {
        throw new Error('Username already taken');
      }
      throw new Error(`Failed to update profile: ${response.statusText}`);
    }

    const result: ApiResponse<UserProfile> = await response.json();
    
    if (!result.success) {
      throw new Error(result.message || 'Failed to update profile');
    }

    return result;
  } catch (error) {
    console.error('Error updating user profile:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to update profile',
    };
  }
}

/**
 * Change user password
 */
export async function changePassword(data: ChangePasswordData): Promise<ApiResponse> {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me/change-password`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Authentication failed');
      }
      if (response.status === 400) {
        throw new Error('Current password is incorrect');
      }
      throw new Error(`Failed to change password: ${response.statusText}`);
    }

    const result: ApiResponse = await response.json();
    
    if (!result.success) {
      throw new Error(result.message || 'Failed to change password');
    }

    return result;
  } catch (error) {
    console.error('Error changing password:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to change password',
    };
  }
}

/**
 * Deactivate user account
 */
export async function deactivateAccount(data: DeactivateAccountData): Promise<ApiResponse> {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me/deactivate`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Authentication failed');
      }
      if (response.status === 400) {
        throw new Error('Password is incorrect');
      }
      throw new Error(`Failed to deactivate account: ${response.statusText}`);
    }

    const result: ApiResponse = await response.json();
    
    if (!result.success) {
      throw new Error(result.message || 'Failed to deactivate account');
    }

    return result;
  } catch (error) {
    console.error('Error deactivating account:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to deactivate account',
    };
  }
} 