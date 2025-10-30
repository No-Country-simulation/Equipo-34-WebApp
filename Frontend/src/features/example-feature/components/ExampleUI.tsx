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
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            📋 Feature Example Template
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Esta es una plantilla de ejemplo para features del proyecto
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onRefresh}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
          >
            {loading ? '⏳ Cargando...' : '🔄 Refrescar'}
          </button>
          <button
            onClick={onCreateItem}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            ➕ Crear Nuevo
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-800 dark:text-red-200 font-semibold">❌ Error</p>
          <p className="text-red-700 dark:text-red-300 text-sm mt-1">{error}</p>
        </div>
      )}

      {/* Loading State */}
      {loading && !data && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
        </div>
      )}

      {/* Data Grid */}
      {data && (
        <>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Listado de Ejemplos
                </h2>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Total: {data.total} items
                </span>
              </div>

              {data.items.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400 text-lg">
                    📭 No hay datos disponibles
                  </p>
                  <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
                    Crea tu primer item para comenzar
                  </p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {data.items.map((item) => (
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
            <div className="mt-6 flex justify-center items-center gap-2">
              <button
                onClick={() => onPageChange(data.page - 1)}
                disabled={data.page === 1}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                ← Anterior
              </button>
              <span className="px-4 py-2 text-gray-700 dark:text-gray-300">
                Página {data.page} de {Math.ceil(data.total / data.pageSize)}
              </span>
              <button
                onClick={() => onPageChange(data.page + 1)}
                disabled={!data.hasMore}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                Siguiente →
              </button>
            </div>
          )}
        </>
      )}

      {/* Architecture Info */}
      <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-200 mb-3">
          🏗️ Estructura de la Feature
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-semibold text-blue-800 dark:text-blue-300 mb-2">📁 Capas:</p>
            <ul className="space-y-1 text-blue-700 dark:text-blue-400">
              <li>• <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">domain/</code> - Entidades y reglas de negocio</li>
              <li>• <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">use-cases/</code> - Lógica de aplicación</li>
              <li>• <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">adapters/</code> - Mapeo API ↔ dominio</li>
              <li>• <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">services/</code> - Comunicación con backend</li>
              <li>• <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">components/</code> - UI específica</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-blue-800 dark:text-blue-300 mb-2">🎯 Patrón Container:</p>
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

function ExampleCard({ item, isSelected, onSelect, onEdit, onDelete }: ExampleCardProps) {
  const statusColors = {
    active: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    inactive: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    archived: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  };

  return (
    <div
      className={`p-4 border-2 rounded-lg transition-all cursor-pointer ${
        isSelected
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
          : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
      }`}
      onClick={onSelect}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">
          {item.title}
        </h3>
        <span className={`px-2 py-1 text-xs rounded-full ${statusColors[item.status]}`}>
          {item.status}
        </span>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
        {item.description}
      </p>

      <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-500 mb-3">
        <span>ID: {item.id.slice(0, 8)}...</span>
        <span>{new Date(item.createdAt).toLocaleDateString()}</span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="flex-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors"
        >
          ✏️ Editar
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="flex-1 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors"
        >
          🗑️ Eliminar
        </button>
      </div>
    </div>
  );
}
