/**
 * Panel de Administración
 * Próximamente: Gestión de usuarios, médicos, pacientes, configuración
 */

export default function AdminPage() {
  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          ⚙️ Panel de Administración
        </h1>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
            🚧 Próximamente
          </h2>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
            <li>✅ Gestión de usuarios</li>
            <li>✅ Gestión de médicos</li>
            <li>✅ Gestión de pacientes</li>
            <li>✅ Configuración del sistema</li>
            <li>✅ Reportes y estadísticas</li>
            <li>✅ Logs y auditoría</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
