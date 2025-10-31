/**
 * Auth Store con Zustand
 * Maneja estado global de autenticación con persistencia en localStorage
 *
 * Flujo:
 * 1. Usuario hace login → MSW intercepta y retorna token + user
 * 2. Store guarda en estado + localStorage
 * 3. Los hooks recuperan datos del store
 * 4. Componentes se suscriben a cambios
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, UserRole } from '../types/auth.types';

interface AuthState {
  // Estado
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Acciones
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // Acciones de negocio
  login: (
    email: string,
    password: string
  ) => Promise<{
    success: boolean;
    message?: string;
  }>;
  register: (
    email: string,
    password: string,
    name: string,
    phone: string
  ) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  getCurrentUser: () => Promise<User | null>;

  // Helpers
  reset: () => void;
  getUserRole: () => UserRole | null;
  isUserRole: (role: UserRole | UserRole[]) => boolean;
}

/**
 * Crear el store con persistencia en localStorage
 * El store solo persiste token y user, el resto se resetea al recargar
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Estado inicial
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // ============ Setters básicos ============
      setUser: user => set({ user, isAuthenticated: !!user }),
      setToken: token => set({ token }),
      setLoading: isLoading => set({ isLoading }),
      setError: error => set({ error }),

      // ============ Login ============
      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });

        try {
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            const errorMessage = errorData.message || 'Error en el login';
            set({ error: errorMessage, isLoading: false });
            return { success: false, message: errorMessage };
          }

          const data = await response.json();
          const { token, user } = data;

          // Guardar en el store (se persiste automáticamente en localStorage)
          set({
            token,
            user,
            isAuthenticated: true,
            error: null,
            isLoading: false,
          });

          return { success: true };
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Error desconocido';
          set({ error: errorMessage, isLoading: false });
          return { success: false, message: errorMessage };
        }
      },

      // ============ Register ============
      register: async (
        email: string,
        password: string,
        name: string,
        phone: string
      ) => {
        set({ isLoading: true, error: null });

        try {
          const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, name, phone }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            const errorMessage = errorData.message || 'Error en el registro';
            set({ error: errorMessage, isLoading: false });
            return { success: false, message: errorMessage };
          }

          await response.json();
          // No setear token automáticamente en register, requiere login
          set({
            error: null,
            isLoading: false,
          });

          return { success: true };
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Error desconocido';
          set({ error: errorMessage, isLoading: false });
          return { success: false, message: errorMessage };
        }
      },

      // ============ Logout ============
      logout: async () => {
        set({ isLoading: true });

        try {
          // Llamar al endpoint de logout (opcional)
          await fetch('/api/auth/logout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${get().token}`,
            },
          }).catch(() => {
            // Ignorar errores en logout
          });
        } finally {
          // Limpiar estado
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
        }
      },

      // ============ Get Current User ============
      getCurrentUser: async () => {
        const { token } = get();

        if (!token) {
          return null;
        }

        try {
          const response = await fetch('/api/auth/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            set({ token: null, user: null, isAuthenticated: false });
            return null;
          }

          const user = await response.json();
          set({ user, isAuthenticated: true });
          return user;
        } catch (error) {
          console.error('[Auth Store] Error getting current user:', error);
          return null;
        }
      },

      // ============ Reset ============
      reset: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      },

      // ============ Helpers ============
      /**
       * Obtiene el rol del usuario actual
       */
      getUserRole: () => {
        return get().user?.role || null;
      },

      /**
       * Valida si el usuario tiene un rol específico
       * @param role Un rol o array de roles a validar
       */
      isUserRole: (role: UserRole | UserRole[]) => {
        const userRole = get().getUserRole();

        if (!userRole) return false;

        if (Array.isArray(role)) {
          return role.includes(userRole);
        }

        return userRole === role;
      },
    }),

    {
      name: 'auth-store', // Nombre en localStorage
      partialize: state => ({
        // Solo persisten token y user
        token: state.token,
        user: state.user,
      }),
    }
  )
);
