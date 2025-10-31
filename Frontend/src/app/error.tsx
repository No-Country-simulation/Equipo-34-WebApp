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
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-gray-900">
      <div className="w-full max-w-md space-y-6 text-center">
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
            className="bg-primary-600 hover:bg-primary-700 rounded-lg px-6 py-2 font-medium text-white transition-colors"
          >
            Intentar de nuevo
          </button>
          <a
            href="/"
            className="inline-block rounded-lg bg-gray-200 px-6 py-2 font-medium text-gray-900 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
          >
            Ir al inicio
          </a>
        </div>
      </div>
    </div>
  );
}
