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
import { useTranslations } from '@/shared/hooks/useTranslations';
import { ThemeToggle } from '@/shared/components/ThemeToggle';
import { LanguageSwitcher } from '@/shared/components/LanguageSwitcher';

export default function RegisterForm() {
  const router = useRouter();
  const { register, isLoading, error } = useAuth();
  const t = useTranslations();
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
      errors.name = t('auth.errors.nameRequired');
    }

    if (!formData.email.trim()) {
      errors.email = t('auth.errors.emailRequired');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = t('auth.errors.emailInvalid');
    }

    if (!formData.phone.trim()) {
      errors.phone = t('auth.errors.phoneRequired');
    }

    if (!formData.password) {
      errors.password = t('auth.errors.passwordRequired');
    } else if (formData.password.length < 6) {
      errors.password = t('auth.errors.passwordTooShort');
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = t('auth.errors.confirmPasswordRequired');
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = t('auth.errors.passwordsNotMatch');
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const result = await register(
      formData.email,
      formData.password,
      formData.name,
      formData.phone
    );

    if (result.success) {
      // Registro exitoso, redirigir al dashboard
      router.push('/dashboard');
    }
    // Error ya está en el estado `error` del hook
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 transition-colors dark:bg-gray-900">
      {/* Botón de regreso a landing */}
      <button
        onClick={() => router.push('/')}
        className="absolute top-4 left-4 rounded-full p-2 text-gray-600 transition hover:bg-gray-200 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
        title={t('auth.register.backToHome')}
      >
        ← {t('common.back')}
      </button>

      {/* Controles de tema e idioma */}
      <div className="absolute top-4 right-4 flex items-center gap-3">
        <ThemeToggle />
        <LanguageSwitcher />
      </div>

      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md transition-colors dark:bg-gray-800">
        <h1 className="mb-6 text-center text-2xl font-bold dark:text-white">
          {t('common.appName')} - {t('auth.register.title')}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nombre */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {t('auth.register.name')}
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={e => {
                setFormData({ ...formData, name: e.target.value });
                if (validationErrors.name) {
                  setValidationErrors({ ...validationErrors, name: undefined });
                }
              }}
              placeholder={t('auth.register.namePlaceholder')}
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              disabled={isLoading}
            />
            {validationErrors.name && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                {validationErrors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {t('auth.register.email')}
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={e => {
                setFormData({ ...formData, email: e.target.value });
                if (validationErrors.email) {
                  setValidationErrors({
                    ...validationErrors,
                    email: undefined,
                  });
                }
              }}
              placeholder={t('auth.register.emailPlaceholder')}
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              disabled={isLoading}
            />
            {validationErrors.email && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                {validationErrors.email}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {t('auth.register.phone')}
            </label>
            <input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={e => {
                setFormData({ ...formData, phone: e.target.value });
                if (validationErrors.phone) {
                  setValidationErrors({
                    ...validationErrors,
                    phone: undefined,
                  });
                }
              }}
              placeholder={t('auth.register.phonePlaceholder')}
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              disabled={isLoading}
            />
            {validationErrors.phone && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                {validationErrors.phone}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {t('auth.register.password')}
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={e => {
                  setFormData({ ...formData, password: e.target.value });
                  if (validationErrors.password) {
                    setValidationErrors({
                      ...validationErrors,
                      password: undefined,
                    });
                  }
                }}
                placeholder={t('auth.register.passwordPlaceholder')}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                title={showPassword ? 'Ocultar' : 'Ver'}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {validationErrors.password && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                {validationErrors.password}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {t('auth.register.confirmPassword')}
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={e => {
                  setFormData({ ...formData, confirmPassword: e.target.value });
                  if (validationErrors.confirmPassword) {
                    setValidationErrors({
                      ...validationErrors,
                      confirmPassword: undefined,
                    });
                  }
                }}
                placeholder={t('auth.register.confirmPasswordPlaceholder')}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                title={showConfirmPassword ? 'Ocultar' : 'Ver'}
              >
                {showConfirmPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {validationErrors.confirmPassword && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                {validationErrors.confirmPassword}
              </p>
            )}
          </div>

          {/* Error General */}
          {error && (
            <div className="rounded-md bg-red-50 p-3 dark:bg-red-900/30">
              <p className="text-sm text-red-800 dark:text-red-200">
                ❌ {error}
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-md bg-indigo-600 px-4 py-2 font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-indigo-500 dark:hover:bg-indigo-600"
          >
            {isLoading
              ? t('auth.register.submitting')
              : t('auth.register.submit')}
          </button>
        </form>

        {/* Info Box */}
        <div className="mt-6 rounded-md bg-indigo-50 p-3 dark:bg-indigo-900/30">
          <p className="text-xs font-semibold text-indigo-900 dark:text-indigo-200">
            ℹ️ {t('auth.register.info')}
          </p>
        </div>

        {/* Login y navegación */}
        <div className="mt-6 space-y-4">
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            {t('auth.register.hasAccount')}{' '}
            <button
              onClick={() => router.push('/login')}
              className="font-semibold text-indigo-600 transition hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              {t('auth.register.loginHere')}
            </button>
          </div>

          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            <button
              onClick={() => router.push('/')}
              className="font-medium text-gray-600 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              ← {t('auth.register.backToHome')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
