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
import { useTranslations } from '@/shared/hooks/useTranslations';
import { ThemeToggle } from '@/shared/components/ThemeToggle';
import { LanguageSwitcher } from '@/shared/components/LanguageSwitcher';

export default function LoginForm() {
  const router = useRouter();
  const { login, isLoading, error } = useAuth();
  const t = useTranslations();
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
      errors.email = t('auth.errors.emailRequired');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = t('auth.errors.emailInvalid');
    }

    if (!password) {
      errors.password = t('auth.errors.passwordRequired');
    } else if (password.length < 6) {
      errors.password = t('auth.errors.passwordTooShort');
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
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 transition-colors dark:bg-gray-900">
      {/* Botón de regreso a landing */}
      <button
        onClick={() => router.push('/')}
        className="absolute top-4 left-4 rounded-full p-2 text-gray-600 transition hover:bg-gray-200 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
        title={t('auth.login.backToHome')}
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
          {t('common.appName')} - {t('auth.login.title')}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {t('auth.login.email')}
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => {
                setEmail(e.target.value);
                if (validationErrors.email) {
                  setValidationErrors({
                    ...validationErrors,
                    email: undefined,
                  });
                }
              }}
              placeholder={t('auth.login.emailPlaceholder')}
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              disabled={isLoading}
            />
            {validationErrors.email && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                {validationErrors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {t('auth.login.password')}
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                  if (validationErrors.password) {
                    setValidationErrors({
                      ...validationErrors,
                      password: undefined,
                    });
                  }
                }}
                placeholder={t('auth.login.passwordPlaceholder')}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                title={
                  showPassword
                    ? t('auth.login.hidePassword')
                    : t('auth.login.showPassword')
                }
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
            className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            {isLoading ? t('auth.login.submitting') : t('auth.login.submit')}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
          <span className="px-2 text-xs text-gray-500 dark:text-gray-400">
            {t('auth.login.orTestWith')}
          </span>
          <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
        </div>

        {/* Test Users */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => quickLogin('paciente@clinic.com')}
            disabled={isLoading}
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            {t('auth.login.testUsers.patient')}
          </button>
          <button
            type="button"
            onClick={() => quickLogin('medico@clinic.com')}
            disabled={isLoading}
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            {t('auth.login.testUsers.doctor')}
          </button>
          <button
            type="button"
            onClick={() => quickLogin('admin@clinic.com')}
            disabled={isLoading}
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            {t('auth.login.testUsers.admin')}
          </button>
        </div>

        {/* Test Credentials Info */}
        <div className="mt-6 rounded-md bg-blue-50 p-3 dark:bg-blue-900/30">
          <p className="text-xs font-semibold text-blue-900 dark:text-blue-200">
            {t('auth.login.testCredentials.title')}
          </p>
          <p className="mt-1 text-xs text-blue-800 dark:text-blue-300">
            <strong>{t('auth.login.testCredentials.password')}</strong>{' '}
            password123
          </p>
          <p className="mt-1 max-h-12 overflow-y-auto text-xs text-blue-800 dark:text-blue-300">
            <strong>{t('auth.login.testCredentials.emails')}</strong>{' '}
            paciente@clinic.com | medico@clinic.com | admin@clinic.com
          </p>
        </div>

        {/* Registro y navegación */}
        <div className="mt-6 space-y-4">
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            {t('auth.login.noAccount')}{' '}
            <button
              onClick={() => router.push('/register')}
              className="font-semibold text-indigo-600 transition hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              {t('auth.login.register')}
            </button>
          </div>

          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            <button
              onClick={() => router.push('/')}
              className="font-medium text-gray-600 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              ← {t('auth.login.backToHome')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
