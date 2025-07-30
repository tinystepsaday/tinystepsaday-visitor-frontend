import { getAuthToken } from "@/utils/tokenManager";

export interface User {
    id: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    role: "USER" | "ADMIN" | "MODERATOR" | "INSTRUCTOR" | "SUPER_ADMIN";
    isEmailVerified: boolean;
    twoFactorEnabled: boolean;
    isActive: boolean;
    lastLogin?: string;
    createdAt: string;
    updatedAt: string;
}

export interface UsersResponse {
  success: boolean;
  message: string;
  data: User[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  analytics: {
    totalUsers: number;
    activeUsers: number;
    inactiveUsers: number;
    verifiedUsers: number;
    unverifiedUsers: number;
    admins: number;
    moderators: number;
    instructors: number;
    superAdmins: number;
    regularUsers: number;
  };
}

export interface UsersQueryParams {
    page?: number;
    limit?: number;
    search?: string;
    role?: "USER" | "ADMIN" | "MODERATOR" | "INSTRUCTOR" | "SUPER_ADMIN" | "all";
    isActive?: boolean | "all";
    isEmailVerified?: boolean | "all";
    sortBy?: "createdAt" | "updatedAt" | "lastLogin" | "email" | "username";
    sortOrder?: "asc" | "desc";
}

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
 * Fetch users from the server with filtering, sorting, and pagination
 */
export async function getUsers(params: UsersQueryParams = {}): Promise<UsersResponse | null> {
    try {
        const token = getAuthToken();
        if (!token) {
            throw new Error('No authentication token found');
        }

        // Build query string from params
        const queryParams = new URLSearchParams();

        if (params.page) queryParams.append('page', params.page.toString());
        if (params.limit) queryParams.append('limit', params.limit.toString());
        if (params.search) queryParams.append('search', params.search);
        if (params.role) queryParams.append('role', params.role);
        if (params.isActive !== undefined) queryParams.append('isActive', params.isActive.toString());
        if (params.isEmailVerified !== undefined) queryParams.append('isEmailVerified', params.isEmailVerified.toString());
        if (params.sortBy) queryParams.append('sortBy', params.sortBy);
        if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);

        const url = `${process.env.NEXT_PUBLIC_API_URL}/api/users?${queryParams.toString()}`;

        const response = await fetch(url, {
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
            throw new Error(`Failed to fetch users: ${response.statusText}`);
        }

        const result: UsersResponse = await response.json();

        if (!result.success) {
            throw new Error(result.message || 'Failed to fetch users');
        }

        return result;
    } catch (error) {
        console.error('Error fetching users:', error);
        return null;
    }
}

/**
 * Create a new user
 */
export async function createUser(userData: {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}): Promise<ApiResponse<User>> {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/register`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Authentication failed');
      }
      if (response.status === 409) {
        throw new Error('User already exists with this email or username');
      }
      throw new Error(`Failed to create user: ${response.statusText}`);
    }

    const result: ApiResponse<User> = await response.json();

    if (!result.success) {
      throw new Error(result.message || 'Failed to create user');
    }

    return result;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

/**
 * Fetch user by ID from the server
 */
export async function getUserById(id: string): Promise<User | null> {
    try {
        const token = getAuthToken();
        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`, {
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
            if (response.status === 404) {
                return null;
            }
            throw new Error(`Failed to fetch user: ${response.statusText}`);
        }

        const result: ApiResponse<User> = await response.json();

        if (!result.success) {
            throw new Error(result.message || 'Failed to fetch user');
        }

        return result.data || null;
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        return null;
    }
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