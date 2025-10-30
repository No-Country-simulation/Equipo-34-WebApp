import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLocaleStore } from '../locale.store';

describe('LocaleStore', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('debe tener el estado inicial correcto', () => {
    const { result } = renderHook(() => useLocaleStore());
    expect(result.current.locale).toBeDefined();
  });

  it('debe cambiar el locale correctamente', () => {
    const { result } = renderHook(() => useLocaleStore());
    
    act(() => {
      result.current.setLocale('en');
    });
    
    expect(result.current.locale).toBe('en');
  });

  it('debe toggle el locale', () => {
    const { result } = renderHook(() => useLocaleStore());
    
    act(() => {
      result.current.setLocale('es');
    });
    expect(result.current.locale).toBe('es');
    
    act(() => {
      result.current.toggleLocale();
    });
    expect(result.current.locale).toBe('en');
  });
});
