/**
 * LocaleProvider - Proveedor global de internacionalización
 * Usa Zustand para persistencia en localStorage
 * Inicializa el idioma al montar y lo detecta del navegador
 */

'use client';

import { useEffect, type ReactNode } from 'react';
import { initializeLocale } from '@/shared/stores';

interface LocaleProviderProps {
  readonly children: ReactNode;
}

export function LocaleProvider({ children }: LocaleProviderProps) {
  useEffect(() => {
    // Inicializar locale al montar
    initializeLocale();
  }, []);

  return <>{children}</>;
}
