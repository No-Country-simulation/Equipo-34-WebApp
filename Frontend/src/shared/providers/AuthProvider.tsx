/**
 * Proveedor de Autenticación
 * Sincroniza el usuario al montar la aplicación y maneja la recuperación de sesión
 *
 * Uso en app/layout.tsx:
 * <AuthProvider>
 *   {children}
 * </AuthProvider>
 */

'use client';

import { ReactNode } from 'react';
import { useSyncCurrentUser } from '@/shared/hooks/useAuth';

function AuthProviderContent({ children }: { readonly children: ReactNode }) {
  const { isSyncing } = useSyncCurrentUser();

  // Mostrar loading mientras se sincroniza (opcional)
  if (isSyncing) {
    return <>{children}</>;
  }

  return <>{children}</>;
}

export function AuthProvider({ children }: { readonly children: ReactNode }) {
  return <AuthProviderContent>{children}</AuthProviderContent>;
}

export default AuthProvider;
