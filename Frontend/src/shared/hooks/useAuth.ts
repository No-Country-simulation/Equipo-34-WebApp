/**
 * Hooks personalizados para el Auth Store
 * Facilitan el acceso al store y sus acciones desde componentes
 */

'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '../stores/auth.store';
import type { UserRole } from '../types/auth.types';

/**
 * Hook para acceder a todo el estado de autenticación
 * @returns Estado completo del auth store
 */
export const useAuth = () => {
  return useAuthStore();
};

/**
 * Hook para acceder solo al usuario actual
 * @returns Usuario actual o null
 */
export const useCurrentUser = () => {
  return useAuthStore(state => state.user);
};

/**
 * Hook para acceder al token
 * @returns Token JWT actual o null
 */
export const useAuthToken = () => {
  return useAuthStore(state => state.token);
};

/**
 * Hook para saber si está autenticado
 * @returns true si tiene token y user, false en otro caso
 */
export const useIsAuthenticated = () => {
  return useAuthStore(state => state.isAuthenticated);
};

/**
 * Hook para obtener el rol del usuario
 * @returns Rol del usuario (paciente | medico | admin) o null
 */
export const useUserRole = () => {
  return useAuthStore(state => state.getUserRole());
};

/**
 * Hook para validar si el usuario tiene un rol específico
 * Útil para renderizado condicional
 *
 * @param role Rol o array de roles a validar
 * @returns true si el usuario tiene ese rol
 *
 * @example
 * const isPaciente = useHasRole('paciente');
 * const isDoctor = useHasRole(['medico', 'admin']);
 */
export const useHasRole = (role: UserRole | UserRole[]) => {
  return useAuthStore(state => state.isUserRole(role));
};

/**
 * Hook para acceder a las acciones de login/logout
 * @returns Objeto con login, logout, register
 */
export const useAuthActions = () => {
  const login = useAuthStore(state => state.login);
  const logout = useAuthStore(state => state.logout);
  const register = useAuthStore(state => state.register);

  return { login, logout, register };
};

/**
 * Hook para el estado de carga y errores
 * @returns { isLoading, error }
 */
export const useAuthStatus = () => {
  const isLoading = useAuthStore(state => state.isLoading);
  const error = useAuthStore(state => state.error);

  return { isLoading, error };
};

/**
 * Hook para sincronizar el usuario actual con el backend al montar
 * Útil para recuperar sesión después de recargar la página
 *
 * @example
 * export default function App() {
 *   useSyncCurrentUser();
 *   // ...
 * }
 */
export const useSyncCurrentUser = () => {
  const { getCurrentUser } = useAuthStore();
  const [isSyncing, setIsSyncing] = useState(true);

  useEffect(() => {
    const sync = async () => {
      await getCurrentUser();
      setIsSyncing(false);
    };

    sync();
  }, [getCurrentUser]);

  return { isSyncing };
};

/**
 * Hook para debugging: muestra el estado del store en tiempo real
 * Solo úsalo en desarrollo
 *
 * @example
 * export default function DebugComponent() {
 *   const state = useAuthDebug();
 *   return <pre>{JSON.stringify(state, null, 2)}</pre>;
 * }
 */
export const useAuthDebug = () => {
  const state = useAuthStore();

  if (
    typeof globalThis.window === 'undefined' ||
    process.env.NODE_ENV !== 'development'
  ) {
    return null;
  }

  return state;
};
