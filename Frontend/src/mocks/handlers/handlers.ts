/**
 * Agregador central de todos los handlers de MSW
 * Cada feature debe exportar sus handlers aquí
 */

import { authHandlers } from './auth';
import { adminHandlers } from './admin';

export const handlers = [...authHandlers, ...adminHandlers];
