/**
 * Example Service
 * 
 * Responsable de la comunicación con el backend.
 * En desarrollo, las llamadas son interceptadas por MSW.
 */

import { API_CONFIG } from '@/shared/config/env';

/**
 * DTOs (Data Transfer Objects) - Estructura de datos del API
 */
export interface ExampleDTO {
  id: string;
  title: string;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface CreateExampleDTO {
  title: string;
  description: string;
  status?: string;
}

export interface UpdateExampleDTO {
  title?: string;
  description?: string;
  status?: string;
}

export interface PaginatedResponseDTO<T> {
  data: T[];
  total: number;
  page: number;
  page_size: number;
  has_more: boolean;
}

/**
 * Servicio para interactuar con el API de examples
 */
export class ExampleService {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = `${API_CONFIG.baseUrl}/api/examples`;
  }

  /**
   * Obtiene todos los ejemplos con paginación
   */
  async getAll(params: {
    page?: number;
    pageSize?: number;
    status?: string;
    search?: string;
  }): Promise<PaginatedResponseDTO<ExampleDTO>> {
    const queryParams = new URLSearchParams({
      page: String(params.page || 1),
      page_size: String(params.pageSize || 10),
      ...(params.status && { status: params.status }),
      ...(params.search && { search: params.search }),
    });

    const response = await fetch(`${this.baseUrl}?${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch examples: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Obtiene un ejemplo por ID
   */
  async getById(id: string): Promise<ExampleDTO> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch example: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Crea un nuevo ejemplo
   */
  async create(data: CreateExampleDTO): Promise<ExampleDTO> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Failed to create example: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Actualiza un ejemplo existente
   */
  async update(id: string, data: UpdateExampleDTO): Promise<ExampleDTO> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Failed to update example: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Elimina un ejemplo
   */
  async delete(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Failed to delete example: ${response.statusText}`);
    }
  }

  /**
   * Archiva un ejemplo
   */
  async archive(id: string): Promise<ExampleDTO> {
    return this.update(id, { status: 'archived' });
  }
}

/**
 * Instancia singleton del servicio
 */
export const exampleService = new ExampleService();
