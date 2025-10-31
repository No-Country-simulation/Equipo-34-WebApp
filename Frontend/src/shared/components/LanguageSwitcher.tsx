/**
 * LanguageSwitcher - Selector de idioma (ES/EN)
 * Usa Zustand store con persistencia en localStorage
 */

'use client';

import { useLocaleStore } from '@/shared/stores';

const LOCALES = [
  { code: 'es' as const, label: 'ES' },
  { code: 'en' as const, label: 'EN' },
];

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocaleStore();

  const handleChange = (newLocale: (typeof LOCALES)[number]['code']) => {
    console.log('🌍 Language changed to:', newLocale);
    setLocale(newLocale);
  };

  return (
    <div className="flex gap-2 rounded-md bg-gray-100 p-1 dark:bg-gray-800">
      {LOCALES.map(loc => (
        <button
          key={loc.code}
          onClick={() => handleChange(loc.code)}
          className={`rounded-md px-3 py-1 text-sm font-medium transition ${
            locale === loc.code
              ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white'
              : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
          } `}
          aria-label={`Cambiar idioma a ${loc.label}`}
          aria-current={locale === loc.code ? 'true' : undefined}
        >
          {loc.label}
        </button>
      ))}
    </div>
  );
}
