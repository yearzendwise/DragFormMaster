import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { useState } from 'react';
import { useFormBuilder } from '@/hooks/use-form-builder';
import { ComponentPalette } from '@/components/form-builder/component-palette';
import { FormCanvas } from '@/components/form-builder/form-canvas';
import { PropertiesPanel } from '@/components/form-builder/properties-panel';
import { FormElementType, DragItem } from '@/types/form-builder';
import { Button } from '@/components/ui/button';

export default function FormBuilder() {
  const {
    formTitle,
    elements,
    selectedElementId,
    settings,
    previewMode,
    addElement,
    updateElement,
    removeElement,
    moveElement,
    selectElement,
    updateFormTitle,
    updateSettings,
    togglePreview,
    exportForm,
  } = useFormBuilder();

  const [activeId, setActiveId] = useState<string | null>(null);
  const [draggedType, setDraggedType] = useState<FormElementType | null>(null);

  const selectedElement = elements.find(el => el.id === selectedElementId) || null;

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    setActiveId(active.id as string);
    
    const dragData = active.data.current as DragItem;
    if (dragData?.isNew) {
      setDraggedType(dragData.type);
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    
    if (!over) {
      setActiveId(null);
      setDraggedType(null);
      return;
    }

    const dragData = active.data.current as DragItem;
    
    if (dragData?.isNew && over.id === 'form-canvas') {
      // Adding new element from palette
      addElement(dragData.type);
    } else if (!dragData?.isNew) {
      // Reordering existing elements
      const oldIndex = elements.findIndex(el => el.id === active.id);
      const newIndex = elements.findIndex(el => el.id === over.id);
      
      if (oldIndex !== newIndex) {
        moveElement(oldIndex, newIndex);
      }
    }
    
    setActiveId(null);
    setDraggedType(null);
  }

  const handleAddElement = (type: FormElementType) => {
    addElement(type);
  };

  const handleDeselectElement = () => {
    selectElement(null);
  };

  return (
    <div className="h-screen flex flex-col bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 h-14 flex items-center justify-between px-6 shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <i className="fas fa-cube text-white text-sm"></i>
            </div>
            <h1 className="text-lg font-semibold text-neutral-800">FormCraft</h1>
          </div>
          <div className="text-sm text-neutral-500">Advanced Form Builder</div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={exportForm}
            className="text-neutral-600 hover:text-blue-600"
          >
            <i className="fas fa-download mr-1"></i>Export
          </Button>
          <Button
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium"
          >
            <i className="fas fa-save mr-1"></i>Save Form
          </Button>
          <div className="w-8 h-8 bg-neutral-200 rounded-full flex items-center justify-center">
            <i className="fas fa-user text-neutral-600 text-sm"></i>
          </div>
        </div>
      </header>

      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="flex-1 flex">
          <ComponentPalette onAddElement={handleAddElement} />
          
          <SortableContext items={elements.map(el => el.id)} strategy={verticalListSortingStrategy}>
            <FormCanvas
              formTitle={formTitle}
              elements={elements}
              selectedElementId={selectedElementId}
              previewMode={previewMode}
              onSelectElement={selectElement}
              onRemoveElement={removeElement}
              onUpdateElement={updateElement}
              onUpdateFormTitle={updateFormTitle}
              onTogglePreview={togglePreview}
            />
          </SortableContext>
          
          <PropertiesPanel
            selectedElement={selectedElement}
            onUpdateElement={updateElement}
            onDeselectElement={handleDeselectElement}
          />
        </div>

        <DragOverlay>
          {activeId && draggedType ? (
            <div className="p-4 bg-white border border-neutral-200 rounded-lg shadow-lg opacity-75">
              <div className="text-sm font-medium text-neutral-800">
                {draggedType.replace('-', ' ')}
              </div>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Status Bar */}
      <div className="bg-white border-t border-neutral-200 px-6 py-2 text-xs text-neutral-500 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <span>Elements: <span className="font-medium">{elements.length}</span></span>
          <span>Required Fields: <span className="font-medium">{elements.filter(el => el.required).length}</span></span>
          <span>Last Modified: <span className="font-medium">just now</span></span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          <span>Ready</span>
        </div>
      </div>
    </div>
  );
}
