import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAuthStore } from '../auth.store';

// Mock de fetch global
globalThis.fetch = vi.fn();

describe('AuthStore', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('debe tener el estado inicial correcto', () => {
    const { result } = renderHook(() => useAuthStore());
    
    expect(result.current.user).toBeNull();
    expect(result.current.token).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });

  it('debe actualizar el token', () => {
    const { result } = renderHook(() => useAuthStore());
    
    act(() => {
      result.current.setToken('test-token');
    });
    
    expect(result.current.token).toBe('test-token');
  });

  it('debe resetear el estado', () => {
    const { result } = renderHook(() => useAuthStore());
    
    act(() => {
      result.current.setToken('test-token');
      result.current.reset();
    });
    
    expect(result.current.token).toBeNull();
    expect(result.current.user).toBeNull();
  });
});
