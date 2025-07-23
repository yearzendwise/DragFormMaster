import { useDroppable } from '@dnd-kit/core';

interface DropIndicatorProps {
  index: number;
  isActive?: boolean;
}

export function DropIndicator({ index, isActive = false }: DropIndicatorProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: `drop-zone-${index}`,
    data: {
      accepts: ['form-element'],
      type: 'drop-zone',
      index: index
    }
  });

  const isHighlighted = isActive && (isOver || isActive);

  return (
    <div
      ref={setNodeRef}
      className={`relative h-2 group transition-all duration-200 ${
        isHighlighted ? 'h-5' : 'hover:h-4'
      }`}
    >
      {/* Drop indicator line */}
      <div className={`absolute inset-x-0 top-1/2 -translate-y-1/2 transition-all duration-200 ${
        isHighlighted 
          ? 'h-1.5 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50' 
          : 'h-0.5 bg-transparent group-hover:bg-slate-300'
      }`} />
    </div>
  );
}