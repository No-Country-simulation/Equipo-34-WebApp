/**
 * Inicialización de MSW en el navegador (client-side)
 * Este archivo setupea el worker de MSW para interceptar fetch en development
 */

'use client';

import { ReactNode, useEffect, useState } from 'react';

/**
 * Hook para inicializar MSW en el navegador
 * Debe ejecutarse en el layout raíz (app/layout.tsx)
 */
export function MSWProvider({ children }: { children: ReactNode }) {
  const [mswReady, setMswReady] = useState(false);

  useEffect(() => {
    if (typeof globalThis.window !== 'undefined') {
      // Solo en desarrollo
      if (process.env.NODE_ENV === 'development') {
        // Importar dinámicamente para evitar problemas de bundle
        import('@/mocks/browser').then(async module => {
          try {
            await module.worker.start({
              onUnhandledRequest: 'warn', // Loguea requests no mapeadas
              quiet: false,
            });
            console.log('✅ MSW iniciado correctamente');
            setMswReady(true);
          } catch (error) {
            console.error('❌ Error iniciando MSW:', error);
            setMswReady(true); // Continuar de todos modos
          }
        });
      } else {
        setMswReady(true);
      }
    }
  }, []);

  // En desarrollo, esperar a que MSW esté listo
  if (process.env.NODE_ENV === 'development' && !mswReady) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
          <p className="text-gray-600">Inicializando MSW...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

export default MSWProvider;
