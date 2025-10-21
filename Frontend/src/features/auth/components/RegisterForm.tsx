/**
 * RegisterForm - Componente funcional de registro
 * Integrado con Zustand auth store y MSW mocks
 * 
 * Flujo:
 * 1. Usuario ingresa datos (nombre, email, password)
 * 2. Llama a store.register() (que llama a /api/auth/register - interceptado por MSW)
 * 3. MSW retorna { token, user }
 * 4. Store guarda en estado + localStorage
 * 5. Se redirige al dashboard
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/shared/hooks/useAuth';

export default function RegisterForm() {
  const router = useRouter();
  const { register, isLoading, error } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [validationErrors, setValidationErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const validateForm = (): boolean => {
    const errors: typeof validationErrors = {};

    if (!formData.name.trim()) {
      errors.name = 'Nombre es requerido';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Email inválido';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Teléfono es requerido';
    }

    if (!formData.password) {
      errors.password = 'Contraseña es requerida';
    } else if (formData.password.length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Confirmar contraseña es requerido';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Las contraseñas no coinciden';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const result = await register(formData.email, formData.password, formData.name, formData.phone);

    if (result.success) {
      // Registro exitoso, redirigir al dashboard
      router.push('/dashboard');
    }
    // Error ya está en el estado `error` del hook
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
          🏥 Clínica NC - Registro
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nombre */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nombre Completo
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (validationErrors.name) {
                  setValidationErrors({ ...validationErrors, name: undefined });
                }
              }}
              placeholder="Tu nombre"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              disabled={isLoading}
            />
            {validationErrors.name && (
              <p className="mt-1 text-xs text-red-600">{validationErrors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
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

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Teléfono
            </label>
            <input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => {
                setFormData({ ...formData, phone: e.target.value });
                if (validationErrors.phone) {
                  setValidationErrors({ ...validationErrors, phone: undefined });
                }
              }}
              placeholder="+34 600 123 456"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              disabled={isLoading}
            />
            {validationErrors.phone && (
              <p className="mt-1 text-xs text-red-600">{validationErrors.phone}</p>
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
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
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

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirmar Contraseña
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) => {
                  setFormData({ ...formData, confirmPassword: e.target.value });
                  if (validationErrors.confirmPassword) {
                    setValidationErrors({ ...validationErrors, confirmPassword: undefined });
                  }
                }}
                placeholder="••••••"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                title={showConfirmPassword ? 'Ocultar' : 'Ver'}
              >
                {showConfirmPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {validationErrors.confirmPassword && (
              <p className="mt-1 text-xs text-red-600">{validationErrors.confirmPassword}</p>
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
            className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {isLoading ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>

        {/* Info Box */}
        <div className="mt-6 rounded-md bg-indigo-50 p-3">
          <p className="text-xs font-semibold text-indigo-900">
            ℹ️ Crea tu cuenta para acceder a todos los servicios
          </p>
        </div>

        {/* Login y navegación */}
        <div className="mt-6 space-y-4">
          <div className="text-center text-sm text-gray-600">
            ¿Ya tienes cuenta?{' '}
            <button
              onClick={() => router.push('/auth/login')}
              className="text-indigo-600 font-semibold hover:text-indigo-700 transition"
            >
              Inicia sesión aquí
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
