// Removed drag and drop imports - using button-based movement instead
import { useState, useEffect, useRef } from 'react';
import { useFormBuilder } from '@/hooks/use-form-builder';
import { ComponentPalette } from '@/components/form-builder/component-palette';
import { FormCanvas } from '@/components/form-builder/form-canvas';
import { PropertiesPanel } from '@/components/form-builder/properties-panel';
import { FormElementType, DragItem } from '@/types/form-builder';
import { Button } from '@/components/ui/button';

interface BuildStepProps {
  onDataChange: (title: string, elements: any[]) => void;
  initialTitle?: string;
  initialElements?: any[];
}

export function BuildStep({ onDataChange, initialTitle, initialElements }: BuildStepProps) {
  const {
    formTitle,
    elements,
    selectedElementId,
    previewMode,
    addElement,
    updateElement,
    removeElement,
    moveElement,
    selectElement,
    updateFormTitle,
    togglePreview,
    resetFormData,
  } = useFormBuilder(initialTitle, initialElements);

  const [showMobileAdd, setShowMobileAdd] = useState(false);
  const [showMobileProperties, setShowMobileProperties] = useState(false);

  // Removed drag and drop sensors - using button-based movement

  const selectedElement = elements.find(el => el.id === selectedElementId) || null;
  
  // Use refs to track data and initialization
  const lastSentData = useRef<{title: string, elements: any[]}>({ title: '', elements: [] });
  const hasInitialized = useRef(false);
  
  // Initialize form data from props on first mount or when props change significantly
  useEffect(() => {
    if (initialTitle && initialElements && initialElements.length > 0) {
      // Only reset if we haven't initialized yet, or if the data is very different
      const shouldReset = !hasInitialized.current || 
                         (initialTitle !== formTitle && elements.length === 0);
      
      if (shouldReset) {
        resetFormData(initialTitle, initialElements);
        hasInitialized.current = true;
      }
    }
  }, [initialTitle, initialElements, formTitle, elements.length, resetFormData]);
  
  // Update parent component when data changes (with comparison to prevent loops)
  useEffect(() => {
    const dataChanged = formTitle !== lastSentData.current.title || 
                       elements.length !== lastSentData.current.elements.length ||
                       elements.some((el, idx) => el.id !== lastSentData.current.elements[idx]?.id);
    
    if (dataChanged) {
      onDataChange(formTitle, elements);
      lastSentData.current = { title: formTitle, elements: [...elements] };
    }
  }, [formTitle, elements, onDataChange]);

  // Removed drag handlers - using button-based movement instead

  const handleAddElement = (type: FormElementType) => {
    addElement(type);
  };

  const handleDeselectElement = () => {
    selectElement(null);
    setShowMobileProperties(false);
  };

  const handleMobileEdit = (elementId: string) => {
    selectElement(elementId);
    setShowMobileProperties(true);
  };

  return (
    <div className="flex-1 flex relative">
      {/* Left Sidebar - Component Palette */}
      <div className="hidden lg:block flex-none">
        <ComponentPalette onAddElement={handleAddElement} />
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <FormCanvas
          formTitle={formTitle}
          elements={elements}
          selectedElementId={selectedElementId}
          previewMode={previewMode}
          draggedType={null}
          onSelectElement={selectElement}
          onRemoveElement={removeElement}
          onUpdateElement={updateElement}
          onUpdateFormTitle={updateFormTitle}
          onTogglePreview={togglePreview}
          onMobileEdit={handleMobileEdit}
          isDragging={false}
          onMoveElement={moveElement}
        />
      </div>
      
      {/* Right Sidebar - Properties Panel */}
      <div className="hidden lg:block flex-none">
        <PropertiesPanel
          selectedElement={selectedElement}
          onUpdateElement={updateElement}
          onDeselectElement={handleDeselectElement}
        />
      </div>

      {/* Mobile Floating Add Button */}
      {!previewMode && (
        <div className="lg:hidden fixed bottom-6 left-6 z-50">
          <Button
            size="lg"
            className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200"
            onClick={() => setShowMobileAdd(true)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </Button>
        </div>
      )}

      {/* Mobile Add Components Modal */}
      {showMobileAdd && (
          <div className="lg:hidden fixed inset-0 bg-black/50 z-[300] flex items-end">
            <div className="bg-white w-full max-h-[70vh] rounded-t-2xl flex flex-col">
              <div className="flex-shrink-0 p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Add Component</h3>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setShowMobileAdd(false)}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </Button>
                </div>
              </div>
              <div className="flex-1 p-4 overflow-y-auto overscroll-contain" style={{ WebkitOverflowScrolling: 'touch' }}>
                <ComponentPalette 
                  onAddElement={(type) => {
                    handleAddElement(type);
                    setShowMobileAdd(false);
                  }} 
                />
              </div>
            </div>
          </div>
      )}

      {/* Mobile Properties Modal */}
      {showMobileProperties && selectedElement && (
          <div className="lg:hidden fixed inset-0 bg-black/50 z-[300] flex items-end">
            <div className="bg-white w-full max-h-[80vh] rounded-t-2xl flex flex-col">
              <div className="flex-shrink-0 p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Edit Component</h3>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setShowMobileProperties(false)}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </Button>
                </div>
              </div>
              <div className="flex-1 p-4 overflow-y-auto overscroll-contain" style={{ WebkitOverflowScrolling: 'touch' }}>
                <PropertiesPanel
                  selectedElement={selectedElement}
                  onUpdateElement={updateElement}
                  onDeselectElement={handleDeselectElement}
                />
              </div>
            </div>
          </div>
        )}
        
        {/* Removed drag overlay - using button-based movement */}
    </div>
  );
}