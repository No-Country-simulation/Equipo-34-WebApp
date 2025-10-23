/**
 * AppProviders - Agrupador de todos los proveedores globales
 * 
 * Organización:
 * - /shared/core/: Proveedores VERDADERAMENTE GLOBALES (Theme, Locale)
 * - /shared/providers/: Proveedores de features específicas (Auth)
 * - /mocks/providers/: Proveedores de desarrollo (MSW)
 */

'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from '@/shared/core/ThemeProvider';
import { LocaleProvider } from '@/shared/core/LocaleProvider';
import MSWProvider from '@/mocks/providers/MSWProvider';
import AuthProvider from '@/shared/providers/AuthProvider';

interface AppProvidersProps {
  children: ReactNode;
}

/**
 * Orden de proveedores (de afuera hacia adentro):
 * 1. ThemeProvider - Inicializa tema con persistencia (Zustand)
 * 2. LocaleProvider - Inicializa idioma con persistencia (Zustand)
 * 3. MSWProvider - Mock Service Worker para desarrollo
 * 4. AuthProvider - Estado de autenticación
 */
export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <MSWProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </MSWProvider>
      </LocaleProvider>
    </ThemeProvider>
  );
}
