/**
 * Hook para usar traducciones basadas en el locale del store
 * Compatible con los archivos de traducciones en /src/shared/locales/
 */

'use client';

import { useLocaleStore } from '@/shared/stores';
import es from '@/shared/locales/es.json';
import en from '@/shared/locales/en.json';

const translations = {
  es,
  en,
} as const;

type TranslationKeys = keyof typeof es;
type NestedKeys<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? `${K}.${NestedKeys<T[K]>}` | K
          : K
        : never;
    }[keyof T]
  : never;

export type TranslationKey = NestedKeys<typeof es>;

/**
 * Hook para obtener traducciones
 * Uso: const t = useTranslations();
 *      t('common.appName') // -> 'Clínica NC'
 */
export function useTranslations() {
  const { locale } = useLocaleStore();

  const t = (key: string, vars?: Record<string, string | number>): string => {
    const keys = key.split('.');
    let value: unknown = translations[locale];

    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key; // Si no existe la clave, devolver la clave
      }
    }

    if (typeof value !== 'string') {
      return key;
    }

    // Reemplazar variables {var} en el texto
    if (vars) {
      return Object.entries(vars).reduce(
        (text, [varKey, varValue]) =>
          text.replace(`{${varKey}}`, String(varValue)),
        value
      );
    }

    return value;
  };

  return t;
}

/**
 * Hook para obtener el locale actual
 */
export function useLocale() {
  const { locale } = useLocaleStore();
  return locale;
}
