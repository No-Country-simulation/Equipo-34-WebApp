/**
 * ThemeProvider - Proveedor global de tema dark/light
 * Usa Zustand para persistencia en localStorage
 * Inicializa el tema al montar y detecta cambios del sistema
 */

'use client';

import { useEffect, type ReactNode } from 'react';
import { initializeTheme } from '@/shared/stores';

interface ThemeProviderProps {
  readonly children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  useEffect(() => {
    // Inicializar tema al montar
    const cleanup = initializeTheme();
    return cleanup;
  }, []);

  return <>{children}</>;
}
