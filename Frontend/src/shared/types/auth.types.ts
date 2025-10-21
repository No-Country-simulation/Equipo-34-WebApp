/**
 * Tipos compartidos para autenticación
 * Alineados con el backend (src/domain/entities/user.entity.ts)
 */

export type UserRole = 'paciente' | 'medico' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  last_name: string;
  role: UserRole;
  phone: string;
  created_at: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterRequest {
  email: string;
  name: string;
  last_name: string;
  password: string;
  phone: string;
  role_id: number;
  emergency_contact?: string;
}

export interface RegisterResponse {
  user: User;
}

export interface ApiError {
  status: number;
  message: string;
  code: string;
}
