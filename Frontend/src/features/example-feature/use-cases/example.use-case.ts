/**
 * Example Use Case
 *
 * Contiene la lógica de aplicación para la feature de ejemplo.
 * Orquesta servicios, adapters y reglas de negocio.
 */

'use client';

import { useState, useCallback } from 'react';
import type {
  IExampleEntity,
  IExampleFilters,
  IPaginatedResult,
  IPaginationParams,
  ExampleStatus,
} from '../domain/types';
import { ExampleBusinessRules } from '../domain/types';
import { exampleService } from '../services/example.service';
import { ExampleAdapter } from '../adapters/example.adapter';

/**
 * Estado del caso de uso
 */
interface ExampleUseCaseState {
  data: IPaginatedResult<IExampleEntity> | null;
  selectedItem: IExampleEntity | null;
  loading: boolean;
  error: string | null;
  filters: IExampleFilters;
  pagination: IPaginationParams;
}

/**
 * Hook personalizado para el caso de uso de Example
 */
export function useExampleUseCase() {
  const [state, setState] = useState<ExampleUseCaseState>({
    data: null,
    selectedItem: null,
    loading: false,
    error: null,
    filters: {},
    pagination: { page: 1, pageSize: 10 },
  });

  /**
   * Obtiene la lista de ejemplos con filtros y paginación
   */
  const fetchData = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await exampleService.getAll({
        page: state.pagination.page,
        pageSize: state.pagination.pageSize,
        status: state.filters.status,
        search: state.filters.searchTerm,
      });

      const result = ExampleAdapter.toDomain.paginated(response);

      setState(prev => ({
        ...prev,
        data: result,
        loading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to fetch data',
        loading: false,
      }));
    }
  }, [state.pagination, state.filters]);

  /**
   * Obtiene un ejemplo por ID
   */
  const fetchById = useCallback(async (id: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const dto = await exampleService.getById(id);
      const entity = ExampleAdapter.toDomain.single(dto);

      setState(prev => ({
        ...prev,
        selectedItem: entity,
        loading: false,
      }));

      return entity;
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to fetch item',
        loading: false,
      }));
      return null;
    }
  }, []);

  /**
   * Crea un nuevo ejemplo
   */
  const create = useCallback(
    async (title: string, description: string, status?: ExampleStatus) => {
      // Validaciones de negocio
      if (!ExampleBusinessRules.isValidTitle(title)) {
        setState(prev => ({
          ...prev,
          error: 'El título debe tener entre 3 y 100 caracteres',
        }));
        return null;
      }

      if (!ExampleBusinessRules.isValidDescription(description)) {
        setState(prev => ({
          ...prev,
          error: 'La descripción debe tener entre 10 y 500 caracteres',
        }));
        return null;
      }

      setState(prev => ({ ...prev, loading: true, error: null }));

      try {
        const dto = await exampleService.create({
          title,
          description,
          status,
        });

        const entity = ExampleAdapter.toDomain.single(dto);

        // Refrescar la lista
        await fetchData();

        setState(prev => ({ ...prev, loading: false }));

        return entity;
      } catch (error) {
        setState(prev => ({
          ...prev,
          error:
            error instanceof Error ? error.message : 'Failed to create item',
          loading: false,
        }));
        return null;
      }
    },
    [fetchData]
  );

  /**
   * Actualiza un ejemplo existente
   */
  const update = useCallback(
    async (
      id: string,
      updates: { title?: string; description?: string; status?: ExampleStatus }
    ) => {
      // Validaciones de negocio
      if (updates.title && !ExampleBusinessRules.isValidTitle(updates.title)) {
        setState(prev => ({
          ...prev,
          error: 'El título debe tener entre 3 y 100 caracteres',
        }));
        return null;
      }

      if (
        updates.description &&
        !ExampleBusinessRules.isValidDescription(updates.description)
      ) {
        setState(prev => ({
          ...prev,
          error: 'La descripción debe tener entre 10 y 500 caracteres',
        }));
        return null;
      }

      setState(prev => ({ ...prev, loading: true, error: null }));

      try {
        const dto = await exampleService.update(id, updates);
        const entity = ExampleAdapter.toDomain.single(dto);

        // Refrescar la lista
        await fetchData();

        setState(prev => ({ ...prev, loading: false }));

        return entity;
      } catch (error) {
        setState(prev => ({
          ...prev,
          error:
            error instanceof Error ? error.message : 'Failed to update item',
          loading: false,
        }));
        return null;
      }
    },
    [fetchData]
  );

  /**
   * Elimina un ejemplo
   */
  const deleteItem = useCallback(
    async (id: string) => {
      setState(prev => ({ ...prev, loading: true, error: null }));

      try {
        await exampleService.delete(id);

        // Refrescar la lista
        await fetchData();

        setState(prev => ({ ...prev, loading: false }));

        return true;
      } catch (error) {
        setState(prev => ({
          ...prev,
          error:
            error instanceof Error ? error.message : 'Failed to delete item',
          loading: false,
        }));
        return false;
      }
    },
    [fetchData]
  );

  /**
   * Archiva un ejemplo (si cumple las reglas de negocio)
   */
  const archive = useCallback(
    async (entity: IExampleEntity) => {
      if (!ExampleBusinessRules.canBeArchived(entity)) {
        setState(prev => ({
          ...prev,
          error: 'Solo se pueden archivar elementos inactivos',
        }));
        return null;
      }

      return update(entity.id, { status: 'archived' });
    },
    [update]
  );

  /**
   * Actualiza los filtros
   */
  const setFilters = useCallback((filters: IExampleFilters) => {
    setState(prev => ({
      ...prev,
      filters,
      pagination: { ...prev.pagination, page: 1 }, // Reset a página 1
    }));
  }, []);

  /**
   * Actualiza la paginación
   */
  const setPagination = useCallback((pagination: IPaginationParams) => {
    setState(prev => ({ ...prev, pagination }));
  }, []);

  /**
   * Limpia el error
   */
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    // Estado
    data: state.data,
    selectedItem: state.selectedItem,
    loading: state.loading,
    error: state.error,
    filters: state.filters,
    pagination: state.pagination,

    // Acciones CRUD
    fetchData,
    fetchById,
    create,
    update,
    delete: deleteItem,
    archive,

    // Filtros y paginación
    setFilters,
    setPagination,

    // Utils
    clearError,
  };
}
