import { useState, useEffect, useRef } from 'react';
import { DndContext, DragEndEvent, MouseSensor, TouchSensor, useSensor, useSensors, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { useFormBuilder } from '@/hooks/use-form-builder';
import { ComponentPalette } from '@/components/form-builder/component-palette';
import { FormCanvas } from '@/components/form-builder/form-canvas';
import { PropertiesPanel } from '@/components/form-builder/properties-panel';
import { FormProperties } from '@/components/form-builder/form-properties';

import { FormElementType, DragItem } from '@/types/form-builder';
import { Button } from '@/components/ui/button';


interface BuildStepProps {
  onDataChange: (title: string, elements: any[], settings?: any) => void;
  initialTitle?: string;
  initialElements?: any[];
  initialSettings?: any;
}

export function BuildStep({ onDataChange, initialTitle, initialElements, initialSettings }: BuildStepProps) {
  const {
    formTitle,
    elements,
    selectedElementId,
    previewMode,
    addElement,
    addElementAtIndex,
    updateElement,
    removeElement,
    moveElement,
    selectElement,
    updateFormTitle,
    togglePreview,
    resetFormData,
    formSettings,
    updateFormSettings,
  } = useFormBuilder(initialTitle, initialElements);

  const [showMobileAdd, setShowMobileAdd] = useState(false);
  const [showMobileProperties, setShowMobileProperties] = useState(false);
  const [draggedType, setDraggedType] = useState<FormElementType | null>(null);


  // Configure drag and drop sensors with better desktop support
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 8 }
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { delay: 150, tolerance: 8 }
  });
  const sensors = useSensors(mouseSensor, touchSensor);

  const selectedElement = elements.find(el => el.id === selectedElementId) || null;
  
  // Use refs to track data and initialization
  const lastSentData = useRef<{title: string, elements: any[], settings: any}>({ title: '', elements: [], settings: {} });
  const hasInitialized = useRef(false);
  
  // Initialize form data from props on first mount only
  useEffect(() => {
    if (!hasInitialized.current && initialTitle && initialElements) {
      resetFormData(initialTitle, initialElements);
      hasInitialized.current = true;
    }
  }, []);

  // Initialize settings separately and only once
  useEffect(() => {
    if (initialSettings && Object.keys(initialSettings).length > 0) {
      // Set initial form settings directly in the hook without triggering updates
      Object.keys(initialSettings).forEach(key => {
        updateFormSettings(key, initialSettings[key]);
      });
    }
  }, []);
  
  // Update parent component when data changes (only when user makes actual changes)
  useEffect(() => {
    if (hasInitialized.current) {
      const timeoutId = setTimeout(() => {
        // Simple comparison to detect changes
        const dataChanged = formTitle !== lastSentData.current.title || 
                           elements.length !== lastSentData.current.elements.length ||
                           JSON.stringify(elements) !== JSON.stringify(lastSentData.current.elements) ||
                           JSON.stringify(formSettings) !== JSON.stringify(lastSentData.current.settings);
        
        if (dataChanged) {
          onDataChange(formTitle, elements, formSettings);
          lastSentData.current = { title: formTitle, elements: [...elements], settings: { ...formSettings } };
        }
      }, 100); // 100ms debounce
      
      return () => clearTimeout(timeoutId);
    }
  }, [formTitle, elements, formSettings, onDataChange]);

  // Drag handlers
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    if (active.data.current?.isNew) {
      const type = active.id.toString().replace('palette-', '') as FormElementType;
      setDraggedType(type);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setDraggedType(null);

    if (!over) return;

    // Handle dropping new component from palette
    if (active.data.current?.isNew) {
      const type = active.id.toString().replace('palette-', '') as FormElementType;
      
      // Check if dropping on an insertion point
      if (over.data.current?.isInsertionPoint) {
        const { elementId, position } = over.data.current;
        const targetIndex = elements.findIndex(el => el.id === elementId);
        
        if (targetIndex !== -1) {
          const insertIndex = position === 'top' ? targetIndex : targetIndex + 1;
          addElementAtIndex(type, insertIndex);
          return;
        }
      }
      
      // Default: add to end of form
      if (over.id === 'form-canvas') {
        addElement(type);
      }
    }
  };

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
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex-1 flex relative h-full">
        {/* Left Sidebar - Component Palette */}
        <div className="hidden lg:block flex-none relative z-20">
          <ComponentPalette onAddElement={handleAddElement} />
        </div>
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 relative z-10">
          <FormCanvas
            formTitle={formTitle}
            elements={elements}
            selectedElementId={selectedElementId}
            previewMode={previewMode}
            draggedType={draggedType}
            onSelectElement={selectElement}
            onRemoveElement={removeElement}
            onUpdateElement={updateElement}
            onUpdateFormTitle={updateFormTitle}
            onTogglePreview={togglePreview}
            onMobileEdit={handleMobileEdit}
            isDragging={!!draggedType}
            onMoveElement={moveElement}
          />
        </div>
        
        {/* Right Sidebar - Form Properties & Element Properties */}
        <div className="hidden lg:block flex-none relative z-20 flex flex-col">
          {/* Form Properties - Always visible */}
          <FormProperties
            formTitle={formTitle}
            onUpdateFormTitle={updateFormTitle}
            elements={elements}
            settings={formSettings}
            onUpdateSettings={(newSettings) => {
              // Update the entire settings object
              Object.keys(newSettings).forEach(key => {
                updateFormSettings(key, newSettings[key]);
              });
            }}
          />
          
          {/* Element Properties - Only when element is selected */}
          {selectedElement && (
            <PropertiesPanel
              selectedElement={selectedElement}
              onUpdateElement={updateElement}
              onDeselectElement={handleDeselectElement}
            />
          )}
          
          {/* Helper text when no element is selected */}
          {!selectedElement && (
            <div className="w-80 p-6 border-l border-neutral-200 bg-neutral-50 flex-1 flex items-center justify-center">
              <div className="text-center text-neutral-500">
                <svg className="w-12 h-12 mx-auto mb-3 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.122 2.122" />
                </svg>
                <p className="text-sm font-medium mb-1">Select an element</p>
                <p className="text-xs">Click on any form element to edit its properties</p>
              </div>
            </div>
          )}
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
        
        {/* Drag Overlay */}
        <DragOverlay dropAnimation={null}>
          {draggedType && (
            <div className="p-4 bg-white border-2 border-blue-400 rounded-xl shadow-xl opacity-95 pointer-events-none">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-sm font-medium text-blue-700">
                  {draggedType.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </div>
              </div>
            </div>
          )}
        </DragOverlay>


      </div>
    </DndContext>
  );
}