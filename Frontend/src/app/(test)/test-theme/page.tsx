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
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <p className="text-gray-900 dark:text-white">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 p-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
      <h1 className="text-4xl font-bold">🏥 {t('common.appName')}</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        Validación de Theme y Locale con Zustand
      </p>

      {/* Controles */}
      <div className="flex gap-4 items-center">
        <ThemeToggle />
        <LanguageSwitcher />
      </div>

      {/* Estado actual */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl w-full">
        <div className="p-6 rounded-lg border-2 border-blue-500 bg-blue-50 dark:bg-blue-900/20">
          <h3 className="font-bold text-lg mb-3">🎨 Theme Store</h3>
          <div className="space-y-2 text-sm">
            <p><strong>Tema seleccionado:</strong> {theme}</p>
            <p><strong>Tema aplicado:</strong> {resolvedTheme}</p>
            <p><strong>Persistencia:</strong> localStorage ✅</p>
          </div>
        </div>

        <div className="p-6 rounded-lg border-2 border-green-500 bg-green-50 dark:bg-green-900/20">
          <h3 className="font-bold text-lg mb-3">🌍 Locale Store</h3>
          <div className="space-y-2 text-sm">
            <p><strong>Idioma actual:</strong> {locale.toUpperCase()}</p>
            <p><strong>Traducción test:</strong> {t('common.welcome')}</p>
            <p><strong>Persistencia:</strong> localStorage ✅</p>
          </div>
        </div>
      </div>

      {/* Validaciones */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl">
        <div className="p-4 rounded-lg bg-green-100 dark:bg-green-900 border border-green-500">
          <p className="font-semibold">✅ Zustand Stores</p>
          <p className="text-sm">theme.store + locale.store</p>
        </div>
        <div className="p-4 rounded-lg bg-green-100 dark:bg-green-900 border border-green-500">
          <p className="font-semibold">✅ Persistencia</p>
          <p className="text-sm">localStorage automático</p>
        </div>
        <div className="p-4 rounded-lg bg-green-100 dark:bg-green-900 border border-green-500">
          <p className="font-semibold">✅ React Hooks</p>
          <p className="text-sm">useTranslations custom</p>
        </div>
      </div>

      {/* Ejemplo de traducciones */}
      <div className="p-6 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 max-w-2xl w-full">
        <h3 className="font-bold text-lg mb-3">📝 Traducciones en acción</h3>
        <div className="space-y-2 text-sm">
          <p><strong>{t('common.appName')}</strong></p>
          <p>{t('common.welcome')}</p>
          <p>{t('auth.loginTitle')}</p>
          <p>{t('dashboard.appointments')}</p>
        </div>
      </div>

      <Link 
        href="/landing"
        className="mt-4 text-blue-600 dark:text-blue-400 hover:underline"
      >
        ← {t('common.back')}
      </Link>
    </div>
  );
}
