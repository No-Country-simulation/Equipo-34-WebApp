/**
 * Locale Store con Zustand
 * Maneja el idioma (es/en) con persistencia en localStorage
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Locale = 'es' | 'en';

interface LocaleState {
  // Estado
  locale: Locale;

  // Acciones
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

/**
 * Hook para manejar el idioma
 * - Persiste en localStorage
 * - Detecta idioma del navegador en primera carga
 */
export const useLocaleStore = create<LocaleState>()(
  persist(
    (set, get) => ({
      locale: 'es', // Idioma por defecto

      setLocale: (locale: Locale) => {
        console.log('🌍 setLocale called with:', locale);
        set({ locale });
      },

      toggleLocale: () => {
        const current = get().locale;
        console.log('🌍 toggleLocale - current:', current);
        const newLocale: Locale = current === 'es' ? 'en' : 'es';
        console.log('🌍 toggleLocale - new:', newLocale);

        set({ locale: newLocale });
      },
    }),
    {
      name: 'locale-storage', // Nombre en localStorage
    }
  )
);

/**
 * Detectar el idioma del navegador
 */
export function getBrowserLocale(): Locale {
  if (globalThis.window === undefined) return 'es';

  const browserLang = navigator.language.toLowerCase();

  // Si el navegador está en inglés, usar 'en', sino 'es'
  if (browserLang.startsWith('en')) return 'en';

  return 'es';
}

/**
 * Inicializar el locale al cargar la app
 * Si no hay locale guardado, detectar del navegador
 */
export function initializeLocale() {
  if (globalThis.window === undefined) return;

  const state = useLocaleStore.getState();

  // Verificar si hay algo guardado en localStorage
  const stored = localStorage.getItem('locale-storage');

  if (!stored) {
    // Si no hay nada guardado, detectar del navegador
    const browserLocale = getBrowserLocale();
    useLocaleStore.setState({ locale: browserLocale });
  }
}
