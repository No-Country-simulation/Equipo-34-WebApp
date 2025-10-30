/**
 * Example Adapter
 * 
 * Mapea entre DTOs del API y entidades del dominio.
 * Responsable de transformar datos externos al formato interno del dominio.
 */

import type { IExampleEntity, ExampleStatus, IPaginatedResult } from '../domain/types';
import type { ExampleDTO, PaginatedResponseDTO } from '../services/example.service';

/**
 * Convierte un DTO del API a una entidad del dominio
 */
export function mapDTOToEntity(dto: ExampleDTO): IExampleEntity {
  return {
    id: dto.id,
    title: dto.title,
    description: dto.description,
    status: dto.status as ExampleStatus,
    createdAt: new Date(dto.created_at),
    updatedAt: new Date(dto.updated_at),
  };
}

/**
 * Convierte una entidad del dominio a un DTO para el API
 */
export function mapEntityToDTO(entity: Partial<IExampleEntity>): Partial<ExampleDTO> {
  return {
    ...(entity.id && { id: entity.id }),
    ...(entity.title && { title: entity.title }),
    ...(entity.description && { description: entity.description }),
    ...(entity.status && { status: entity.status }),
    ...(entity.createdAt && { created_at: entity.createdAt.toISOString() }),
    ...(entity.updatedAt && { updated_at: entity.updatedAt.toISOString() }),
  };
}

/**
 * Convierte un array de DTOs a entidades del dominio
 */
export function mapDTOsToEntities(dtos: ExampleDTO[]): IExampleEntity[] {
  return dtos.map(mapDTOToEntity);
}

/**
 * Convierte una respuesta paginada del API a un resultado paginado del dominio
 */
export function mapPaginatedResponseToResult<T extends ExampleDTO>(
  response: PaginatedResponseDTO<T>
): IPaginatedResult<IExampleEntity> {
  return {
    items: mapDTOsToEntities(response.data),
    total: response.total,
    page: response.page,
    pageSize: response.page_size,
    hasMore: response.has_more,
  };
}

/**
 * Adapter principal - Encapsula todas las operaciones de mapeo
 */
export const ExampleAdapter = {
  /**
   * API → Domain
   */
  toDomain: {
    single: mapDTOToEntity,
    list: mapDTOsToEntities,
    paginated: mapPaginatedResponseToResult,
  },

  /**
   * Domain → API
   */
  toDTO: {
    single: mapEntityToDTO,
    list: (entities: Partial<IExampleEntity>[]): Partial<ExampleDTO>[] => {
      return entities.map(mapEntityToDTO);
    },
  },
} as const;
