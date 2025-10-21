/**
 * LoginForm - Componente funcional de login
 * Integrado con Zustand auth store y MSW mocks
 * 
 * Flujo:
 * 1. Usuario ingresa email/password
 * 2. Llama a store.login() (que llama a /api/auth/login - interceptado por MSW)
 * 3. MSW retorna { token, user }
 * 4. Store guarda en estado + localStorage
 * 5. Se redirige según el rol
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/shared/hooks/useAuth';

export default function LoginForm() {
  const router = useRouter();
  const { login, isLoading, error } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const validateForm = (): boolean => {
    const errors: typeof validationErrors = {};

    if (!email.trim()) {
      errors.email = 'Email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Email inválido';
    }

    if (!password) {
      errors.password = 'Contraseña es requerida';
    } else if (password.length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const result = await login(email, password);

    if (result.success) {
      // Login exitoso, redirigir según rol
      // El rol está en el store, puede accederse después
      router.push('/dashboard');
    }
    // Error ya está en el estado `error` del hook
  };

  const quickLogin = async (testEmail: string) => {
    setEmail(testEmail);
    // Pequeño delay para que se actualice el estado
    setTimeout(async () => {
      const result = await login(testEmail, 'password123');
      if (result.success) {
        router.push('/dashboard');
      }
    }, 100);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      {/* Botón de regreso a landing */}
      <button
        onClick={() => router.push('/')}
        className="absolute top-4 left-4 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-full transition"
        title="Volver a inicio"
      >
        ← Volver
      </button>

      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold">
          🏥 Clínica NC - Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (validationErrors.email) {
                  setValidationErrors({ ...validationErrors, email: undefined });
                }
              }}
              placeholder="tu@email.com"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              disabled={isLoading}
            />
            {validationErrors.email && (
              <p className="mt-1 text-xs text-red-600">{validationErrors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (validationErrors.password) {
                    setValidationErrors({ ...validationErrors, password: undefined });
                  }
                }}
                placeholder="••••••"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                title={showPassword ? 'Ocultar' : 'Ver'}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {validationErrors.password && (
              <p className="mt-1 text-xs text-red-600">{validationErrors.password}</p>
            )}
          </div>

          {/* Error General */}
          {error && (
            <div className="rounded-md bg-red-50 p-3">
              <p className="text-sm text-red-800">❌ {error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-2 text-xs text-gray-500">O prueba con</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Test Users */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => quickLogin('paciente@clinic.com')}
            disabled={isLoading}
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            👤 Paciente
          </button>
          <button
            type="button"
            onClick={() => quickLogin('medico@clinic.com')}
            disabled={isLoading}
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            🏥 Médico
          </button>
          <button
            type="button"
            onClick={() => quickLogin('admin@clinic.com')}
            disabled={isLoading}
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            ⚙️ Admin
          </button>
        </div>

        {/* Test Credentials Info */}
        <div className="mt-6 rounded-md bg-blue-50 p-3">
          <p className="text-xs font-semibold text-blue-900">Credenciales de prueba:</p>
          <p className="text-xs text-blue-800 mt-1">
            <strong>Contraseña:</strong> password123
          </p>
          <p className="text-xs text-blue-800 mt-1 max-h-12 overflow-y-auto">
            <strong>Emails:</strong> paciente@clinic.com | medico@clinic.com | admin@clinic.com
          </p>
        </div>

        {/* Registro y navegación */}
        <div className="mt-6 space-y-4">
          <div className="text-center text-sm text-gray-600">
            ¿No tienes cuenta?{' '}
            <button
              onClick={() => router.push('/auth/register')}
              className="text-indigo-600 font-semibold hover:text-indigo-700 transition"
            >
              Regístrate aquí
            </button>
          </div>

          <div className="text-center text-sm text-gray-600">
            <button
              onClick={() => router.push('/')}
              className="text-gray-600 hover:text-gray-900 font-medium transition"
            >
              ← Volver a la página principal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
