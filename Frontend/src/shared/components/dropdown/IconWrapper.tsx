import { ElementType } from 'react';
import { motion } from 'framer-motion';

interface IconWrapperProps {
  readonly icon: ElementType;
  readonly isHovered: boolean;
  readonly color: string;
}

/**
 * Wrapper animado para iconos con efecto de hover
 */
export function IconWrapper({
  icon: Icon,
  isHovered,
  color,
}: IconWrapperProps) {
  return (
    <motion.div
      className="relative mr-2 h-4 w-4"
      initial={false}
      animate={isHovered ? { scale: 1.2 } : { scale: 1 }}
    >
      <Icon className="h-4 w-4" />
      {isHovered && (
        <motion.div
          className="absolute inset-0"
          style={{ color }}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <Icon className="h-4 w-4" strokeWidth={2} />
        </motion.div>
      )}
    </motion.div>
  );
}
