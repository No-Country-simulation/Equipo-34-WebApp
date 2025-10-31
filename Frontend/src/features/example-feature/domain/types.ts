/**
 * Domain Types - Example Feature
 *
 * Define las interfaces y tipos del dominio.
 * Estas son las entidades y reglas de negocio puras, sin dependencias externas.
 */

/**
 * Entidad principal del dominio
 */
export interface IExampleEntity {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly status: ExampleStatus;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

/**
 * Estados posibles de la entidad
 */
export type ExampleStatus = 'active' | 'inactive' | 'pending' | 'archived';

/**
 * Objeto de valor para filtros
 */
export interface IExampleFilters {
  readonly status?: ExampleStatus;
  readonly searchTerm?: string;
  readonly dateFrom?: Date;
  readonly dateTo?: Date;
}

/**
 * Resultado paginado
 */
export interface IPaginatedResult<T> {
  readonly items: readonly T[];
  readonly total: number;
  readonly page: number;
  readonly pageSize: number;
  readonly hasMore: boolean;
}

/**
 * Parámetros de paginación
 */
export interface IPaginationParams {
  readonly page: number;
  readonly pageSize: number;
}

/**
 * Reglas de negocio del dominio
 */
export const ExampleBusinessRules = {
  /**
   * Valida si un título es válido
   */
  isValidTitle: (title: string): boolean => {
    return title.length >= 3 && title.length <= 100;
  },

  /**
   * Valida si una descripción es válida
   */
  isValidDescription: (description: string): boolean => {
    return description.length >= 10 && description.length <= 500;
  },

  /**
   * Verifica si una entidad puede ser archivada
   */
  canBeArchived: (entity: IExampleEntity): boolean => {
    return entity.status === 'inactive';
  },

  /**
   * Verifica si una entidad puede ser editada
   */
  canBeEdited: (entity: IExampleEntity): boolean => {
    return entity.status !== 'archived';
  },
} as const;
