import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { FormElement, DragItem, FormElementType } from '@/types/form-builder';
import { FormElementRenderer } from './form-element-renderer';
import { SortableFormElement } from './sortable-form-element';
import { DropIndicator } from './drop-indicator';

interface DroppableCanvasProps {
  elements: FormElement[];
  selectedElementId: string | null;
  onSelectElement: (id: string | null) => void;
  onRemoveElement: (id: string) => void;
  onUpdateElement: (id: string, updates: Partial<FormElement>) => void;
  formTitle: string;
  previewMode: boolean;
  draggedType: FormElementType | null;
  onMobileEdit?: (id: string) => void;
}

export function DroppableCanvas({
  elements,
  selectedElementId,
  onSelectElement,
  onRemoveElement,
  onUpdateElement,
  formTitle,
  previewMode,
  draggedType,
  onMobileEdit,
}: DroppableCanvasProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: 'form-canvas',
    data: {
      accepts: ['form-element'],
      type: 'canvas'
    }
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
    <div className="flex-1 p-3 md:p-6 overflow-y-auto bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30">
      <div className="max-w-4xl mx-auto">
        <div
          ref={setNodeRef}
          className={`min-h-80 md:min-h-96 bg-white rounded-xl md:rounded-2xl shadow-sm border-2 transition-all duration-300 relative ${
            isOver 
              ? 'border-blue-400 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg shadow-blue-200/25 scale-[1.02]' 
              : 'border-slate-200 border-dashed hover:border-slate-300'
          } ${elements.length === 0 ? 'p-4 md:p-8' : 'p-3 md:p-6'}`}
        >
          {/* Drop indicator when dragging over empty canvas */}
          {isOver && elements.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg font-medium flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Drop to add element
              </div>
            </div>
          )}
          {elements.length === 0 ? (
            <div className="text-center py-12 md:py-20">
              <div className="relative mb-6 md:mb-8">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                  <svg 
                    className="w-8 h-8 md:w-10 md:h-10 text-blue-600" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-5 h-5 md:w-6 md:h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-2 h-2 md:w-3 md:h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              
              <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-2 md:mb-3">Build Your Perfect Form</h3>
              <p className="text-sm md:text-base text-slate-600 mb-6 md:mb-8 max-w-xs md:max-w-md mx-auto leading-relaxed px-4">
                <span className="hidden md:inline">Start by dragging components from the sidebar, or click on any component to add it instantly.</span>
                <span className="md:hidden">Tap components to add them to your form.</span>
              </p>
              
              <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-6 md:mb-8 px-4">
                {['Text Input', 'Email', 'Dropdown', 'Submit Button'].map((component, index) => (
                  <span 
                    key={component}
                    className="px-3 py-1.5 md:px-4 md:py-2 bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 text-xs md:text-sm font-medium rounded-full shadow-sm hover:shadow-md transition-shadow duration-200 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {component}
                  </span>
                ))}
              </div>
              
              <div className="animate-bounce-subtle hidden md:block">
                <div className="text-sm text-slate-500 font-medium">Try it now ↗</div>
              </div>
            </div>
          ) : (
            <SortableContext items={elements.map(el => el.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-0">
                {/* Drop zone at the beginning */}
                <DropIndicator index={0} isActive={draggedType !== null} />
                
                {elements.map((element, index) => (
                  <div key={element.id}>
                    <div
                      className="animate-slide-up"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <SortableFormElement
                        element={element}
                        isSelected={selectedElementId === element.id}
                        onSelect={onSelectElement}
                        onRemove={onRemoveElement}
                        onUpdate={onUpdateElement}
                        onMobileEdit={onMobileEdit}
                      />
                    </div>
                    
                    {/* Drop zone after each element */}
                    <DropIndicator index={index + 1} isActive={draggedType !== null} />
                  </div>
                ))}
                
                {/* Enhanced drop zone for new elements at the end - now simplified since we have indicators */}
                {draggedType && (
                  <div 
                    className={`min-h-8 rounded-lg border-2 border-dashed transition-all duration-300 flex items-center justify-center mt-4 ${
                      isOver 
                        ? 'border-blue-400 bg-blue-50/30 scale-105' 
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="text-slate-400 text-sm opacity-60">
                      Or drop at the end
                    </div>
                  </div>
                )}
              </div>
            </SortableContext>
          )}
        </div>
        
        {/* Floating action hints */}
        {elements.length > 0 && (
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-500">
              <span className="inline-flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
                {elements.length} field{elements.length !== 1 ? 's' : ''} added
              </span>
              <span className="mx-2">•</span>
              <span>Drag to reorder</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}


