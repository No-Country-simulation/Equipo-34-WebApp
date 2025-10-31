/**
 * EJEMPLO: Componente LoginForm con MSW Mocks
 *
 * Este archivo muestra cómo usar los mocks en un componente real
 * Copia y adapta este código a tu proyecto
 */

'use client';

import { useState } from 'react';
import type { LoginRequest } from '@/shared/types/auth.types';
import { useAuthStore } from '@/shared/stores/auth.store';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

/**
 * Service: Llamada HTTP real (interceptada por MSW en dev)
 */
async function loginService(credentials: LoginRequest) {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Login failed');
  }

  return response.json();
}

/**
 * Use Case: Orquestador de lógica de login
 */
async function loginUseCase(email: string, password: string) {
  try {
    const response = await loginService({ email, password });

    // Guardar en localStorage
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));

    return response;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
}

/**
 * Componente: LoginForm
 * Renderiza UI y maneja la interacción del usuario
 */
export function LoginForm() {
  const [email, setEmail] = useState('paciente@clinic.com'); // Prellenado para testing
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setUser, setToken } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await loginUseCase(email, password);

      // Actualizar Zustand store
      setUser(response.user);
      setToken(response.token);

      // Redirigir según rol
      const roleRoutes: Record<string, string> = {
        paciente: '/paciente/dashboard',
        medico: '/medico/agenda',
        admin: '/admin/gestión',
      };

      const redirectUrl = roleRoutes[response.user.role] || '/dashboard';
      window.location.href = redirectUrl;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error desconocido';
      setError(message);
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-8 max-w-md rounded-lg border p-6 shadow">
      <h1 className="mb-6 text-2xl font-bold">Iniciar Sesión</h1>

      {error && (
        <div className="mb-4 rounded border border-red-400 bg-red-100 p-3 text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            disabled={loading}
            className="w-full rounded-lg border px-3 py-2 focus:ring focus:outline-none"
            placeholder="ejemplo@clinic.com"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            disabled={loading}
            className="w-full rounded-lg border px-3 py-2 focus:ring focus:outline-none"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>

      {/* Usuarios de prueba para facilitar testing */}
      <div className="mt-6 rounded bg-gray-100 p-4 text-sm">
        <p className="mb-2 font-semibold">👥 Usuarios de Prueba (MSW Mock):</p>
        <ul className="space-y-1">
          <li>
            <strong>Paciente:</strong> paciente@clinic.com
          </li>
          <li>
            <strong>Médico:</strong> medico@clinic.com
          </li>
          <li>
            <strong>Admin:</strong> admin@clinic.com
          </li>
          <li>
            <strong>Contraseña (todos):</strong> password123
          </li>
        </ul>
      </div>
    </div>
  );
}
