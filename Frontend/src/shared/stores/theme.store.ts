/**
 * Theme Store con Zustand
 * Maneja el tema (light/dark) con persistencia en localStorage
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'light' | 'dark' | 'system';

interface ThemeState {
  // Estado
  theme: Theme;
  resolvedTheme: 'light' | 'dark'; // El tema real aplicado (después de resolver 'system')
  
  // Acciones
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

/**
 * Hook para manejar el tema
 * - Persiste en localStorage
 * - Detecta preferencia del sistema
 * - Aplica clase 'dark' al <html>
 */
export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'system',
      resolvedTheme: 'light',

      setTheme: (theme: Theme) => {
        const resolved = resolveTheme(theme);
        set({ theme, resolvedTheme: resolved });
        applyThemeToDOM(resolved);
      },

      toggleTheme: () => {
        const current = get().resolvedTheme;
        const newTheme: Theme = current === 'dark' ? 'light' : 'dark';
        get().setTheme(newTheme);
      },
    }),
    {
      name: 'theme-storage',
      partialize: (state) => ({ theme: state.theme }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          const resolved = resolveTheme(state.theme);
          state.resolvedTheme = resolved;
          
          // Aplicar tema inmediatamente después de la hidratación
          if (typeof window !== 'undefined') {
            applyThemeToDOM(resolved);
          }
        }
      },
    }
  )
);

/**
 * Resolver el tema basado en la preferencia del sistema si es 'system'
 */
function resolveTheme(theme: Theme): 'light' | 'dark' {
  if (theme !== 'system') return theme;
  
  // Detectar preferencia del sistema
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }
  
  return 'light';
}

/**
 * Aplicar el tema al DOM (agregar/quitar clase 'dark' en <html>)
 */
function applyThemeToDOM(theme: 'light' | 'dark') {
  if (typeof window === 'undefined') return;
  
  const root = window.document.documentElement;
  const body = window.document.body;
  
  if (theme === 'dark') {
    root.classList.add('dark');
    body.classList.add('dark');
    root.style.colorScheme = 'dark';
  } else {
    root.classList.remove('dark');
    body.classList.remove('dark');
    root.style.colorScheme = 'light';
  }
  
  // Forzar repaint para asegurar que los estilos se apliquen
  void root.offsetHeight;
}

/**
 * Inicializar el tema al cargar la app
 * Detecta tema del sistema si no hay preferencia guardada
 */
export function initializeTheme() {
  if (typeof window === 'undefined') return;
  
  const state = useThemeStore.getState();
  
  // Verificar localStorage
  const stored = localStorage.getItem('theme-storage');
  
  if (!stored) {
    // Primera vez - detectar del sistema
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const systemTheme = systemPrefersDark ? 'dark' : 'light';
    
    useThemeStore.setState({ 
      theme: 'system',
      resolvedTheme: systemTheme
    });
    applyThemeToDOM(systemTheme);
  } else {
    // Hay tema guardado - aplicarlo
    const resolved = resolveTheme(state.theme);
    
    useThemeStore.setState({ 
      theme: state.theme,
      resolvedTheme: resolved 
    });
    applyThemeToDOM(resolved);
  }
  
  // Escuchar cambios en la preferencia del sistema solo si tema es 'system'
  const currentTheme = useThemeStore.getState().theme;
  if (currentTheme === 'system') {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      const newResolved = e.matches ? 'dark' : 'light';
      useThemeStore.setState({ resolvedTheme: newResolved });
      applyThemeToDOM(newResolved);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }
  
  // Observador para mantener la clase dark sincronizada
  setupThemeObserver();
}

/**
 * Genera el script de inicialización para evitar flash de tema
 * Este script se ejecuta ANTES de que React se hidrate
 * Usa la MISMA lógica que Zustand para consistencia
 */
export function getThemeInitScript(): string {
  return `
    (function() {
      try {
        const stored = localStorage.getItem('theme-storage');
        if (stored) {
          const { state } = JSON.parse(stored);
          if (state && state.theme) {
            const theme = state.theme;
            let resolved = theme;
            
            if (theme === 'system') {
              resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            }
            
            if (resolved === 'dark') {
              document.documentElement.classList.add('dark');
              document.body.classList.add('dark');
              document.documentElement.style.colorScheme = 'dark';
            }
          }
        }
      } catch (e) {}
    })();
  `.trim();
}

/**
 * Configurar observador de mutaciones para mantener el tema sincronizado
 */
function setupThemeObserver() {
  if (typeof window === 'undefined') return;
  
  const observer = new MutationObserver(() => {
    const state = useThemeStore.getState();
    const root = document.documentElement;
    const shouldHaveDark = state.resolvedTheme === 'dark';
    const hasDark = root.classList.contains('dark');
    
    // Si el estado no coincide con el DOM, corregirlo
    if (shouldHaveDark !== hasDark) {
      applyThemeToDOM(state.resolvedTheme);
    }
  });
  
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  });
}

