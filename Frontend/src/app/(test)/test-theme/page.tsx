/**
 * Página de prueba para validar Theme y Locale con Zustand
 * Ruta: /test-theme
 */

'use client';

import { useEffect, useState } from 'react';
import { useThemeStore, useLocaleStore } from '@/shared/stores';
import { useTranslations } from '@/shared/hooks/useTranslations';
import { ThemeToggle } from '@/shared/components/ThemeToggle';
import { LanguageSwitcher } from '@/shared/components/LanguageSwitcher';
import Link from 'next/link';

export default function TestThemePage() {
  const { theme, resolvedTheme } = useThemeStore();
  const { locale } = useLocaleStore();
  const t = useTranslations();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-gray-900">
        <p className="text-gray-900 dark:text-white">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-white p-8 text-gray-900 transition-colors dark:bg-gray-900 dark:text-white">
      <h1 className="text-4xl font-bold">🏥 {t('common.appName')}</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        Validación de Theme y Locale con Zustand
      </p>

      {/* Controles */}
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <LanguageSwitcher />
      </div>

      {/* Estado actual */}
      <div className="grid w-full max-w-2xl grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-lg border-2 border-blue-500 bg-blue-50 p-6 dark:bg-blue-900/20">
          <h3 className="mb-3 text-lg font-bold">🎨 Theme Store</h3>
          <div className="space-y-2 text-sm">
            <p>
              <strong>Tema seleccionado:</strong> {theme}
            </p>
            <p>
              <strong>Tema aplicado:</strong> {resolvedTheme}
            </p>
            <p>
              <strong>Persistencia:</strong> localStorage ✅
            </p>
          </div>
        </div>

        <div className="rounded-lg border-2 border-green-500 bg-green-50 p-6 dark:bg-green-900/20">
          <h3 className="mb-3 text-lg font-bold">🌍 Locale Store</h3>
          <div className="space-y-2 text-sm">
            <p>
              <strong>Idioma actual:</strong> {locale.toUpperCase()}
            </p>
            <p>
              <strong>Traducción test:</strong> {t('common.welcome')}
            </p>
            <p>
              <strong>Persistencia:</strong> localStorage ✅
            </p>
          </div>
        </div>
      </div>

      {/* Validaciones */}
      <div className="grid max-w-3xl grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-green-500 bg-green-100 p-4 dark:bg-green-900">
          <p className="font-semibold">✅ Zustand Stores</p>
          <p className="text-sm">theme.store + locale.store</p>
        </div>
        <div className="rounded-lg border border-green-500 bg-green-100 p-4 dark:bg-green-900">
          <p className="font-semibold">✅ Persistencia</p>
          <p className="text-sm">localStorage automático</p>
        </div>
        <div className="rounded-lg border border-green-500 bg-green-100 p-4 dark:bg-green-900">
          <p className="font-semibold">✅ React Hooks</p>
          <p className="text-sm">useTranslations custom</p>
        </div>
      </div>

      {/* Ejemplo de traducciones */}
      <div className="w-full max-w-2xl rounded-lg border border-gray-300 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
        <h3 className="mb-3 text-lg font-bold">📝 Traducciones en acción</h3>
        <div className="space-y-2 text-sm">
          <p>
            <strong>{t('common.appName')}</strong>
          </p>
          <p>{t('common.welcome')}</p>
          <p>{t('auth.loginTitle')}</p>
          <p>{t('dashboard.appointments')}</p>
        </div>
      </div>

      <Link
        href="/landing"
        className="mt-4 text-blue-600 hover:underline dark:text-blue-400"
      >
        ← {t('common.back')}
      </Link>
    </div>
  );
}
