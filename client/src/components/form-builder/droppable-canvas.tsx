import { useDroppable } from '@dnd-kit/core';
import { FormElement, FormElementType } from '@/types/form-builder';
import { FormElementRenderer } from './form-element-renderer';
import { SortableFormElement } from './sortable-form-element';
import { DropInsertionIndicator } from './drop-insertion-indicator';
// Removed DropIndicator import - using button-based movement

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
  isDragging?: boolean;
  onMoveElement?: (fromIndex: number, toIndex: number) => void;
  showMoveIndicators?: boolean;
  moveDirection?: 'up' | 'down' | null;
  moveFromIndex?: number;
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
  isDragging = false,
  onMoveElement,
  showMoveIndicators = false,
  moveDirection = null,
  moveFromIndex = -1,
}: DroppableCanvasProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: 'form-canvas',
  });
  const isMobile = window.innerWidth < 1024; // lg breakpoint

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
              ? 'border-blue-400 border-solid bg-gradient-to-br from-blue-50/40 to-indigo-50/30 shadow-blue-100' 
              : isDragging
              ? 'border-blue-300 border-dashed bg-gradient-to-br from-blue-50/20 to-indigo-50/10'
              : 'border-slate-200 border-dashed hover:border-slate-300'
          } ${elements.length === 0 ? 'p-4 md:p-8' : 'p-3 md:p-6'}`}
        >
          {/* Removed drop indicator - using button-based movement */}
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
            <div className="space-y-0">
                {/* Removed drop zone - using button-based movement */}
                
                {elements.map((element, index) => {
                  const isMovingElement = showMoveIndicators && moveFromIndex === index;
                  const showMoveIndicatorAbove = showMoveIndicators && moveDirection === 'up' && moveFromIndex === index + 1;
                  const showMoveIndicatorBelow = showMoveIndicators && moveDirection === 'down' && moveFromIndex === index - 1;
                  
                  return (
                    <div key={element.id} className="relative">
                      {/* Move indicator above */}
                      {showMoveIndicatorAbove && (
                        <div className="h-6 flex items-center justify-center mb-2">
                          <div className="w-full h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 rounded-full shadow-lg shadow-purple-500/30 animate-pulse" />
                        </div>
                      )}
                      
                      <div
                        className={`animate-slide-up relative ${isMovingElement ? 'opacity-50' : ''}`}
                        style={{ 
                          animationDelay: `${index * 50}ms`,
                          zIndex: selectedElementId === element.id ? 200 : 10
                        }}
                      >
                        <SortableFormElement
                          element={element}
                          isSelected={selectedElementId === element.id}
                          onSelect={onSelectElement}
                          onRemove={onRemoveElement}
                          onUpdate={onUpdateElement}
                          onMobileEdit={onMobileEdit}
                          isGlobalDragging={isDragging}
                          onMoveUp={onMoveElement ? (id) => {
                            const elementIndex = elements.findIndex(el => el.id === id);
                            if (elementIndex > 0) {
                              onMoveElement(elementIndex, elementIndex - 1);
                            }
                          } : undefined}
                          onMoveDown={onMoveElement ? (id) => {
                            const elementIndex = elements.findIndex(el => el.id === id);
                            if (elementIndex < elements.length - 1) {
                              onMoveElement(elementIndex, elementIndex + 1);
                            }
                          } : undefined}
                          canMoveUp={index > 0}
                          canMoveDown={index < elements.length - 1}
                          showDropIndicators={!isMobile && draggedType !== null}
                          elementIndex={index}
                        />
                      </div>
                      
                      {/* Move indicator below */}
                      {showMoveIndicatorBelow && (
                        <div className="h-6 flex items-center justify-center mt-2">
                          <div className="w-full h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 rounded-full shadow-lg shadow-purple-500/30 animate-pulse" />
                        </div>
                      )}
                      
                      {/* Removed drop zones - using button-based movement */}
                    </div>
                  );
                })}
                
                {/* Removed drop zone - using button-based movement */}
              </div>
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
            </p>
          </div>
        )}
      </div>
    </div>
  );
}


