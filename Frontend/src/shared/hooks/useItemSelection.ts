import { useState } from 'react';

/**
 * Hook personalizado para manejar la selección de elementos con límite
 * @param maxLimit - Número máximo de elementos que se pueden seleccionar
 * @param initialSelected - Items preseleccionados al inicio (opcional)
 * @returns Objeto con los elementos seleccionados y función para toggle
 */
interface UseItemSelectionProps {
  readonly maxLimit: number;
  readonly initialSelected?: string[];
}

export function useItemSelection({
  maxLimit,
  initialSelected = [],
}: UseItemSelectionProps) {
  const [selected, setSelected] = useState<string[]>(initialSelected);

  const toggleItem = (item: string) => {
    setSelected(prevSelected => {
      // Si el item ya está seleccionado, siempre permitir deseleccionar
      if (prevSelected.includes(item)) {
        return removeItem(prevSelected, item);
      }

      // Si alcanzamos el límite, NO permitir agregar más items
      if (prevSelected.length >= maxLimit) {
        return prevSelected; // Retorna el estado actual sin cambios
      }

      // Si hay espacio disponible, agregar el item
      return addItem(prevSelected, item);
    });
  };

  const clearSelection = () => setSelected([]);

  const isSelected = (item: string) => selected.includes(item);

  return {
    selected,
    toggleItem,
    clearSelection,
    isSelected,
  };
}

// Funciones puras para la lógica de selección
const removeItem = (items: string[], itemToRemove: string) =>
  items.filter(item => item !== itemToRemove);

const replaceLastItem = (items: string[], newItem: string) => {
  const withoutLast = items.slice(0, Math.max(0, items.length - 1));
  return [...withoutLast, newItem];
};

const addItem = (items: string[], newItem: string) => [...items, newItem];
