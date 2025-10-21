'use client';

import { useCurrentUser, useUserRole, useAuthActions } from '@/shared/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/shared/components/AuthGuard';

function DashboardContent() {
  const router = useRouter();
  const user = useCurrentUser();
  const role = useUserRole();
  const { logout } = useAuthActions();

  const handleLogout = async () => {
    await logout();
    router.push('/auth/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="mx-auto max-w-6xl px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-indigo-600">🏥 Clínica NC</h1>
          <button
            onClick={handleLogout}
            className="rounded-md bg-red-600 px-4 py-2 text-white font-medium hover:bg-red-700"
          >
            Cerrar sesión
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="rounded-lg bg-white p-8 shadow-md">
          <h2 className="mb-6 text-2xl font-bold">Dashboard</h2>

          {user && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {/* User Card */}
                <div className="rounded-lg bg-blue-50 p-4">
                  <p className="text-xs text-blue-600 font-semibold">NOMBRE</p>
                  <p className="text-lg font-bold text-blue-900">
                    {user.name} {user.last_name}
                  </p>
                </div>

                {/* Email Card */}
                <div className="rounded-lg bg-green-50 p-4">
                  <p className="text-xs text-green-600 font-semibold">EMAIL</p>
                  <p className="text-sm font-bold text-green-900 break-all">
                    {user.email}
                  </p>
                </div>

                {/* Role Card */}
                <div className="rounded-lg bg-purple-50 p-4">
                  <p className="text-xs text-purple-600 font-semibold">ROL</p>
                  <p className="text-lg font-bold text-purple-900 capitalize">
                    {role}
                  </p>
                </div>

                {/* Phone Card */}
                <div className="rounded-lg bg-orange-50 p-4">
                  <p className="text-xs text-orange-600 font-semibold">TELÉFONO</p>
                  <p className="text-sm font-bold text-orange-900">
                    {user.phone}
                  </p>
                </div>
              </div>

              {/* Raw Data */}
              <div className="mt-8">
                <h3 className="mb-2 text-lg font-semibold">Datos Completos</h3>
                <pre className="rounded-md bg-gray-100 p-4 overflow-x-auto text-xs">
                  {JSON.stringify(user, null, 2)}
                </pre>
              </div>

              {/* Role-based content */}
              <div className="mt-8 border-t pt-8">
                <h3 className="mb-4 text-lg font-semibold">Acceso por Rol</h3>

                {role === 'paciente' && (
                  <div className="rounded-lg bg-blue-50 p-4 text-blue-900">
                    <p className="font-semibold">👤 Panel de Paciente</p>
                    <p className="mt-2 text-sm">
                      Aquí iría el panel específico para pacientes (citas, historial médico, etc.)
                    </p>
                  </div>
                )}

                {role === 'medico' && (
                  <div className="rounded-lg bg-green-50 p-4 text-green-900">
                    <p className="font-semibold">🏥 Panel de Médico</p>
                    <p className="mt-2 text-sm">
                      Aquí iría el panel específico para médicos (pacientes asignados, historial, etc.)
                    </p>
                  </div>
                )}

                {role === 'admin' && (
                  <div className="rounded-lg bg-purple-50 p-4 text-purple-900">
                    <p className="font-semibold">⚙️ Panel de Administrador</p>
                    <p className="mt-2 text-sm mb-4">
                      Aquí iría el panel de administración (gestión de usuarios, roles, etc.)
                    </p>
                    <button
                      onClick={() => router.push('/admin/users')}
                      className="rounded-md bg-purple-600 px-4 py-2 text-white text-sm font-medium hover:bg-purple-700 transition"
                    >
                      👥 Ver Usuarios Registrados
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
