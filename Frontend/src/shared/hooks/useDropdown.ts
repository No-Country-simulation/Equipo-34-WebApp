import { useState, useRef, KeyboardEvent } from 'react';
import { useClickAway } from '@/shared/hooks/useClickAway';

interface UseDropdownProps<T> {
  initialValue: T;
  onSelect?: (value: T) => void;
}

/**
 * Hook para manejar la lógica de un dropdown
 * @param initialValue - Valor inicial seleccionado
 * @param onSelect - Callback cuando se selecciona un valor
 * @returns Estado y funciones del dropdown
 */
export function useDropdown<T>({
  initialValue,
  onSelect,
}: UseDropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<T>(initialValue);
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar el dropdown al hacer click fuera
  useClickAway(dropdownRef, () => setIsOpen(false));

  // Manejar tecla Escape para cerrar
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  // Alternar estado abierto/cerrado
  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  };

  // Seleccionar un valor y cerrar
  const handleSelect = (value: T) => {
    setSelectedValue(value);
    setIsOpen(false);
    onSelect?.(value);
  };

  // Abrir dropdown
  const open = () => setIsOpen(true);

  // Cerrar dropdown
  const close = () => setIsOpen(false);

  return {
    // Estado
    isOpen,
    selectedValue,
    hoveredValue,
    dropdownRef,

    // Acciones
    toggleDropdown,
    handleSelect,
    setHoveredValue,
    handleKeyDown,
    open,
    close,
  };
}
