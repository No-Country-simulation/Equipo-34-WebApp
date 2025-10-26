/**
 * ThemeScript - Script de inicialización del tema
 * 
 * Este componente genera un <script> que se ejecuta ANTES de que React se hidrate
 * para evitar el "flash" de tema incorrecto.
 * 
 * IMPORTANTE: La lógica viene de theme.store.ts (single source of truth)
 */

import { getThemeInitScript } from '@/shared/stores/theme.store';

export function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: getThemeInitScript(),
      }}
    />
  );
}
