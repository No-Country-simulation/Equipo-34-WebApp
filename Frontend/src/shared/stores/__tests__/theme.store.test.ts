import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useThemeStore } from '../theme.store';

describe('ThemeStore', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('debe tener el estado inicial correcto', () => {
    const { result } = renderHook(() => useThemeStore());
    expect(result.current.theme).toBeDefined();
    expect(result.current.resolvedTheme).toBeDefined();
  });

  it('debe cambiar el tema correctamente', () => {
    const { result } = renderHook(() => useThemeStore());

    act(() => {
      result.current.setTheme('dark');
    });

    expect(result.current.theme).toBe('dark');
  });

  it('debe toggle el tema', () => {
    const { result } = renderHook(() => useThemeStore());
    const initialTheme = result.current.theme;

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).not.toBe(initialTheme);
  });
});
