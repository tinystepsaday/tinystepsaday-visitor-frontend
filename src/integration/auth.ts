import apiClient from './apiClient';

export interface LoginResponse {
  success: boolean;
  message: string;
  data?: {
    user: {
      id: string;
      email: string;
      username: string;
      firstName: string;
      lastName: string;
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
  };
  error?: string;
  details?: Array<{
    field: string;
    message: string;
  }>;
}

export interface SignupResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    role: string;
    isEmailVerified: boolean;
    twoFactorEnabled: boolean;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  };
  error?: string;
  details?: Array<{
    field: string;
    message: string;
  }>;
}

export interface VerifyEmailResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    role: string;
    isEmailVerified: boolean;
    twoFactorEnabled: boolean;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  };
  error?: string;
}

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
  error?: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
  error?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignupRequest {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface VerifyEmailRequest {
  email: string;
  verificationCode: string;
}

export interface ResendVerificationRequest {
  email: string;
}

export interface ResendVerificationResponse {
  success: boolean;
  message: string;
  error?: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  resetToken: string;
  newPassword: string;
}

export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>("/api/users/login", credentials);
  
  // Store tokens using the token manager
  if (response.success && response.data) {
    apiClient.getTokenManager().setTokens(response.data.token, response.data.refreshToken);
  }
  
  return response;
};

export const signup = async (userData: SignupRequest): Promise<SignupResponse> => {
  const response = await apiClient.post<SignupResponse>("/api/users/register", userData);
  return response;
};

export const verifyEmail = async (verificationData: VerifyEmailRequest): Promise<VerifyEmailResponse> => {
  const response = await apiClient.post<VerifyEmailResponse>("/api/users/verify-email", verificationData);
  return response;
};

export const resendVerificationCode = async (email: string): Promise<ResendVerificationResponse> => {
  const response = await apiClient.post<ResendVerificationResponse>("/api/users/resend-verification", { email });
  return response;
};

export const forgotPassword = async (email: string): Promise<ForgotPasswordResponse> => {
  const response = await apiClient.post<ForgotPasswordResponse>("/api/users/forgot-password", { email });
  return response;
};

export const resetPassword = async (resetData: ResetPasswordRequest): Promise<ResetPasswordResponse> => {
  const response = await apiClient.post<ResetPasswordResponse>("/api/users/reset-password", resetData);
  return response;
};

export const refreshToken = async (refreshToken: string): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>("/api/users/refresh-token", { refreshToken });
  
  // Store new tokens if refresh was successful
  if (response.success && response.data) {
    apiClient.getTokenManager().setTokens(response.data.token, response.data.refreshToken);
  }
  
  return response;
};

export const logout = async (): Promise<void> => {
  try {
    await apiClient.post("/api/users/logout");
  } catch (error) {
    // Even if logout fails, clear local storage
    console.error("Logout error:", error);
  } finally {
    // Always clear tokens and redirect
    apiClient.getTokenManager().clearTokens();
    
    // Clear user data
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
      localStorage.setItem('isLoggedIn', 'false');
      localStorage.removeItem('isAdmin');
      localStorage.removeItem('isSuperAdmin');
      localStorage.removeItem('isModerator');
      localStorage.removeItem('isInstructor');
      
      // Redirect to login page
      window.location.href = '/';
    }
  }
};