'use client'
import { MotionConfig, AnimatePresence } from 'framer-motion'
import { Shirt, Briefcase, Smartphone, Home, Layers } from 'lucide-react'
import { useDropdown } from '@/shared/hooks/useDropdown'
import { DropdownItem, DropdownContent } from '@/shared/components/dropdown/DropdownContent'
import { DropdownTrigger } from '@/shared/components/dropdown/DropdownTrigger'

// Data Items Mock
const itemsMock: DropdownItem[] = [
  { id: 0, label: 'All', icon: Layers, color: '#A06CD5' },
  { id: 1, label: 'Lifestyle', icon: Shirt, color: '#FF6B6B' },
  { id: 2, label: 'Desk', icon: Briefcase, color: '#4ECDC4' },
  { id: 3, label: 'Tech', icon: Smartphone, color: '#45B7D1' },
  { id: 4, label: 'Home', icon: Home, color: '#F9C74F' },
]
// Selected Item Mock
const itemSelectedMock: DropdownItem[] = [{ id: 3, label: 'Tech', icon: Smartphone, color: '#45B7D1' }]

const labelMock = {
  title: 'Select an item',
  subTitle: 'You have selected %s',
}

interface FluidDropdownProps {
  readonly items?: DropdownItem[]
  readonly selected?: DropdownItem[]
  readonly label?: {
    title?: string
    subTitle?: string
  }
}

export default function FluidDropdown({
  items = itemsMock,
  selected = itemSelectedMock,
  label: customLabel,
}: FluidDropdownProps) {
  const labels = {
    title: customLabel?.title || labelMock.title,
    subTitle: customLabel?.subTitle || labelMock.subTitle,
  }

  const {
    isOpen,
    selectedValue: selectedItem,
    hoveredValue: hoveredItem,
    dropdownRef,
    toggleDropdown,
    handleSelect,
    setHoveredValue,
    handleKeyDown,
  } = useDropdown<DropdownItem>({
    initialValue: selected[0] || items[0],
    onSelect: (item) => console.log('Selected:', item),
  })

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="w-full max-w-md mx-auto px-4">
          {/* Title */}
          <h1 className="text-white text-2xl font-semibold mb-2 text-center">{labels.title}</h1>

          {/* Subtitle with selected item */}
          <p className="text-zinc-400 text-sm mb-6 text-center">{labels.subTitle.replace('%s', selectedItem.label)}</p>

          <div className="relative" style={{ height: '40px' }} ref={dropdownRef}>
            <DropdownTrigger selectedItem={selectedItem} isOpen={isOpen} onToggle={toggleDropdown} />

            <AnimatePresence>
              {isOpen && (
                <DropdownContent
                  items={items}
                  selectedItem={selectedItem}
                  hoveredItem={hoveredItem}
                  onSelectItem={handleSelect}
                  onHoverItem={setHoveredValue}
                  onKeyDown={handleKeyDown}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </MotionConfig>
  )
}
