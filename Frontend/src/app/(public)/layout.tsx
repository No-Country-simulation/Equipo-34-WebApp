/**
 * Layout público - Sin autenticación requerida
 *
 * Se aplica a:
 * - Landing page
 * - Login
 * - Registro
 * - Recuperación de contraseña
 */

import { ReactNode } from 'react';

interface PublicLayoutProps {
  readonly children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header público - sin sidebar */}
      <main className="w-full">{children}</main>
    </div>
  );
}
