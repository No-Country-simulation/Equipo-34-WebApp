'use client';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-gray-900">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="space-y-2">
          <h1 className="text-primary-600 dark:text-primary-400 text-9xl font-bold">
            404
          </h1>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Página no encontrada
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Lo sentimos, la página que buscas no existe o ha sido movida.
          </p>
        </div>

        <div className="flex justify-center gap-3">
          <a
            href="/"
            className="bg-primary-600 hover:bg-primary-700 inline-block rounded-lg px-6 py-2 font-medium text-white transition-colors"
          >
            Ir al inicio
          </a>
          <button
            onClick={() => window.history.back()}
            className="rounded-lg bg-gray-200 px-6 py-2 font-medium text-gray-900 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
          >
            Volver atrás
          </button>
        </div>
      </div>
    </div>
  );
}
