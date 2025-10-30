'use client'

import { ElementType, Fragment, KeyboardEvent } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/shared/lib/utils'
import { IconWrapper } from './IconWrapper'

export interface DropdownItem {
  id: number
  label: string
  icon: ElementType
  color: string
}

interface DropdownContentProps {
  readonly items: DropdownItem[]
  readonly selectedItem: DropdownItem
  readonly hoveredItem: number | null
  readonly onSelectItem: (item: DropdownItem) => void
  readonly onHoverItem: (id: number | null) => void
  readonly onKeyDown: (e: KeyboardEvent) => void
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
}

/**
 * Contenido animado del dropdown con lista de items
 */
export function DropdownContent({
  items,
  selectedItem,
  hoveredItem,
  onSelectItem,
  onHoverItem,
  onKeyDown,
}: DropdownContentProps) {
  // Determinar qué item debe tener el highlight
    const activeItemId = hoveredItem ?? selectedItem.id
    const highlightIndex = items.findIndex((item) => item.id === activeItemId)

  // Calcular la posición Y del highlight (cada item tiene 40px de altura)
  const highlightY = highlightIndex >= 0 ? highlightIndex * 40 : 0

  return (
    <motion.div
      initial={{ opacity: 1, y: 0, height: 0 }}
      animate={{
        opacity: 1,
        y: 0,
        height: 'auto',
        transition: {
          type: 'spring',
          stiffness: 500,
          damping: 30,
          mass: 1,
        },
      }}
      exit={{
        opacity: 0,
        y: 0,
        height: 0,
        transition: {
          type: 'spring',
          stiffness: 500,
          damping: 30,
          mass: 1,
        },
      }}
      className="absolute left-4 right-4 top-full mt-2"
      onKeyDown={onKeyDown}
    >
      <motion.div
        className={cn('absolute w-full rounded-lg border border-neutral-800', 'bg-neutral-900 p-1 shadow-lg')}
        initial={{ borderRadius: 8 }}
        animate={{
          borderRadius: 12,
          transition: { duration: 0.2 },
        }}
        style={{ transformOrigin: 'top' }}
      >
        <motion.div className="py-2 relative" variants={containerVariants} initial="hidden" animate="visible">
          <motion.div
            layoutId="hover-highlight"
            className="absolute inset-x-1 bg-neutral-800 rounded-md"
            animate={{
              y: highlightY,
              height: 40,
            }}
            transition={{
              type: 'spring',
              bounce: 0.15,
              duration: 0.5,
            }}
          />
          {items.map((item, index) => (
            <Fragment key={item.id}>
              <motion.button
                onClick={() => onSelectItem(item)}
                onHoverStart={() => onHoverItem(item.id)}
                onHoverEnd={() => onHoverItem(null)}
                className={cn(
                  'relative flex w-full items-center px-4 py-2.5 text-sm rounded-md',
                  'transition-colors duration-150',
                  'focus:outline-none',
                  selectedItem.id === item.id || hoveredItem === item.id ? 'text-neutral-200' : 'text-neutral-400'
                )}
                whileTap={{ scale: 0.98 }}
                variants={itemVariants}
              >
                <IconWrapper icon={item.icon} isHovered={hoveredItem === item.id} color={item.color} />
                {item.label}
              </motion.button>
            </Fragment>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
