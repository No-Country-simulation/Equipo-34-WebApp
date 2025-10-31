/**
 * Example UI Component
 *
 * Componente de presentación puro que renderiza la interfaz.
 * No contiene lógica de negocio, solo recibe datos y callbacks.
 */

'use client';

import type { IExampleEntity, IPaginatedResult } from '../domain/types';

interface ExampleUIProps {
  readonly data: IPaginatedResult<IExampleEntity> | null;
  readonly selectedItem: IExampleEntity | null;
  readonly loading: boolean;
  readonly error: string | null;
  readonly onRefresh: () => void;
  readonly onSelectItem: (id: string) => void;
  readonly onCreateItem: () => void;
  readonly onEditItem: (id: string) => void;
  readonly onDeleteItem: (id: string) => void;
  readonly onPageChange: (page: number) => void;
}

export function ExampleUI({
  data,
  selectedItem,
  loading,
  error,
  onRefresh,
  onSelectItem,
  onCreateItem,
  onEditItem,
  onDeleteItem,
  onPageChange,
}: ExampleUIProps) {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            📋 Feature Example Template
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Esta es una plantilla de ejemplo para features del proyecto
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onRefresh}
            disabled={loading}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? '⏳ Cargando...' : '🔄 Refrescar'}
          </button>
          <button
            onClick={onCreateItem}
            className="rounded-lg bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700"
          >
            ➕ Crear Nuevo
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
          <p className="font-semibold text-red-800 dark:text-red-200">
            ❌ Error
          </p>
          <p className="mt-1 text-sm text-red-700 dark:text-red-300">{error}</p>
        </div>
      )}

      {/* Loading State */}
      {loading && !data && (
        <div className="flex items-center justify-center py-12">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
        </div>
      )}

      {/* Data Grid */}
      {data && (
        <>
          <div className="overflow-hidden rounded-lg bg-white shadow-md dark:bg-gray-800">
            <div className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Listado de Ejemplos
                </h2>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Total: {data.total} items
                </span>
              </div>

              {data.items.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-lg text-gray-500 dark:text-gray-400">
                    📭 No hay datos disponibles
                  </p>
                  <p className="mt-2 text-sm text-gray-400 dark:text-gray-500">
                    Crea tu primer item para comenzar
                  </p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {data.items.map(item => (
                    <ExampleCard
                      key={item.id}
                      item={item}
                      isSelected={selectedItem?.id === item.id}
                      onSelect={() => onSelectItem(item.id)}
                      onEdit={() => onEditItem(item.id)}
                      onDelete={() => onDeleteItem(item.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Pagination */}
          {data.total > data.pageSize && (
            <div className="mt-6 flex items-center justify-center gap-2">
              <button
                onClick={() => onPageChange(data.page - 1)}
                disabled={data.page === 1}
                className="rounded-lg bg-gray-200 px-4 py-2 transition-colors hover:bg-gray-300 disabled:cursor-not-allowed disabled:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600"
              >
                ← Anterior
              </button>
              <span className="px-4 py-2 text-gray-700 dark:text-gray-300">
                Página {data.page} de {Math.ceil(data.total / data.pageSize)}
              </span>
              <button
                onClick={() => onPageChange(data.page + 1)}
                disabled={!data.hasMore}
                className="rounded-lg bg-gray-200 px-4 py-2 transition-colors hover:bg-gray-300 disabled:cursor-not-allowed disabled:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600"
              >
                Siguiente →
              </button>
            </div>
          )}
        </>
      )}

      {/* Architecture Info */}
      <div className="mt-12 rounded-lg border border-blue-200 bg-blue-50 p-6 dark:border-blue-800 dark:bg-blue-900/20">
        <h3 className="mb-3 text-lg font-semibold text-blue-900 dark:text-blue-200">
          🏗️ Estructura de la Feature
        </h3>
        <div className="grid gap-4 text-sm md:grid-cols-2">
          <div>
            <p className="mb-2 font-semibold text-blue-800 dark:text-blue-300">
              📁 Capas:
            </p>
            <ul className="space-y-1 text-blue-700 dark:text-blue-400">
              <li>
                •{' '}
                <code className="rounded bg-blue-100 px-1 dark:bg-blue-900">
                  domain/
                </code>{' '}
                - Entidades y reglas de negocio
              </li>
              <li>
                •{' '}
                <code className="rounded bg-blue-100 px-1 dark:bg-blue-900">
                  use-cases/
                </code>{' '}
                - Lógica de aplicación
              </li>
              <li>
                •{' '}
                <code className="rounded bg-blue-100 px-1 dark:bg-blue-900">
                  adapters/
                </code>{' '}
                - Mapeo API ↔ dominio
              </li>
              <li>
                •{' '}
                <code className="rounded bg-blue-100 px-1 dark:bg-blue-900">
                  services/
                </code>{' '}
                - Comunicación con backend
              </li>
              <li>
                •{' '}
                <code className="rounded bg-blue-100 px-1 dark:bg-blue-900">
                  components/
                </code>{' '}
                - UI específica
              </li>
            </ul>
          </div>
          <div>
            <p className="mb-2 font-semibold text-blue-800 dark:text-blue-300">
              🎯 Patrón Container:
            </p>
            <ul className="space-y-1 text-blue-700 dark:text-blue-400">
              <li>• Orquesta casos de uso</li>
              <li>• Maneja estado local</li>
              <li>• Renderiza componentes UI</li>
              <li>• Separa lógica de presentación</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Card component para cada item
 */
interface ExampleCardProps {
  readonly item: IExampleEntity;
  readonly isSelected: boolean;
  readonly onSelect: () => void;
  readonly onEdit: () => void;
  readonly onDelete: () => void;
}

function ExampleCard({
  item,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
}: ExampleCardProps) {
  const statusColors = {
    active:
      'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    inactive:
      'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
    pending:
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    archived: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  };

  return (
    <div
      className={`cursor-pointer rounded-lg border-2 p-4 transition-all ${
        isSelected
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
          : 'border-gray-200 hover:border-blue-300 dark:border-gray-700 dark:hover:border-blue-700'
      }`}
      onClick={onSelect}
    >
      <div className="mb-3 flex items-start justify-between">
        <h3 className="line-clamp-1 font-semibold text-gray-900 dark:text-gray-100">
          {item.title}
        </h3>
        <span
          className={`rounded-full px-2 py-1 text-xs ${statusColors[item.status]}`}
        >
          {item.status}
        </span>
      </div>

      <p className="mb-4 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
        {item.description}
      </p>

      <div className="mb-3 flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
        <span>ID: {item.id.slice(0, 8)}...</span>
        <span>{new Date(item.createdAt).toLocaleDateString()}</span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={e => {
            e.stopPropagation();
            onEdit();
          }}
          className="flex-1 rounded bg-blue-600 px-3 py-1.5 text-sm text-white transition-colors hover:bg-blue-700"
        >
          ✏️ Editar
        </button>
        <button
          onClick={e => {
            e.stopPropagation();
            onDelete();
          }}
          className="flex-1 rounded bg-red-600 px-3 py-1.5 text-sm text-white transition-colors hover:bg-red-700"
        >
          🗑️ Eliminar
        </button>
      </div>
    </div>
  );
}
