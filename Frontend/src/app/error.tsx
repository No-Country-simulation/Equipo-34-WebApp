'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full space-y-6 text-center">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
            ⚠️ Error
          </h1>
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
            Algo salió mal
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Lo sentimos, ocurrió un error al cargar esta página.
          </p>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <details className="mt-4 text-left bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
            <summary className="cursor-pointer font-semibold text-red-900 dark:text-red-200 mb-2">
              Detalles del Error (Solo Desarrollo)
            </summary>
            <pre className="text-xs text-red-800 dark:text-red-300 overflow-auto whitespace-pre-wrap">
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

        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
          >
            Intentar de nuevo
          </button>
          <a
            href="/"
            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 font-medium rounded-lg transition-colors inline-block"
          >
            Ir al inicio
          </a>
        </div>
      </div>
    </div>
  );
}
