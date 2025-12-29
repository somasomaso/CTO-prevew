import { apiClient, type ApiResponse } from './api';

export interface User {
  id: string;
  email: string;
  username: string;
  roles?: string[];
  permissions?: string[];
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface SignupData {
  email: string;
  password: string;
  username: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export const authService = {
  async signup(data: SignupData): Promise<ApiResponse<AuthResponse>> {
    return apiClient.post<AuthResponse>('/auth/signup', data);
  },

  async login(data: LoginData): Promise<ApiResponse<AuthResponse>> {
    return apiClient.post<AuthResponse>('/auth/login', data);
  },

  async logout(): Promise<ApiResponse> {
    return apiClient.post('/auth/logout');
  },

  async refreshToken(): Promise<ApiResponse<{ token: string }>> {
    return apiClient.post<{ token: string }>('/auth/refresh');
  },

  async getCurrentUser(): Promise<ApiResponse<{ user: User }>> {
    return apiClient.get<{ user: User }>('/auth/profile');
  },
};
