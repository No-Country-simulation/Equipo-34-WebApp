/**
 * ThemeToggle - Botón para cambiar entre tema claro y oscuro
 * Usa Zustand store con persistencia en localStorage
 */

'use client';

import { useEffect, useState } from 'react';
import { useThemeStore } from '@/shared/stores';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, toggleTheme } = useThemeStore();

  // useEffect solo se ejecuta en el cliente, así evitamos el problema de hidratación
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = () => {
    console.log('🎨 Toggle theme clicked');
    toggleTheme();
  };

  if (!mounted) {
    return (
      <button
        className="rounded-md p-2 transition hover:bg-gray-200 dark:hover:bg-gray-700"
        aria-label="Toggle theme"
      >
        🌓
      </button>
    );
  }

  return (
    <button
      onClick={handleToggle}
      className="rounded-md p-2 transition hover:bg-gray-200 dark:hover:bg-gray-700"
      aria-label="Toggle theme"
      title={`Cambiar a modo ${resolvedTheme === 'dark' ? 'claro' : 'oscuro'}`}
    >
      {resolvedTheme === 'dark' ? '🌞' : '🌙'}
    </button>
  );
}
