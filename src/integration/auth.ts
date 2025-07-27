import axios from "axios";

const authApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api/users",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include auth token
authApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor to handle token refresh
authApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const response = await authApi.post('/refresh-token', {
            refreshToken
          });
          
          const { token } = response.data.data;
          localStorage.setItem('accessToken', token);
          
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return authApi(originalRequest);
        } catch (refreshError) {
          // Refresh token failed, redirect to login
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');
          localStorage.setItem('isLoggedIn', 'false');
          window.location.href = '/auth/login';
          return Promise.reject(refreshError);
        }
      }
    }
    
    return Promise.reject(error);
  }
);

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
}

export interface SignupRequest {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
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
  const response = await authApi.post("/login", credentials);
  return response.data;
};

export const signup = async (userData: SignupRequest): Promise<SignupResponse> => {
  const response = await authApi.post("/register", userData);
  return response.data;
};

export const forgotPassword = async (email: string): Promise<ForgotPasswordResponse> => {
  const response = await authApi.post("/forgot-password", { email });
  return response.data;
};

export const resetPassword = async (resetData: ResetPasswordRequest): Promise<ResetPasswordResponse> => {
  const response = await authApi.post("/reset-password", resetData);
  return response.data;
};

export const refreshToken = async (refreshToken: string): Promise<LoginResponse> => {
  const response = await authApi.post("/refresh-token", { refreshToken });
  return response.data;
};

export const logout = async (): Promise<void> => {
  try {
    await authApi.post("/logout");
  } catch (error) {
    // Even if logout fails, clear local storage
    console.error("Logout error:", error);
  } finally {
    // Always clear local storage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    localStorage.setItem('isLoggedIn', 'false');
    window.location.href = '/auth/login';
  }
};