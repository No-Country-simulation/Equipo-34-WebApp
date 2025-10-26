/**
 * Layout del área del Paciente
 * 
 * Incluirá:
 * - Sidebar de navegación del paciente
 * - Header con notificaciones
 * - Protección de ruta (solo pacientes autenticados)
 */

import { ReactNode } from 'react';

interface PacienteLayoutProps {
  children: ReactNode;
}

export default function PacienteLayout({ children }: PacienteLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Placeholder: Aquí irá el Sidebar del paciente */}
      <div className="flex">
        <aside className="hidden md:block w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-screen">
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              🏥 Paciente
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Sidebar próximamente
            </p>
          </div>
        </aside>
        
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
