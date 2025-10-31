'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global error:', error);
  }, [error]);

  return (
    <html lang="es">
      <body className="bg-gray-50 dark:bg-gray-900">
        <div className="flex min-h-screen items-center justify-center px-4">
          <div className="w-full max-w-md space-y-6 text-center">
            <div className="space-y-2">
              <h1 className="text-5xl font-bold text-gray-900 dark:text-gray-100">
                💥
              </h1>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Error Crítico
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Ocurrió un error crítico en la aplicación. Por favor recarga la
                página o contacta al soporte.
              </p>
            </div>

            {process.env.NODE_ENV === 'development' && (
              <details className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 text-left dark:border-red-800 dark:bg-red-900/20">
                <summary className="mb-2 cursor-pointer font-semibold text-red-900 dark:text-red-200">
                  Detalles del Error (Solo Desarrollo)
                </summary>
                <pre className="overflow-auto text-xs whitespace-pre-wrap text-red-800 dark:text-red-300">
                  {error.message}
                  {error.stack}
                </pre>
                {error.digest && (
                  <p className="mt-2 text-xs text-red-700 dark:text-red-400">
                    Digest: {error.digest}
                  </p>
                )}
              </details>
            )}

            <div className="flex justify-center gap-3">
              <button
                onClick={reset}
                className="rounded-lg bg-red-600 px-6 py-2 font-medium text-white transition-colors hover:bg-red-700"
              >
                Intentar de nuevo
              </button>
              <button
                onClick={() => (window.location.href = '/')}
                className="rounded-lg bg-gray-200 px-6 py-2 font-medium text-gray-900 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
              >
                Recargar aplicación
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
