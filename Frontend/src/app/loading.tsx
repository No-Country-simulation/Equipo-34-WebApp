export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center space-y-4">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-solid border-primary-600 border-r-transparent align-middle"></div>
        <p className="text-gray-600 dark:text-gray-400 font-medium">
          Cargando...
        </p>
      </div>
    </div>
  );
}
