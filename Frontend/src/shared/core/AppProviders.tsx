/**
 * AppProviders - Agrupador de todos los proveedores para la APLICACIÓN
 *
 * Organización:
 * - CoreProviders: Tema e Idioma (se usa también en Storybook)
 * - MSWProvider: Mock Service Worker (solo para desarrollo)
 * - AuthProvider: Estado de autenticación
 *
 * IMPORTANTE:
 * - Para Storybook, usar solo CoreProviders
 * - Para la App completa, usar AppProviders
 */

'use client';

import { ReactNode } from 'react';
import { CoreProviders } from '@/shared/core/CoreProviders';
import MSWProvider from '@/mocks/providers/MSWProvider';
import AuthProvider from '@/shared/providers/AuthProvider';
import { AnimationProvider } from '../providers/AnimationProvider';

interface AppProvidersProps {
  readonly children: ReactNode;
}

/**
 * Orden de proveedores (de afuera hacia adentro):
 * 1. CoreProviders (Theme + Locale)
 * 2. MSWProvider - Mock Service Worker para desarrollo
 * 3. AuthProvider - Estado de autenticación
 */
export function AppProviders({ children }: AppProvidersProps) {
  return (
    <CoreProviders>
      <MSWProvider>
        <AuthProvider>
          <AnimationProvider>
            {children}
          </AnimationProvider>
        </AuthProvider>
      </MSWProvider>
    </CoreProviders>
  );
}
