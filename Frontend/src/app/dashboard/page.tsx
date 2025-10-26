'use client';

import { useCurrentUser, useUserRole, useAuthActions } from '@/shared/hooks/useAuth';
import { useTranslations } from '@/shared/hooks/useTranslations';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/shared/components/AuthGuard';
import { ThemeToggle } from '@/shared/components/ThemeToggle';
import { LanguageSwitcher } from '@/shared/components/LanguageSwitcher';

function DashboardContent() {
  const router = useRouter();
  const user = useCurrentUser();
  const role = useUserRole();
  const { logout } = useAuthActions();
  const t = useTranslations();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Navbar */}
      <nav className="bg-white dark:bg-gray-800 shadow-md transition-colors">
        <div className="mx-auto max-w-6xl px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{t('common.appName')}</h1>
          
          {/* Controles: Theme + Language + Logout */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <LanguageSwitcher />
            <button
              onClick={handleLogout}
              className="rounded-md bg-red-600 dark:bg-red-500 px-4 py-2 text-white font-medium hover:bg-red-700 dark:hover:bg-red-600 transition"
            >
              {t('common.logout')}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="rounded-lg bg-white dark:bg-gray-800 p-8 shadow-md transition-colors">
          <h2 className="mb-6 text-2xl font-bold dark:text-white">{t('dashboard.welcome')}</h2>

          {user && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {/* User Card */}
                <div className="rounded-lg bg-blue-50 dark:bg-blue-900/30 p-4">
                  <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold">{t('dashboard.userInfo.name')}</p>
                  <p className="text-lg font-bold text-blue-900 dark:text-blue-200">
                    {user.name} {user.last_name}
                  </p>
                </div>

                {/* Email Card */}
                <div className="rounded-lg bg-green-50 dark:bg-green-900/30 p-4">
                  <p className="text-xs text-green-600 dark:text-green-400 font-semibold">{t('dashboard.userInfo.email')}</p>
                  <p className="text-sm font-bold text-green-900 dark:text-green-200 break-all">
                    {user.email}
                  </p>
                </div>

                {/* Role Card */}
                <div className="rounded-lg bg-purple-50 dark:bg-purple-900/30 p-4">
                  <p className="text-xs text-purple-600 dark:text-purple-400 font-semibold">{t('dashboard.userInfo.role')}</p>
                  <p className="text-lg font-bold text-purple-900 dark:text-purple-200 capitalize">
                    {role}
                  </p>
                </div>

                {/* Phone Card */}
                <div className="rounded-lg bg-orange-50 dark:bg-orange-900/30 p-4">
                  <p className="text-xs text-orange-600 dark:text-orange-400 font-semibold">{t('dashboard.userInfo.phone')}</p>
                  <p className="text-sm font-bold text-orange-900 dark:text-orange-200">
                    {user.phone}
                  </p>
                </div>
              </div>

              {/* Raw Data */}
              <div className="mt-8">
                <h3 className="mb-2 text-lg font-semibold dark:text-white">{t('dashboard.fullData')}</h3>
                <pre className="rounded-md bg-gray-100 dark:bg-gray-700 p-4 overflow-x-auto text-xs dark:text-gray-200">
                  {JSON.stringify(user, null, 2)}
                </pre>
              </div>

              {/* Role-based content */}
              <div className="mt-8 border-t pt-8">
                <h3 className="mb-4 text-lg font-semibold dark:text-white">{t('dashboard.roleAccess')}</h3>

                {role === 'paciente' && (
                  <div className="rounded-lg bg-blue-50 dark:bg-blue-900/30 p-4 text-blue-900 dark:text-blue-200">
                    <p className="font-semibold">{t('dashboard.rolePanels.patient.title')}</p>
                    <p className="mt-2 text-sm">
                      {t('dashboard.rolePanels.patient.description')}
                    </p>
                  </div>
                )}

                {role === 'medico' && (
                  <div className="rounded-lg bg-green-50 dark:bg-green-900/30 p-4 text-green-900 dark:text-green-200">
                    <p className="font-semibold">{t('dashboard.rolePanels.doctor.title')}</p>
                    <p className="mt-2 text-sm">
                      {t('dashboard.rolePanels.doctor.description')}
                    </p>
                  </div>
                )}

                {role === 'admin' && (
                  <div className="rounded-lg bg-purple-50 dark:bg-purple-900/30 p-4 text-purple-900 dark:text-purple-200">
                    <p className="font-semibold">{t('dashboard.rolePanels.admin.title')}</p>
                    <p className="mt-2 text-sm mb-4">
                      {t('dashboard.rolePanels.admin.description')}
                    </p>
                    <button
                      onClick={() => router.push('/users')}
                      className="rounded-md bg-purple-600 dark:bg-purple-500 px-4 py-2 text-white text-sm font-medium hover:bg-purple-700 dark:hover:bg-purple-600 transition"
                    >
                      {t('dashboard.rolePanels.admin.viewUsers')}
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
