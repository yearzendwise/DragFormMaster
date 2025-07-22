import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FormElement } from '@/types/form-builder';
import { FormElementRenderer } from './form-element-renderer';

interface SortableFormElementProps {
  element: FormElement;
  isSelected: boolean;
  onSelect: (id: string | null) => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, updates: Partial<FormElement>) => void;
}

export function SortableFormElement({
  element,
  isSelected,
  onSelect,
  onRemove,
  onUpdate,
}: SortableFormElementProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: element.id,
    data: {
      type: element.type,
      isNew: false,
      elementId: element.id,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div className="relative">
        <div
          {...listeners}
          className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing z-10"
        >
          <i className="fas fa-grip-vertical text-neutral-400 text-xs"></i>
        </div>
        <FormElementRenderer
          element={element}
          isSelected={isSelected}
          onSelect={onSelect}
          onRemove={onRemove}
          onUpdate={onUpdate}
          previewMode={false}
        />
      </div>
    </div>
  );
}