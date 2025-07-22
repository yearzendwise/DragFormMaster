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
        isHighlighted ? 'h-8' : 'hover:h-4'
      }`}
    >
      {/* Drop indicator line */}
      <div className={`absolute inset-x-0 top-1/2 -translate-y-1/2 transition-all duration-200 ${
        isHighlighted 
          ? 'h-1 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50' 
          : 'h-0.5 bg-transparent group-hover:bg-slate-300'
      }`} />
      
      {/* Drop zone area */}
      <div className={`absolute inset-0 transition-all duration-200 ${
        isHighlighted 
          ? 'bg-blue-50 border-2 border-dashed border-blue-300 rounded-lg' 
          : 'bg-transparent group-hover:bg-slate-50 border-2 border-dashed border-transparent group-hover:border-slate-200 rounded'
      }`}>
        {isHighlighted && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-blue-500 text-white px-3 py-1 rounded-md text-xs font-medium flex items-center gap-1.5 shadow-lg">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Insert here
            </div>
          </div>
        )}
      </div>
    </div>
  );
}