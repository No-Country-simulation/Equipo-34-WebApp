/**
 * CoreProviders - Proveedores CORE esenciales
 * 
 * Estos proveedores son necesarios en TODOS los contextos:
 * - App principal (Next.js)
 * - Storybook
 * - Tests unitarios
 * 
 * Incluye:
 * - ThemeProvider: Sistema de temas (light/dark)
 * - LocaleProvider: Sistema de internacionalización (es/en)
 */

'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from '@/shared/core/ThemeProvider';
import { LocaleProvider } from '@/shared/core/LocaleProvider';

interface CoreProvidersProps {
  children: ReactNode;
}

/**
 * Orden de proveedores CORE (de afuera hacia adentro):
 * 1. ThemeProvider - Inicializa tema con persistencia (Zustand)
 * 2. LocaleProvider - Inicializa idioma con persistencia (Zustand)
 */
export function CoreProviders({ children }: CoreProvidersProps) {
  return (
    <ThemeProvider>
      <LocaleProvider>
        {children}
      </LocaleProvider>
    </ThemeProvider>
  );
}
