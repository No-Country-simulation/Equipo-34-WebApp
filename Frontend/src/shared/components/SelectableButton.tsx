'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

const transitionProps = {
  type: 'spring' as const,
  stiffness: 500,
  damping: 30,
  mass: 0.5,
};

interface SelectableButtonProps {
  readonly item: string;
  readonly isSelected: boolean;
  readonly isDisabled?: boolean;
  readonly onToggle: () => void;
}

const getBackgroundColor = (isSelected: boolean, isDisabled: boolean) => {
  if (isSelected) return '#2a1711';
  if (isDisabled) return 'rgba(39, 39, 42, 0.3)';
  return 'rgba(39, 39, 42, 0.5)';
};

const getButtonClasses = (isSelected: boolean, isDisabled: boolean) => {
  if (isSelected) {
    return 'text-[#ff9066] ring-[hsla(0,0%,100%,0.12)]';
  }
  if (isDisabled) {
    return 'text-zinc-600 ring-[hsla(0,0%,100%,0.03)] cursor-default pointer-events-none';
  }
  return 'text-zinc-400 ring-[hsla(0,0%,100%,0.06)] cursor-pointer';
};

const getHoverBackground = (isSelected: boolean) =>
  isSelected ? '#2a1711' : 'rgba(39, 39, 42, 0.8)';

/**
 * Botón seleccionable con animaciones de Framer Motion
 * Muestra un icono de check cuando está seleccionado
 */
export const SelectableButton = ({
  item,
  isSelected,
  isDisabled = false,
  onToggle,
}: SelectableButtonProps) => {
  return (
    <motion.button
      onClick={isDisabled ? undefined : onToggle}
      disabled={isDisabled}
      layout
      initial={false}
      animate={{
        backgroundColor: getBackgroundColor(isSelected, isDisabled),
        opacity: isDisabled ? 0.5 : 1,
      }}
      className={`inline-flex items-center overflow-hidden rounded-full px-4 py-2 text-base font-medium whitespace-nowrap ring-1 transition-none ring-inset ${getButtonClasses(isSelected, isDisabled)} `}
      whileHover={
        isDisabled
          ? {}
          : {
              backgroundColor: getHoverBackground(isSelected),
            }
      }
    >
      <motion.div
        className="relative flex items-center"
        animate={{
          width: isSelected ? 'auto' : '100%',
          paddingRight: isSelected ? '1.5rem' : '0',
        }}
        transition={{
          ease: [0.175, 0.885, 0.32, 1.275],
          duration: 0.3,
        }}
      >
        <span>{item}</span>
        <AnimatePresence>
          {isSelected && (
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={transitionProps}
              className="absolute right-0"
            >
              <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#ff9066]">
                <Check className="h-3 w-3 text-[#2a1711]" strokeWidth={1.5} />
              </div>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.button>
  );
};
