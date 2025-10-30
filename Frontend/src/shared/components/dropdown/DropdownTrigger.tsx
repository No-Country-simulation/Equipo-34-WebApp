import { ElementType } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'
import { IconWrapper } from './IconWrapper'

interface DropdownItem {
  id: number
  label: string
  icon: ElementType
  color: string
}

interface DropdownTriggerProps {
  readonly selectedItem: DropdownItem
  readonly isOpen: boolean
  readonly onToggle: () => void
}

/**
 * Botón trigger del dropdown con animación de chevron
 */
export function DropdownTrigger({ selectedItem, isOpen, onToggle }: DropdownTriggerProps) {
  return (
    <Button
      variant="outline"
      onClick={onToggle}
      className={cn(
        'w-full justify-between bg-neutral-900 text-neutral-400',
        'hover:bg-neutral-800 hover:text-neutral-200',
        'focus:ring-2 focus:ring-neutral-700 focus:ring-offset-2 focus:ring-offset-black',
        'transition-all duration-200 ease-in-out',
        'border border-transparent focus:border-neutral-700',
        'h-10',
        isOpen && 'bg-neutral-800 text-neutral-200'
      )}
      aria-expanded={isOpen}
      aria-haspopup="true"
    >
      <span className="flex items-center">
        <IconWrapper icon={selectedItem.icon} isHovered={false} color={selectedItem.color} />
        {selectedItem.label}
      </span>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        whileHover={{ rotate: 180 }}
        transition={{ duration: 0.2 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '20px',
          height: '20px',
        }}
      >
        <ChevronDown className="w-4 h-4" />
      </motion.div>
    </Button>
  )
}
