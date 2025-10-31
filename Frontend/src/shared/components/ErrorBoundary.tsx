/**
 * Error Boundary Component
 *
 * Captura errores de React en componentes hijos y muestra un fallback UI.
 *
 * Uso:
 * ```tsx
 * <ErrorBoundary fallback={<MyErrorUI />}>
 *   <MyComponent />
 * </ErrorBoundary>
 * ```
 */

'use client';

import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo);

    // TODO: Send error to error reporting service (e.g., Sentry)
    // if (process.env.NODE_ENV === 'production') {
    //   Sentry.captureException(error, { contexts: { react: { componentStack: errorInfo.componentStack } } });
    // }
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-gray-900">
          <div className="w-full max-w-md space-y-6 text-center">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                ⚠️ Oops!
              </h1>
              <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                Algo salió mal
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Lo sentimos, ocurrió un error inesperado. Por favor intenta
                recargar la página.
              </p>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 text-left dark:border-red-800 dark:bg-red-900/20">
                <summary className="mb-2 cursor-pointer font-semibold text-red-900 dark:text-red-200">
                  Error Details (Development Only)
                </summary>
                <pre className="overflow-auto text-xs text-red-800 dark:text-red-300">
                  {this.state.error.toString()}
                  {this.state.error.stack}
                </pre>
              </details>
            )}

            <div className="flex justify-center gap-3">
              <button
                onClick={this.resetError}
                className="bg-primary-600 hover:bg-primary-700 rounded-lg px-6 py-2 font-medium text-white transition-colors"
              >
                Intentar de nuevo
              </button>
              <button
                onClick={() => (globalThis.location.href = '/')}
                className="rounded-lg bg-gray-200 px-6 py-2 font-medium text-gray-900 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
              >
                Ir al inicio
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
