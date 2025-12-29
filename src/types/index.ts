import { Request } from 'express';

export interface User {
  id: string;
  email: string;
  password_hash: string;
  username: string;
  created_at: Date;
  updated_at: Date;
}

export interface UserProfile {
  id: string;
  user_id: string;
  bio?: string;
  avatar_url?: string;
  is_verified_contributor: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Role {
  id: string;
  name: string;
  description?: string;
  level: number;
  created_at: Date;
}

export interface Permission {
  id: string;
  name: string;
  description?: string;
  resource: string;
  action: string;
  created_at: Date;
}

export interface UserRole {
  id: string;
  user_id: string;
  role_id: string;
  assigned_by?: string;
  assigned_at: Date;
  expires_at?: Date;
}

export interface Subject {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Chapter {
  id: string;
  subject_id: string;
  name: string;
  description?: string;
  order: number;
  created_at: Date;
  updated_at: Date;
}

export interface Subchapter {
  id: string;
  chapter_id: string;
  name: string;
  description?: string;
  order: number;
  created_at: Date;
  updated_at: Date;
}

export interface Module {
  id: string;
  subchapter_id: string;
  name: string;
  description?: string;
  order: number;
  content_type: string;
  file_path?: string;
  file_size?: number;
  file_hash?: string;
  uploaded_by?: string;
  status: 'pending' | 'approved' | 'rejected' | 'hidden';
  reviewed_by?: string;
  reviewed_at?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface ModuleRating {
  id: string;
  module_id: string;
  user_id: string;
  rating: number;
  review?: string;
  created_at: Date;
  updated_at: Date;
}

export interface UploadLog {
  id: string;
  user_id: string;
  module_id?: string;
  action: string;
  status: string;
  details?: any;
  ip_address?: string;
  created_at: Date;
}

export interface RoleChangeLog {
  id: string;
  user_id: string;
  role_id: string;
  action: string;
  changed_by: string;
  reason?: string;
  created_at: Date;
}

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
    username: string;
    roles: string[];
    permissions: string[];
  };
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
