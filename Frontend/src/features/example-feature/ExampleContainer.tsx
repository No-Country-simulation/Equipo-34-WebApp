/**
 * Example Container (Patrón Container)
 *
 * Responsable de:
 * - Consumir el caso de uso (lógica de aplicación)
 * - Manejar el estado y las acciones
 * - Renderizar el componente de UI
 *
 * Este es el PUNTO DE ENTRADA de la feature.
 */

'use client';

import { useEffect, useCallback } from 'react';
import { ExampleUI } from './components/ExampleUI';
import { useExampleUseCase } from './use-cases/example.use-case';

export function ExampleContainer() {
  // Consumir el caso de uso
  const {
    data,
    selectedItem,
    loading,
    error,
    pagination,
    fetchData,
    fetchById,
    create,
    update,
    delete: deleteItem,
    setPagination,
    clearError,
  } = useExampleUseCase();

  // Cargar datos al montar el componente
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handlers de UI
  const handleRefresh = useCallback(() => {
    fetchData();
  }, [fetchData]);

  const handleSelectItem = useCallback(
    (id: string) => {
      fetchById(id);
    },
    [fetchById]
  );

  const handleCreateItem = useCallback(() => {
    // En una app real, esto abriría un modal o formulario
    const title = prompt('Título del nuevo item:');
    const description = prompt('Descripción:');

    if (title && description) {
      create(title, description, 'active');
    }
  }, [create]);

  const handleEditItem = useCallback(
    (id: string) => {
      // En una app real, esto abriría un modal o formulario
      const title = prompt('Nuevo título (dejar vacío para no cambiar):');
      const description = prompt(
        'Nueva descripción (dejar vacío para no cambiar):'
      );

      if (title || description) {
        update(id, {
          ...(title && { title }),
          ...(description && { description }),
        });
      }
    },
    [update]
  );

  const handleDeleteItem = useCallback(
    (id: string) => {
      if (confirm('¿Estás seguro de eliminar este item?')) {
        deleteItem(id);
      }
    },
    [deleteItem]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      setPagination({ ...pagination, page });
      fetchData();
    },
    [setPagination, pagination, fetchData]
  );

  // Limpiar error después de 5 segundos
  useEffect(() => {
    if (error) {
      const timer = setTimeout(clearError, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  return (
    <ExampleUI
      data={data}
      selectedItem={selectedItem}
      loading={loading}
      error={error}
      onRefresh={handleRefresh}
      onSelectItem={handleSelectItem}
      onCreateItem={handleCreateItem}
      onEditItem={handleEditItem}
      onDeleteItem={handleDeleteItem}
      onPageChange={handlePageChange}
    />
  );
}
