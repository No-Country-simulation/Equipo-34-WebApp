'use client';

import { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useItemSelection } from '@/shared/hooks/useItemSelection';
import { SelectableButton } from '@/shared/components/SelectableButton';

// Types
export interface SelectableItem {
  id: string;
  name: string;
}

// Data Mock
const dataItemsMock: SelectableItem[] = [
  { id: '1', name: 'Lectura' },
  { id: '2', name: 'Escritura' },
  { id: '3', name: 'Actualización' },
  { id: '4', name: 'Eliminación' },
];

const selectedItemsMock: SelectableItem[] = [
  { id: '1', name: 'Lectura' },
  { id: '2', name: 'Escritura' },
];

const limitMock = 2;

// Animation
const transitionProps = {
  type: 'spring' as const,
  stiffness: 500,
  damping: 30,
  mass: 0.5,
};

// Label
const label = {
  title: 'Choose your items?',
  subTitle: 'You have chosen %d of %d',
};

// Interface
interface CustomizableSelectorProps {
  readonly dataItems?: SelectableItem[];
  readonly selectedItems?: SelectableItem[];
  readonly limit?: number;
}

/**
 * Componente selector personalizable con límite de selección
 * Permite seleccionar múltiples items con animaciones
 */
export default function CustomizableSelector({
  dataItems = dataItemsMock,
  selectedItems = selectedItemsMock,
  limit = limitMock,
}: CustomizableSelectorProps) {
  // Calcular límite válido (sin mutar parámetros)
  const validLimit = useMemo(() => {
    const numericLimit = typeof limit === 'number' ? limit : dataItems.length;
    if (numericLimit < 1 || numericLimit > dataItems.length) {
      return dataItems.length;
    }
    return numericLimit;
  }, [limit, dataItems.length]);

  // Extraer solo los IDs para el hook
  const initialSelectedIds = selectedItems.map(item => item.id);

  const { selected, toggleItem } = useItemSelection({
    maxLimit: validLimit,
    initialSelected: initialSelectedIds,
  });

  // Verificar si se alcanzó el límite
  const isLimitReached = selected.length >= validLimit;

  useEffect(() => {
    // Mostrar los items completos seleccionados
    const selectedItems = dataItems.filter(item => selected.includes(item.id));
    console.log('Ha seleccionado:', selectedItems);
  }, [selected, dataItems]);

  return (
    <div className="min-h-screen bg-black p-6 pt-40">
      <h1 className="mb-12 text-center text-3xl font-semibold text-white">
        {label.title}
        <br />
        <span className="text-lg text-zinc-400">
          {label.subTitle
            .replace('%d', String(selected.length))
            .replace('%d', String(validLimit))}
        </span>
      </h1>
      <div className="mx-auto max-w-[570px]">
        <motion.div
          className="flex flex-wrap gap-3 overflow-visible"
          layout
          transition={transitionProps}
        >
          {dataItems.map(item => {
            const isSelected = selected.includes(item.id);
            const isDisabled = !isSelected && isLimitReached;

            return (
              <SelectableButton
                key={item.id}
                item={item.name}
                isSelected={isSelected}
                isDisabled={isDisabled}
                onToggle={() => toggleItem(item.id)}
              />
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
