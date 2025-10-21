/**
 * MSW Handlers para autenticación
 * Simula el comportamiento del backend para login, register y logout
 * 
 * Roles soportados: paciente, medico, admin
 * Credenciales de prueba: ver src/mocks/data/users.mock.ts
 */

import { http, HttpResponse, delay } from 'msw';
import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '@/shared/types/auth.types';
import { getMockUser, validateMockCredentials, MOCK_PASSWORD, addMockUser } from '../data/users.mock';
import { generateMockToken } from '../utils/jwt.mock';

/**
 * MSW intercepta TODAS las solicitudes a /api/* independientemente del host
 * Usamos rutas relativas para que funcione en localhost, 192.168.x.x, o cualquier host
 */
export const authHandlers = [
  /**
   * POST /api/auth/login
   * Autentica un usuario y retorna un token JWT + user data
   * 
   * Usuarios de prueba:
   * - Email: paciente@clinic.com | Rol: paciente
   * - Email: medico@clinic.com   | Rol: medico
   * - Email: admin@clinic.com    | Rol: admin
   * - Contraseña: password123
   */
  http.post('*/api/auth/login', async ({ request }) => {
    await delay(500); // Simular latencia de red

    try {
      const body = (await request.json()) as LoginRequest;

      // Validar email y contraseña
      if (!body.email || !body.password) {
        return HttpResponse.json(
          {
            status: 400,
            message: 'Email y contraseña son requeridos',
            code: 'INVALID_CREDENTIALS',
          },
          { status: 400 }
        );
      }

      // Buscar usuario
      const user = getMockUser(body.email);
      if (!user) {
        return HttpResponse.json(
          {
            status: 404,
            message: 'Usuario no encontrado',
            code: 'USER_NOT_FOUND',
          },
          { status: 404 }
        );
      }

      // Validar contraseña
      if (!validateMockCredentials(body.email, body.password)) {
        return HttpResponse.json(
          {
            status: 401,
            message: 'Contraseña incorrecta',
            code: 'INVALID_PASSWORD',
          },
          { status: 401 }
        );
      }

      // Generar token
      const token = generateMockToken({
        name: user.name,
        email: user.email,
        role: user.role,
      });

      const response: LoginResponse = {
        token,
        user,
      };

      return HttpResponse.json(response, {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('[MSW] Login error:', error);
      return HttpResponse.json(
        {
          status: 500,
          message: 'Error interno del servidor',
          code: 'INTERNAL_ERROR',
        },
        { status: 500 }
      );
    }
  }),

  /**
   * POST /api/auth/register
   * Registra un nuevo usuario
   * 
   * Nota: Este es un mock. El registro real dependerá del backend.
   */
  http.post('*/api/auth/register', async ({ request }) => {
    await delay(700); // Simular latencia más alta

    try {
      const body = (await request.json()) as RegisterRequest;

      // Validaciones básicas
      if (!body.email || !body.password || !body.name || !body.phone) {
        return HttpResponse.json(
          {
            status: 400,
            message: 'Campos requeridos faltantes',
            code: 'MISSING_FIELDS',
          },
          { status: 400 }
        );
      }

      // Simular validación de email único
      if (getMockUser(body.email)) {
        return HttpResponse.json(
          {
            status: 409,
            message: 'El email ya está registrado',
            code: 'EMAIL_ALREADY_EXISTS',
          },
          { status: 409 }
        );
      }

      // Crear usuario simulado
      const newUser = {
        id: `user-${Date.now()}`,
        email: body.email,
        name: body.name,
        last_name: body.last_name || '',
        role: body.role_id === 1 ? ('paciente' as const) : body.role_id === 2 ? ('medico' as const) : ('admin' as const),
        phone: body.phone,
        created_at: new Date().toISOString(),
      };

      // ✅ Guardar el usuario EN el mock para futuras búsquedas Y guardar la contraseña
      addMockUser(newUser, body.password);

      const response: RegisterResponse = {
        user: newUser,
      };

      return HttpResponse.json(response, { status: 201 });
    } catch (error) {
      console.error('[MSW] Register error:', error);
      return HttpResponse.json(
        {
          status: 500,
          message: 'Error al registrar usuario',
          code: 'REGISTRATION_ERROR',
        },
        { status: 500 }
      );
    }
  }),

  /**
   * POST /api/auth/logout
   * Cierra la sesión del usuario
   */
  http.post('*/api/auth/logout', async () => {
    await delay(300);

    return HttpResponse.json(
      {
        message: 'Sesión cerrada correctamente',
      },
      { status: 200 }
    );
  }),

  /**
   * GET /api/auth/me
   * Obtiene los datos del usuario autenticado
   */
  http.get('*/api/auth/me', async ({ request }) => {
    await delay(200);

    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json(
        {
          status: 401,
          message: 'No autorizado',
          code: 'UNAUTHORIZED',
        },
        { status: 401 }
      );
    }

    // En un caso real, verificarías el token aquí
    // Para el mock, retornamos un usuario simulado
    const mockUser = {
      id: 'user-current-001',
      email: 'paciente@clinic.com',
      name: 'Juan',
      last_name: 'Pérez',
      role: 'paciente' as const,
      phone: '+34 912345678',
      created_at: new Date().toISOString(),
    };

    return HttpResponse.json(mockUser, { status: 200 });
  }),
];
