'use client';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full space-y-6 text-center">
        <div className="space-y-2">
          <h1 className="text-9xl font-bold text-primary-600 dark:text-primary-400">
            404
          </h1>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Página no encontrada
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Lo sentimos, la página que buscas no existe o ha sido movida.
          </p>
        </div>

        <div className="flex gap-3 justify-center">
          <a
            href="/"
            className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors inline-block"
          >
            Ir al inicio
          </a>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 font-medium rounded-lg transition-colors"
          >
            Volver atrás
          </button>
        </div>
      </div>
    </div>
  );
}
