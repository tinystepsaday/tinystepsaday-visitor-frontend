import { getServerAuthToken, getServerUser, getServerUserById, ServerUser } from './server';
import { getAuthToken as getClientAuthToken } from '@/utils/tokenManager';
import { getUserById as getClientUserById, getUserProfile, User } from '@/lib/api/users';

/**
 * Unified authentication interface that works in both server and client environments
 */
export class UnifiedAuth {
  /**
   * Get authentication token (works in both server and client)
   */
  static async getAuthToken(): Promise<string | null> {
    // Check if we're in a server environment
    if (typeof window === 'undefined') {
      return getServerAuthToken();
    }
    
    // Client environment
    return getClientAuthToken();
  }

  /**
   * Get current user (works in both server and client)
   */
  static async getCurrentUser(): Promise<User | ServerUser | null> {
    // Check if we're in a server environment
    if (typeof window === 'undefined') {
      return getServerUser();
    }
    
    // Client environment
    const userProfile = await getUserProfile();
    if (!userProfile) return null;
    
    // Convert UserProfile to User format for consistency
    return {
      id: userProfile.id,
      email: userProfile.email,
      username: userProfile.username,
      firstName: userProfile.firstName || '',
      lastName: userProfile.lastName || '',
      role: userProfile.role as User['role'],
      isEmailVerified: userProfile.isEmailVerified,
      twoFactorEnabled: userProfile.twoFactorEnabled,
      isActive: userProfile.isActive,
      lastLogin: userProfile.lastLogin,
      createdAt: userProfile.createdAt,
      updatedAt: userProfile.updatedAt,
    };
  }

  /**
   * Get user by ID (works in both server and client)
   */
  static async getUserById(id: string): Promise<User | ServerUser | null> {
    // Check if we're in a server environment
    if (typeof window === 'undefined') {
      return getServerUserById(id);
    }
    
    // Client environment
    return getClientUserById(id);
  }

  /**
   * Check if user is authenticated
   */
  static async isAuthenticated(): Promise<boolean> {
    const user = await this.getCurrentUser();
    return user !== null;
  }

  /**
   * Check if user has a specific role
   */
  static async hasRole(role: string): Promise<boolean> {
    const user = await this.getCurrentUser();
    if (!user) return false;
    
    return user.role === role || user.role === 'SUPER_ADMIN';
  }

  /**
   * Check if user has any of the specified roles
   */
  static async hasAnyRole(roles: string[]): Promise<boolean> {
    const user = await this.getCurrentUser();
    if (!user) return false;
    
    return roles.includes(user.role) || user.role === 'SUPER_ADMIN';
  }
}

// Export convenience functions
export const getAuthToken = () => UnifiedAuth.getAuthToken();
export const getCurrentUser = () => UnifiedAuth.getCurrentUser();
export const getUserById = (id: string) => UnifiedAuth.getUserById(id);
export const isAuthenticated = () => UnifiedAuth.isAuthenticated();
export const hasRole = (role: string) => UnifiedAuth.hasRole(role);
export const hasAnyRole = (roles: string[]) => UnifiedAuth.hasAnyRole(roles); 