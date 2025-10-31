export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="space-y-4 text-center">
        <div className="border-primary-600 inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-r-transparent align-middle"></div>
        <p className="font-medium text-gray-600 dark:text-gray-400">
          Cargando...
        </p>
      </div>
    </div>
  );
}
