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
  onMobileEdit?: (id: string) => void;
}

export function SortableFormElement({
  element,
  isSelected,
  onSelect,
  onRemove,
  onUpdate,
  onMobileEdit,
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
          className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 md:opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing z-10 select-none opacity-70 lg:opacity-0"
          style={{ 
            touchAction: 'none',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            msUserSelect: 'none'
          }}
          onMouseDown={(e) => e.preventDefault()}
          onTouchStart={(e) => e.preventDefault()}
        >
          <div className="w-4 h-4 bg-gray-400 rounded-sm flex items-center justify-center md:bg-transparent">
            <svg className="w-2.5 h-2.5 text-white md:text-gray-400 pointer-events-none" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </div>
        </div>
        <FormElementRenderer
          element={element}
          isSelected={isSelected}
          onSelect={onSelect}
          onRemove={onRemove}
          onUpdate={onUpdate}
          previewMode={false}
          onMobileEdit={onMobileEdit}
        />
      </div>
    </div>
  );
}