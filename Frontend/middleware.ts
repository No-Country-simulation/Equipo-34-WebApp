/**
 * Next.js Middleware
 *
 * Maneja:
 * 1. Internacionalización (i18n) con next-intl
 * 2. Autenticación y protección de rutas
 * 3. Redirecciones personalizadas
 */

import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { locales } from './src/shared/config/i18n';

// ============================================
// Configuración de i18n
// ============================================
const i18nMiddleware = createMiddleware({
  // Lista de todos los locales soportados
  locales,

  // Locale por defecto
  defaultLocale: 'es',

  // Estrategia de prefijo de locale
  // 'as-needed': solo agrega prefijo si no es el locale por defecto
  // 'always': siempre agrega el prefijo
  localePrefix: 'as-needed',

  // Detectar locale del navegador automáticamente
  localeDetection: true,
});

// ============================================
// Rutas públicas (no requieren autenticación)
// ============================================
const publicRoutes = [
  '/',
  '/landing',
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/verify-email',
];

// ============================================
// Rutas protegidas por rol
// ============================================
const _roleBasedRoutes = {
  admin: ['/admin', 'administrator'],
  doctor: ['/medico', '/doctor'],
  patient: ['/paciente', '/patient'],
} as const;

// ============================================
// Rutas que no necesitan middleware
// ============================================
const SKIP_PATHS = [
  '/api',
  '/_next',
  '/favicon.ico',
  '/robots.txt',
  '/sitemap.xml',
  '/manifest.json',
  '/mockServiceWorker.js',
];

/**
 * Verifica si la ruta debe saltar el middleware
 */
function shouldSkipMiddleware(pathname: string): boolean {
  return SKIP_PATHS.some(path => pathname.startsWith(path));
}

/**
 * Verifica si la ruta es pública
 */
function isPublicRoute(pathname: string): boolean {
  // Remover locale prefix si existe
  const cleanPath = pathname.replace(/^\/(es|en)/, '') || '/';
  return publicRoutes.some(
    route => cleanPath === route || cleanPath.startsWith(route)
  );
}

/**
 * Obtiene el token de autenticación de las cookies
 */
function getAuthToken(request: NextRequest): string | null {
  return request.cookies.get('clinic_nc_auth')?.value || null;
}

/**
 * Middleware principal
 */
export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Saltar middleware para rutas específicas
  if (shouldSkipMiddleware(pathname)) {
    return NextResponse.next();
  }

  // ============================================
  // 1. Aplicar middleware de i18n
  // ============================================
  const i18nResponse = i18nMiddleware(request);

  // ============================================
  // 2. Verificar autenticación (si no es ruta pública)
  // ============================================
  if (!isPublicRoute(pathname)) {
    const token = getAuthToken(request);

    // Si no hay token, redirigir a login
    if (!token) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // TODO: Aquí podrías verificar el rol del usuario
    // y redirigir si no tiene permisos para la ruta actual
    // const userRole = await getUserRoleFromToken(token);
    // if (!hasPermission(userRole, pathname)) {
    //   return NextResponse.redirect(new URL('/unauthorized', request.url));
    // }
  }

  // ============================================
  // 3. Retornar respuesta de i18n
  // ============================================
  return i18nResponse;
}

// ============================================
// Configuración del matcher
// ============================================
export const config = {
  // Matcher que excluye rutas de Next.js y archivos estáticos
  matcher: [
    // Incluir todas las rutas excepto las que empiezan con:
    // - api (API routes)
    // - _next (Next.js internals)
    // - _vercel (Vercel internals)
    // - archivos estáticos (.*\\..*)"
    String.raw`/((?!api|_next|_vercel|.*\..*).*)`,
  ],
};
