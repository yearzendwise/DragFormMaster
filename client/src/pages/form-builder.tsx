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
      <header className="bg-white/95 backdrop-blur-lg border-b border-slate-200/60 h-16 flex items-center justify-between px-6 shadow-sm">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">FormCraft</h1>
              <p className="text-xs text-slate-500 -mt-0.5">Advanced Form Builder</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-2 bg-slate-100/60 px-3 py-1.5 rounded-full">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-slate-600 font-medium">Live</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={exportForm}
            className="text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"/>
            </svg>
            Export
          </Button>
          <Button
            size="sm"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium shadow-lg shadow-blue-200/25 transition-all duration-200"
          >
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z"/>
            </svg>
            Save Form
          </Button>
          <div className="w-10 h-10 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
            <svg className="w-5 h-5 text-slate-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
            </svg>
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
      <div className="bg-white/95 backdrop-blur-sm border-t border-slate-200/60 px-6 py-3 shadow-sm">
        <div className="flex justify-between items-center text-xs">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-1">
              <svg className="w-3 h-3 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"/>
              </svg>
              <span className="text-slate-500">Elements:</span>
              <span className="font-semibold text-slate-800">{elements.length}</span>
            </div>
            <div className="flex items-center space-x-1">
              <svg className="w-3 h-3 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
              </svg>
              <span className="text-slate-500">Required:</span>
              <span className="font-semibold text-slate-800">{elements.filter(el => el.required).length}</span>
            </div>
            <div className="flex items-center space-x-1">
              <svg className="w-3 h-3 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
              </svg>
              <span className="text-slate-500">Last saved:</span>
              <span className="font-semibold text-green-600">just now</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-medium text-green-600">Ready</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
