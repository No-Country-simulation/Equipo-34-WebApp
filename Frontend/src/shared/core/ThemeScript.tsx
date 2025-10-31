/**
 * ThemeScript - Script de inicialización del tema
 *
 * Se ejecuta ANTES de que React se hidrate para evitar el "flash" de tema incorrecto.
 * Debe ser un componente separado para mantener el layout limpio.
 */

'use client';

import Script from 'next/script';

export function ThemeScript() {
  return (
    <Script
      id="theme-script"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            try {
              const stored = localStorage.getItem('theme-storage');
              if (stored) {
                const { state } = JSON.parse(stored);
                if (state?.theme) {
                  const theme = state.theme;
                  let resolved = theme;
                  
                  if (theme === 'system') {
                    resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  }
                  
                  if (resolved === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                }
              }
            } catch (e) {
              // Fail silently
            }
          })();
        `,
      }}
    />
  );
}
