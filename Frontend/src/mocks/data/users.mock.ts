/**
 * Mock data para usuarios de prueba
 * Organizado por rol para testing
 *
 * Nota: Los usuarios registrados se guardan en memoria durante la sesión.
 * Al recargar, se pierden (esto es normal en mocks).
 */

import type { User } from '@/shared/types/auth.types';

const mockUsers: Record<string, User> = {
  // Paciente de prueba
  'paciente@clinic.com': {
    id: 'user-paciente-001',
    email: 'paciente@clinic.com',
    name: 'Juan',
    last_name: 'Pérez',
    role: 'paciente',
    phone: '+34 912345678',
    created_at: new Date('2024-01-15').toISOString(),
  },

  // Médico de prueba
  'medico@clinic.com': {
    id: 'user-medico-001',
    email: 'medico@clinic.com',
    name: 'María',
    last_name: 'García',
    role: 'medico',
    phone: '+34 912345679',
    created_at: new Date('2024-01-10').toISOString(),
  },

  // Admin de prueba
  'admin@clinic.com': {
    id: 'user-admin-001',
    email: 'admin@clinic.com',
    name: 'Carlos',
    last_name: 'López',
    role: 'admin',
    phone: '+34 912345680',
    created_at: new Date('2024-01-01').toISOString(),
  },
};

// Mapeo de emails a contraseñas (para validar login)
const mockPasswords: Record<string, string> = {
  'paciente@clinic.com': 'password123',
  'medico@clinic.com': 'password123',
  'admin@clinic.com': 'password123',
};

// Contraseña común para todos los usuarios de prueba
const MOCK_PASSWORD = 'password123';

export function getMockUser(email: string): User | null {
  return mockUsers[email] || null;
}

export function validateMockCredentials(
  email: string,
  password: string
): boolean {
  const storedPassword = mockPasswords[email];
  return storedPassword !== undefined && password === storedPassword;
}

export function getAllMockUsers(): User[] {
  return Object.values(mockUsers);
}

/**
 * Agregar un nuevo usuario al mock (durante la sesión)
 */
export function addMockUser(user: User, password: string): void {
  mockUsers[user.email] = user;
  mockPasswords[user.email] = password;
}

/**
 * Eliminar un usuario por email
 */
export function deleteMockUser(email: string): boolean {
  if (mockUsers[email]) {
    delete mockUsers[email];
    delete mockPasswords[email];
    return true;
  }
  return false;
}

/**
 * Actualizar un usuario
 */
export function updateMockUser(
  email: string,
  updates: Partial<User>
): User | null {
  const user = mockUsers[email];
  if (user) {
    mockUsers[email] = { ...user, ...updates };
    return mockUsers[email];
  }
  return null;
}

/**
 * Actualizar la contraseña de un usuario
 */
export function updateMockUserPassword(
  email: string,
  newPassword: string
): boolean {
  if (mockPasswords[email]) {
    mockPasswords[email] = newPassword;
    return true;
  }
  return false;
}

/**
 * Obtener la contraseña de un usuario (solo para admin)
 */
export function getMockUserPassword(email: string): string | null {
  return mockPasswords[email] || null;
}

export { mockUsers, MOCK_PASSWORD };
