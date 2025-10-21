/**
 * Utilidades para generar tokens JWT mock
 * Compatible con el payload del backend (src/infrastructure/external/Utils/jwt.util.ts)
 */

export interface JWTPayload {
  name: string;
  email: string;
  role: 'paciente' | 'medico' | 'admin';
  iat: number;
  exp: number;
}

/**
 * Genera un token JWT mock (solo para desarrollo)
 * NO es un JWT válido, pero tiene la estructura correcta
 */
export function generateMockToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
  const now = Math.floor(Date.now() / 1000);
  const expiresIn = 3600; // 1 hora

  const jwtPayload: JWTPayload = {
    ...payload,
    iat: now,
    exp: now + expiresIn,
  };

  // Crear un "JWT" para fines de desarrollo (no es un JWT válido, pero es útil para testing)
  const tokenParts = [
    btoa('{"alg":"HS256","typ":"JWT"}'), // header
    btoa(JSON.stringify(jwtPayload)), // payload
    'mock-signature-not-valid', // signature (solo para dev)
  ];

  return tokenParts.join('.');
}

/**
 * Decodifica un token mock JWT (solo para desarrollo)
 */
export function decodeMockToken(token: string): JWTPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const payload = JSON.parse(atob(parts[1]));
    return payload as JWTPayload;
  } catch {
    return null;
  }
}

/**
 * Valida si un token mock ha expirado
 */
export function isMockTokenExpired(token: string): boolean {
  const payload = decodeMockToken(token);
  if (!payload) return true;

  const now = Math.floor(Date.now() / 1000);
  return now > payload.exp;
}
