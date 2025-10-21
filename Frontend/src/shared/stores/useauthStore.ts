// src/shared/stores/useAuthStore.ts
import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  role: 'paciente' | 'medico' | 'admin';
}

interface AuthState {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  login: async (email, password) => {
    // Simulación o llamada real luego
    set({ user: { id: '1', email, role: 'paciente' }, token: 'mock-jwt' });
  },
  logout: () => set({ user: null, token: null }),
}));