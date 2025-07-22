import { useDraggable } from '@dnd-kit/core';
import { ComponentPaletteItem, FormElementType } from '@/types/form-builder';

interface DraggableComponentProps {
  item: ComponentPaletteItem;
  onAddElement: (type: FormElementType) => void;
}

export function DraggableComponent({ item, onAddElement }: DraggableComponentProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id: item.type,
    data: {
      type: item.type,
      isNew: true,
    },
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    opacity: isDragging ? 0.5 : 1,
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="group p-4 border border-neutral-200 rounded-lg hover:border-blue-400 hover:shadow-sm transition-all cursor-grab active:cursor-grabbing"
      onClick={() => onAddElement(item.type)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`w-8 h-8 ${item.color} rounded-lg flex items-center justify-center`}>
            <i className={`${item.icon} text-sm`}></i>
          </div>
          <div>
            <div className="text-sm font-medium text-neutral-800">{item.label}</div>
            <div className="text-xs text-neutral-500">{item.description}</div>
          </div>
        </div>
        <i className="fas fa-grip-vertical text-neutral-400 group-hover:text-blue-600 transition-colors"></i>
      </div>
    </div>
  );
}
