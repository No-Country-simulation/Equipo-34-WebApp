/**
 * Environment Configuration
 * 
 * Centraliza todas las variables de entorno con validación y tipos seguros.
 * Solo usar este archivo para acceder a variables de entorno.
 */

/**
 * Obtiene una variable de entorno y lanza error si no existe
 */
function getEnvVar(key: string, defaultValue?: string): string {
  const value = process.env[key] || defaultValue;
  
  if (value === undefined) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  
  return value;
}

/**
 * Obtiene una variable de entorno pública (NEXT_PUBLIC_*)
 */
function getPublicEnvVar(key: string, defaultValue?: string): string {
  const value = process.env[`NEXT_PUBLIC_${key}`] || defaultValue;
  
  if (value === undefined) {
    throw new Error(`Public environment variable NEXT_PUBLIC_${key} is not defined`);
  }
  
  return value;
}

/**
 * Convierte string a boolean
 */
function getBooleanEnv(value: string | undefined, defaultValue: boolean): boolean {
  if (value === undefined) return defaultValue;
  return value === 'true' || value === '1';
}

/**
 * Convierte string a número
 */
function getNumberEnv(value: string | undefined, defaultValue: number): number {
  if (value === undefined) return defaultValue;
  const num = Number(value);
  return isNaN(num) ? defaultValue : num;
}

// ==============================================
// API Configuration
// ==============================================
export const API_CONFIG = {
  baseUrl: getPublicEnvVar('API_URL', 'http://localhost:3001'),
  timeout: getNumberEnv(process.env.NEXT_PUBLIC_API_TIMEOUT, 30000),
} as const;

// ==============================================
// Authentication
// ==============================================
export const AUTH_CONFIG = {
  cookieName: getPublicEnvVar('AUTH_COOKIE_NAME', 'clinic_nc_auth'),
  sessionTimeout: getNumberEnv(process.env.NEXT_PUBLIC_SESSION_TIMEOUT, 3600000),
  refreshTokenBefore: getNumberEnv(process.env.NEXT_PUBLIC_REFRESH_TOKEN_BEFORE, 300000),
} as const;

// ==============================================
// Application
// ==============================================
export const APP_CONFIG = {
  name: getPublicEnvVar('APP_NAME', 'Clínica NC'),
  baseUrl: getPublicEnvVar('BASE_URL', 'http://localhost:3000'),
  env: getEnvVar('NODE_ENV', 'development') as 'development' | 'production' | 'test',
  isDevelopment: getEnvVar('NODE_ENV', 'development') === 'development',
  isProduction: getEnvVar('NODE_ENV', 'development') === 'production',
  isTest: getEnvVar('NODE_ENV', 'development') === 'test',
} as const;

// ==============================================
// Feature Flags
// ==============================================
export const FEATURES = {
  enableMSW: getBooleanEnv(process.env.NEXT_PUBLIC_ENABLE_MSW, true),
  enableAnalytics: getBooleanEnv(process.env.NEXT_PUBLIC_ENABLE_ANALYTICS, false),
  enableErrorReporting: getBooleanEnv(process.env.NEXT_PUBLIC_ENABLE_ERROR_REPORTING, false),
  debug: getBooleanEnv(process.env.NEXT_PUBLIC_DEBUG, false),
} as const;

// ==============================================
// Internationalization
// ==============================================
export const I18N_CONFIG = {
  defaultLocale: getPublicEnvVar('DEFAULT_LOCALE', 'es') as 'es' | 'en',
  supportedLocales: getPublicEnvVar('SUPPORTED_LOCALES', 'es,en').split(',') as readonly ('es' | 'en')[],
} as const;

// ==============================================
// External Services
// ==============================================
export const EXTERNAL_SERVICES = {
  googleAnalytics: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
  sentry: {
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    authToken: process.env.SENTRY_AUTH_TOKEN,
  },
} as const;

// ==============================================
// Validación en desarrollo
// ==============================================
if (APP_CONFIG.isDevelopment && FEATURES.debug) {
  console.log('🔧 Environment Configuration:', {
    API_CONFIG,
    AUTH_CONFIG,
    APP_CONFIG,
    FEATURES,
    I18N_CONFIG,
  });
}
