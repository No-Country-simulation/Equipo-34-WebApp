import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeAll, afterAll, vi } from 'vitest';
import React, { ReactNode } from 'react';

// Cleanup después de cada test
afterEach(() => {
  cleanup();
});

// Mock de next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    pathname: '/',
    query: {},
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
  useParams: () => ({}),
}));

// Mock de next-intl
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'es',
}));

// Mock de framer-motion para tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: { readonly children: ReactNode; readonly [key: string]: unknown }) =>
      React.createElement('div', props, children),
    span: ({ children, ...props }: { readonly children: ReactNode; readonly [key: string]: unknown }) =>
      React.createElement('span', props, children),
    button: ({ children, ...props }: { readonly children: ReactNode; readonly [key: string]: unknown }) =>
      React.createElement('button', props, children),
  },
  AnimatePresence: ({ children }: { readonly children: ReactNode }) => children,
}));

// Configuración de window.matchMedia
Object.defineProperty(globalThis, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock de IntersectionObserver
globalThis.IntersectionObserver = class IntersectionObserver {
  disconnect() {
    // Mock implementation
  }
  observe() {
    // Mock implementation
  }
  takeRecords() {
    return [];
  }
  unobserve() {
    // Mock implementation
  }
} as any;

// Suppress console errors in tests (optional)
const originalError = console.error;
beforeAll(() => {
  console.error = (...args: any[]) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render')
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
