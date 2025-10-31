/**
 * MSW Handler para listar usuarios (admin)
 */

import { http, HttpResponse } from 'msw';
import {
  getAllMockUsers,
  deleteMockUser,
  updateMockUser,
  updateMockUserPassword,
  getMockUserPassword,
} from '../data/users.mock';

export const adminHandlers = [
  /**
   * GET /api/admin/users
   * Lista todos los usuarios registrados
   */
  http.get('*/api/admin/users', async () => {
    try {
      const users = getAllMockUsers();

      return HttpResponse.json(
        {
          users,
          total: users.length,
        },
        { status: 200 }
      );
    } catch (error) {
      console.error('[MSW] Get users error:', error);
      return HttpResponse.json(
        {
          status: 500,
          message: 'Error al obtener usuarios',
          code: 'GET_USERS_ERROR',
        },
        { status: 500 }
      );
    }
  }),

  /**
   * DELETE /api/admin/users/:email
   * Elimina un usuario
   */
  http.delete('*/api/admin/users/:email', async ({ params }) => {
    try {
      const { email } = params;
      const deleted = deleteMockUser(email as string);

      if (!deleted) {
        return HttpResponse.json(
          {
            status: 404,
            message: 'Usuario no encontrado',
            code: 'USER_NOT_FOUND',
          },
          { status: 404 }
        );
      }

      return HttpResponse.json(
        {
          message: 'Usuario eliminado correctamente',
          email,
        },
        { status: 200 }
      );
    } catch (error) {
      console.error('[MSW] Delete user error:', error);
      return HttpResponse.json(
        {
          status: 500,
          message: 'Error al eliminar usuario',
          code: 'DELETE_USER_ERROR',
        },
        { status: 500 }
      );
    }
  }),

  /**
   * PUT /api/admin/users/:email
   * Actualiza los datos de un usuario
   */
  http.put('*/api/admin/users/:email', async ({ params, request }) => {
    try {
      const { email } = params;
      const body = (await request.json()) as any;

      const updated = updateMockUser(email as string, body);

      if (!updated) {
        return HttpResponse.json(
          {
            status: 404,
            message: 'Usuario no encontrado',
            code: 'USER_NOT_FOUND',
          },
          { status: 404 }
        );
      }

      return HttpResponse.json(
        {
          message: 'Usuario actualizado correctamente',
          user: updated,
        },
        { status: 200 }
      );
    } catch (error) {
      console.error('[MSW] Update user error:', error);
      return HttpResponse.json(
        {
          status: 500,
          message: 'Error al actualizar usuario',
          code: 'UPDATE_USER_ERROR',
        },
        { status: 500 }
      );
    }
  }),

  /**
   * GET /api/admin/users/:email/password
   * Obtiene la contraseña de un usuario (solo para admin)
   */
  http.get('*/api/admin/users/:email/password', async ({ params }) => {
    try {
      const { email } = params;
      const password = getMockUserPassword(email as string);

      if (!password) {
        return HttpResponse.json(
          {
            status: 404,
            message: 'Usuario no encontrado',
            code: 'USER_NOT_FOUND',
          },
          { status: 404 }
        );
      }

      return HttpResponse.json(
        {
          password,
        },
        { status: 200 }
      );
    } catch (error) {
      console.error('[MSW] Get password error:', error);
      return HttpResponse.json(
        {
          status: 500,
          message: 'Error al obtener contraseña',
          code: 'GET_PASSWORD_ERROR',
        },
        { status: 500 }
      );
    }
  }),

  /**
   * POST /api/admin/users/:email/password
   * Actualiza la contraseña de un usuario
   */
  http.post(
    '*/api/admin/users/:email/password',
    async ({ params, request }) => {
      try {
        const { email } = params;
        const body = (await request.json()) as any;

        if (!body.newPassword) {
          return HttpResponse.json(
            {
              status: 400,
              message: 'Nueva contraseña es requerida',
              code: 'MISSING_PASSWORD',
            },
            { status: 400 }
          );
        }

        const updated = updateMockUserPassword(
          email as string,
          body.newPassword
        );

        if (!updated) {
          return HttpResponse.json(
            {
              status: 404,
              message: 'Usuario no encontrado',
              code: 'USER_NOT_FOUND',
            },
            { status: 404 }
          );
        }

        return HttpResponse.json(
          {
            message: 'Contraseña actualizada correctamente',
          },
          { status: 200 }
        );
      } catch (error) {
        console.error('[MSW] Update password error:', error);
        return HttpResponse.json(
          {
            status: 500,
            message: 'Error al actualizar contraseña',
            code: 'UPDATE_PASSWORD_ERROR',
          },
          { status: 500 }
        );
      }
    }
  ),
];
