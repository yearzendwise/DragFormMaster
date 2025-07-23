import { FormElement } from '@/types/form-builder';
import { FormElementRenderer } from './form-element-renderer';

interface SortableFormElementProps {
  element: FormElement;
  isSelected: boolean;
  onSelect: (id: string | null) => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, updates: Partial<FormElement>) => void;
  onMobileEdit?: (id: string) => void;
  isGlobalDragging?: boolean;
  onMoveUp?: (id: string) => void;
  onMoveDown?: (id: string) => void;
  canMoveUp?: boolean;
  canMoveDown?: boolean;
}

export function SortableFormElement({
  element,
  isSelected,
  onSelect,
  onRemove,
  onUpdate,
  onMobileEdit,
  isGlobalDragging = false,
  onMoveUp,
  onMoveDown,
  canMoveUp = true,
  canMoveDown = true,
}: SortableFormElementProps) {
  return (
    <div>
      <FormElementRenderer
        element={element}
        isSelected={isSelected}
        onSelect={onSelect}
        onRemove={onRemove}
        onUpdate={onUpdate}
        previewMode={false}
        onMobileEdit={onMobileEdit}
        isDragging={isGlobalDragging}
        onMoveUp={onMoveUp}
        onMoveDown={onMoveDown}
        canMoveUp={canMoveUp}
        canMoveDown={canMoveDown}
      />
    </div>
  );
}