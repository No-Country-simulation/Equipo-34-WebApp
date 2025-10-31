/**
 * Componente AuthGuard
 * Protege rutas verificando autenticación y rol
 *
 * Uso:
 * <ProtectedRoute requiredRoles={['medico', 'admin']}>
 *   <MedicoDashboard />
 * </ProtectedRoute>
 */

'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useHasRole } from '@/shared/hooks/useAuth';
import type { UserRole } from '@/shared/types/auth.types';

interface ProtectedRouteProps {
  readonly children: ReactNode;
  readonly requiredRoles?: UserRole | UserRole[];
  readonly fallback?: ReactNode;
}

/**
 * Componente wrapper para rutas protegidas
 * Redirige a login si no está autenticado o no tiene el rol requerido
 */
export function ProtectedRoute({
  children,
  requiredRoles,
  fallback,
}: ProtectedRouteProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const hasRequiredRole = useHasRole(requiredRoles || []);
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    // Si está cargando, no hacer nada
    if (isLoading) {
      return;
    }

    // Si no está autenticado, redirigir a login
    if (!isAuthenticated) {
      router.replace('/login');
      return;
    }

    // Si requiere rol específico y no lo tiene, redirigir a dashboard principal
    if (requiredRoles && !hasRequiredRole) {
      router.replace('/dashboard');
      return;
    }

    // Si pasó todas las validaciones, permitir render
    setCanRender(true);
  }, [isLoading, isAuthenticated, hasRequiredRole, requiredRoles, router]);

  // Mientras carga, mostrar fallback o nada
  if (isLoading || !canRender) {
    return fallback || <div>Cargando...</div>;
  }

  return <>{children}</>;
}

/**
 * Componente para mostrar contenido solo si está autenticado
 */
export function AuthGuard({ children }: { readonly children: ReactNode }) {
  return <ProtectedRoute requiredRoles={undefined}>{children}</ProtectedRoute>;
}

/**
 * Componente para mostrar contenido solo si tiene cierto rol
 */
export function RoleGuard({
  children,
  roles,
  fallback,
}: {
  readonly children: ReactNode;
  readonly roles: UserRole | UserRole[];
  readonly fallback?: ReactNode;
}) {
  return (
    <ProtectedRoute requiredRoles={roles} fallback={fallback}>
      {children}
    </ProtectedRoute>
  );
}

/**
 * Hook para renderizado condicional basado en rol
 *
 * @example
 * export function MyComponent() {
 *   const { canAccess, isLoading } = useCanAccess(['medico', 'admin']);
 *
 *   if (isLoading) return <div>Cargando...</div>;
 *   if (!canAccess) return <div>No tienes acceso</div>;
 *
 *   return <div>Contenido restringido</div>;
 * }
 */
export function useCanAccess(requiredRoles?: UserRole | UserRole[]) {
  const { isLoading } = useAuth();
  const canAccess = useHasRole(requiredRoles || []);

  return { canAccess, isLoading };
}
