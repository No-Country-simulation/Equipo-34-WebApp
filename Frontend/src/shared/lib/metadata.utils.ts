/**
 * Utilidades para metadatos
 * Funciones para generar títulos y siteName dinámicos según la ruta
 */

/**
 * Extrae el nombre de la página del pathname
 * @param pathname - La ruta actual (ej: "/dashboard" o "/auth/login")
 * @returns El nombre formateado (ej: "Dashboard" o "Login")
 */
export function getPageNameFromPathname(pathname: string): string {
  // Obtener el último segmento de la ruta
  const segments = pathname.split('/').filter(Boolean);
  const lastSegment = segments[segments.length - 1] || 'Home';
  
  // Capitalizar la primera letra y reemplazar guiones con espacios
  return lastSegment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Genera el siteName para OpenGraph
 * @param pathname - La ruta actual
 * @returns El siteName formateado
 */
export function generateSiteName(pathname: string): string {
  const pageName = getPageNameFromPathname(pathname);
  return `🏥 Clínica NC ${pageName}`;
}

/**
 * Genera el título completo
 * @param pathname - La ruta actual
 * @returns El título formateado
 */
export function generateTitle(pathname: string): string {
  const pageName = getPageNameFromPathname(pathname);
  return `🏥 Clínica NC - ${pageName}`;
}
