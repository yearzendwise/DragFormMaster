import { 
  DndContext, 
  DragEndEvent, 
  DragOverlay, 
  DragStartEvent, 
  useSensor, 
  useSensors, 
  PointerSensor,
  TouchSensor,
  closestCorners,
  DragOverEvent,
  rectIntersection
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useState, useEffect, useRef } from 'react';
import { useFormBuilder } from '@/hooks/use-form-builder';
import { ComponentPalette } from '@/components/form-builder/component-palette';
import { FormCanvas } from '@/components/form-builder/form-canvas';
import { PropertiesPanel } from '@/components/form-builder/properties-panel';
import { FormElementType, DragItem } from '@/types/form-builder';

interface BuildStepProps {
  onDataChange: (title: string, elements: any[]) => void;
}

export function BuildStep({ onDataChange }: BuildStepProps) {
  const {
    formTitle,
    elements,
    selectedElementId,
    addElement,
    updateElement,
    removeElement,
    moveElement,
    selectElement,
    updateFormTitle,
  } = useFormBuilder();

  const [activeId, setActiveId] = useState<string | null>(null);
  const [draggedType, setDraggedType] = useState<FormElementType | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 }
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 200, tolerance: 6 }
    })
  );

  const selectedElement = elements.find(el => el.id === selectedElementId) || null;
  const onDataChangeRef = useRef(onDataChange);
  onDataChangeRef.current = onDataChange;

  // Update parent component when data changes
  useEffect(() => {
    onDataChangeRef.current(formTitle, elements);
  }, [formTitle, elements]);

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    setActiveId(active.id as string);
    
    const dragData = active.data.current as DragItem | undefined;
    if (dragData?.type) {
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
    
    const dragData = active.data.current as DragItem | undefined;
    const isDropZone = over.id.toString().startsWith('drop-zone-');
    
    if (dragData?.isNew) {
      // Adding new element
      if (isDropZone) {
        const dropIndex = parseInt(over.id.toString().split('-')[2]);
        addElement(dragData.type, dropIndex);
      } else {
        addElement(dragData.type);
      }
    } else if (!dragData?.isNew) {
      // Reordering existing elements
      const oldIndex = elements.findIndex(el => el.id === active.id);
      let newIndex: number;
      
      if (isDropZone) {
        newIndex = parseInt(over.id.toString().split('-')[2]);
        if (oldIndex < newIndex) {
          newIndex--;
        }
      } else if (over.id === 'form-canvas') {
        newIndex = elements.length - 1;
      } else {
        newIndex = elements.findIndex(el => el.id === over.id);
      }
      
      if (oldIndex !== newIndex && oldIndex !== -1) {
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
    <div className="flex-1 flex relative">
      <DndContext 
        sensors={sensors}
        collisionDetection={rectIntersection}
        onDragStart={handleDragStart} 
        onDragEnd={handleDragEnd}
      >
        {/* Left Sidebar - Component Palette */}
        <div className="hidden lg:block flex-none">
          <ComponentPalette onAddElement={handleAddElement} />
        </div>
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <SortableContext items={elements.map(el => el.id)} strategy={verticalListSortingStrategy}>
            <FormCanvas
              formTitle={formTitle}
              elements={elements}
              selectedElementId={selectedElementId}
              previewMode={false}
              draggedType={draggedType}
              onSelectElement={selectElement}
              onRemoveElement={removeElement}
              onUpdateElement={updateElement}
              onUpdateFormTitle={updateFormTitle}
              onTogglePreview={() => {}} // Not needed in build step
            />
          </SortableContext>
        </div>
        
        {/* Right Sidebar - Properties Panel */}
        <div className="hidden lg:block flex-none">
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
    </div>
  );
}