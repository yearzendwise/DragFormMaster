import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { FormElement, DragItem } from '@/types/form-builder';
import { FormElementRenderer } from './form-element-renderer';
import { SortableFormElement } from './sortable-form-element';

interface DroppableCanvasProps {
  elements: FormElement[];
  selectedElementId: string | null;
  onSelectElement: (id: string | null) => void;
  onRemoveElement: (id: string) => void;
  onUpdateElement: (id: string, updates: Partial<FormElement>) => void;
  formTitle: string;
  previewMode: boolean;
}

export function DroppableCanvas({
  elements,
  selectedElementId,
  onSelectElement,
  onRemoveElement,
  onUpdateElement,
  formTitle,
  previewMode,
}: DroppableCanvasProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: 'form-canvas',
  });

  if (previewMode) {
    return (
      <div className="flex-1 p-6 overflow-y-auto bg-neutral-50">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl border border-neutral-200 p-8">
            <h1 className="text-2xl font-bold text-neutral-800 mb-6">{formTitle}</h1>
            <form className="space-y-6">
              {elements.map((element) => (
                <FormElementRenderer
                  key={element.id}
                  element={element}
                  isSelected={false}
                  onSelect={() => {}}
                  onRemove={() => {}}
                  previewMode={true}
                />
              ))}
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto bg-neutral-50">
      <div className="max-w-2xl mx-auto">
        <div
          ref={setNodeRef}
          className={`min-h-96 bg-white rounded-xl border-2 border-dashed p-8 transition-all ${
            isOver 
              ? 'border-blue-400 bg-blue-50' 
              : 'border-neutral-300'
          }`}
        >
          {elements.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-mouse-pointer text-neutral-400 text-xl"></i>
              </div>
              <h3 className="text-lg font-medium text-neutral-800 mb-2">Start Building Your Form</h3>
              <p className="text-neutral-500 mb-6">Drag form components from the sidebar to get started</p>
              <div className="flex justify-center space-x-3">
                <span className="px-3 py-1 bg-neutral-100 text-neutral-600 text-sm rounded-full">Text Input</span>
                <span className="px-3 py-1 bg-neutral-100 text-neutral-600 text-sm rounded-full">Email</span>
                <span className="px-3 py-1 bg-neutral-100 text-neutral-600 text-sm rounded-full">Submit Button</span>
              </div>
            </div>
          ) : (
            <SortableContext items={elements.map(el => el.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-6">
                {elements.map((element) => (
                  <SortableFormElement
                    key={element.id}
                    element={element}
                    isSelected={selectedElementId === element.id}
                    onSelect={onSelectElement}
                    onRemove={onRemoveElement}
                    onUpdate={onUpdateElement}
                  />
                ))}
              </div>
            </SortableContext>
          )}
        </div>
      </div>
    </div>
  );
}


