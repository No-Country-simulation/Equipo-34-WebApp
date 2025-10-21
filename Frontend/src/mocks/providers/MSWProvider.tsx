/**
 * Inicialización de MSW en el navegador (client-side)
 * Este archivo setupea el worker de MSW para interceptar fetch en development
 */

'use client';

import { ReactNode, useEffect } from 'react';

/**
 * Hook para inicializar MSW en el navegador
 * Debe ejecutarse en el layout raíz (app/layout.tsx)
 */
export function MSWProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (globalThis.window !== 'undefined') {
      // Solo en desarrollo
      if (process.env.NODE_ENV === 'development') {
        // Importar dinámicamente para evitar problemas de bundle
        import('@/mocks/browser').then(async (module) => {
          try {
            await module.worker.start({
              onUnhandledRequest: 'warn', // Loguea requests no mapeadas
              quiet: false,
            });
            console.log('✅ MSW iniciado correctamente');
          } catch (error) {
            console.error('❌ Error iniciando MSW:', error);
          }
        });
      }
    }
  }, []);

  return <>{children}</>;
}

export default MSWProvider;
