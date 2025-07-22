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
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { useState } from 'react';
import { useFormBuilder } from '@/hooks/use-form-builder';
import { ComponentPalette } from '@/components/form-builder/component-palette';
import { FormCanvas } from '@/components/form-builder/form-canvas';
import { PropertiesPanel } from '@/components/form-builder/properties-panel';
import { FormElementType, DragItem, ComponentPaletteItem } from '@/types/form-builder';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Type, Mail, AlignLeft, Hash, ChevronDown, CheckSquare, Circle, Send, Settings, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

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
  const [mobileModalOpen, setMobileModalOpen] = useState(false);
  const [mobilePropertiesOpen, setMobilePropertiesOpen] = useState(false);

  // Component palette items for mobile modal
  const paletteItems = [
    {
      type: 'text-input' as FormElementType,
      label: 'Text Input',
      description: 'Single line text field',
      icon: Type,
      color: 'bg-gradient-to-br from-blue-100 to-blue-200 text-blue-700',
      category: 'basic' as const,
    },
    {
      type: 'email-input' as FormElementType,
      label: 'Email Input',
      description: 'Email address field',
      icon: Mail,
      color: 'bg-gradient-to-br from-green-100 to-emerald-200 text-green-700',
      category: 'basic' as const,
    },
    {
      type: 'textarea' as FormElementType,
      label: 'Textarea',
      description: 'Multi-line text area',
      icon: AlignLeft,
      color: 'bg-gradient-to-br from-purple-100 to-purple-200 text-purple-700',
      category: 'basic' as const,
    },
    {
      type: 'number-input' as FormElementType,
      label: 'Number Input',
      description: 'Numeric field',
      icon: Hash,
      color: 'bg-gradient-to-br from-orange-100 to-orange-200 text-orange-700',
      category: 'basic' as const,
    },
    {
      type: 'select' as FormElementType,
      label: 'Select Dropdown',
      description: 'Dropdown selection',
      icon: ChevronDown,
      color: 'bg-gradient-to-br from-indigo-100 to-indigo-200 text-indigo-700',
      category: 'selection' as const,
    },
    {
      type: 'checkbox' as FormElementType,
      label: 'Checkbox',
      description: 'Multiple selection',
      icon: CheckSquare,
      color: 'bg-gradient-to-br from-emerald-100 to-teal-200 text-emerald-700',
      category: 'selection' as const,
    },
    {
      type: 'radio' as FormElementType,
      label: 'Radio Button',
      description: 'Single selection',
      icon: Circle,
      color: 'bg-gradient-to-br from-pink-100 to-rose-200 text-pink-700',
      category: 'selection' as const,
    },
    {
      type: 'submit-button' as FormElementType,
      label: 'Submit Button',
      description: 'Form submit button',
      icon: Send,
      color: 'bg-gradient-to-br from-gray-100 to-slate-200 text-gray-700',
      category: 'actions' as const,
    },
  ];

  const selectedElement = elements.find(el => el.id === selectedElementId) || null;

  // Configure drag sensors for better touch and mouse support
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

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
    const overData = over.data?.current;
    
    // Check if dropping on a drop zone
    const isDropZone = typeof over.id === 'string' && over.id.startsWith('drop-zone-');
    const isCanvasDrop = over.id === 'form-canvas' || overData?.accepts?.includes('form-element');
    
    if (dragData?.isNew && (isDropZone || isCanvasDrop)) {
      // Adding new element from palette
      if (isDropZone) {
        // Extract the index from the drop zone ID (e.g., "drop-zone-2" -> 2)
        const dropIndex = parseInt(over.id.toString().split('-')[2]);
        // Insert at specific position
        addElement(dragData.type, dropIndex);
      } else {
        // Add to end
        addElement(dragData.type);
      }
    } else if (!dragData?.isNew) {
      // Reordering existing elements
      const oldIndex = elements.findIndex(el => el.id === active.id);
      let newIndex: number;
      
      if (isDropZone) {
        // Drop zone insertion
        newIndex = parseInt(over.id.toString().split('-')[2]);
        // Adjust for the element being removed from its current position
        if (oldIndex < newIndex) {
          newIndex--;
        }
      } else if (over.id === 'form-canvas') {
        // Dropping on canvas - add to end
        newIndex = elements.length - 1;
      } else {
        // Dropping on another element - find its position
        newIndex = elements.findIndex(el => el.id === over.id);
      }
      
      if (oldIndex !== newIndex && oldIndex !== -1) {
        moveElement(oldIndex, newIndex);
      }
    }
    
    setActiveId(null);
    setDraggedType(null);
  }

  function handleDragOver(event: DragOverEvent) {
    const { over } = event;
    // You can add visual feedback here for drag over states
  }

  const handleAddElement = (type: FormElementType) => {
    addElement(type);
  };

  const handleDeselectElement = () => {
    selectElement(null);
    setMobilePropertiesOpen(false);
  };

  const handleMobileElementSelect = (elementId: string | null) => {
    selectElement(elementId);
    // On mobile, open properties modal when selecting an element
    if (elementId && window.innerWidth < 1024) {
      setMobilePropertiesOpen(true);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-neutral-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-lg border-b border-slate-200/60 h-14 md:h-16 flex items-center justify-between px-3 md:px-6 shadow-sm">
        <div className="flex items-center space-x-2 md:space-x-6">
          <div className="flex items-center space-x-2 md:space-x-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg md:rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold text-slate-800">FormCraft</h1>
              <p className="text-xs text-slate-500 -mt-0.5 hidden sm:block">Advanced Form Builder</p>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center space-x-2 bg-slate-100/60 px-3 py-1.5 rounded-full">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-slate-600 font-medium">Live</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 md:space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={exportForm}
            className="text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors p-2 md:px-3 md:py-2"
          >
            <svg className="w-4 h-4 md:mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"/>
            </svg>
            <span className="hidden md:inline">Export</span>
          </Button>
          <Button
            size="sm"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium shadow-lg shadow-blue-200/25 transition-all duration-200 p-2 md:px-3 md:py-2"
          >
            <svg className="w-4 h-4 md:mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z"/>
            </svg>
            <span className="hidden md:inline">Save Form</span>
          </Button>
          <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
            <svg className="w-4 h-4 md:w-5 md:h-5 text-slate-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
            </svg>
          </div>
        </div>
      </header>

      <DndContext 
        sensors={sensors}
        collisionDetection={rectIntersection}
        onDragStart={handleDragStart} 
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
      >
        <div className="flex-1 flex relative">
          {/* Component Palette - Hidden on mobile by default */}
          <div className="hidden lg:block">
            <ComponentPalette onAddElement={handleAddElement} />
          </div>
          
          <SortableContext items={elements.map(el => el.id)} strategy={verticalListSortingStrategy}>
            <FormCanvas
              formTitle={formTitle}
              elements={elements}
              selectedElementId={selectedElementId}
              previewMode={previewMode}
              draggedType={draggedType}
              onSelectElement={handleMobileElementSelect}
              onRemoveElement={removeElement}
              onUpdateElement={updateElement}
              onUpdateFormTitle={updateFormTitle}
              onTogglePreview={togglePreview}
            />
          </SortableContext>
          
          {/* Properties Panel - Hidden on mobile by default */}
          {!previewMode && (
            <div className="hidden lg:block">
              <PropertiesPanel
                selectedElement={selectedElement}
                onUpdateElement={updateElement}
                onDeselectElement={handleDeselectElement}
              />
            </div>
          )}
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

      {/* Mobile Floating Action Button */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <Dialog open={mobileModalOpen} onOpenChange={setMobileModalOpen}>
          <DialogTrigger asChild>
            <Button
              size="lg"
              className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-200/25 transition-all duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add Component</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-3 mt-4">
              {paletteItems.map((item) => (
                <Button
                  key={item.type}
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center gap-2 text-center border-2 hover:border-blue-300 transition-all duration-200"
                  onClick={() => {
                    addElement(item.type);
                    setMobileModalOpen(false);
                  }}
                >
                  <div className={`w-8 h-8 rounded-lg ${item.color} flex items-center justify-center text-sm`}>
                    <item.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">{item.label}</div>
                    <div className="text-xs text-muted-foreground">{item.description}</div>
                  </div>
                </Button>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Mobile Properties Modal */}
      <Dialog open={mobilePropertiesOpen} onOpenChange={setMobilePropertiesOpen}>
        <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto lg:hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Edit Properties
            </DialogTitle>
          </DialogHeader>
          
          {selectedElement && (
            <div className="space-y-4 mt-4">
              {/* Element Type Badge */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Element Type</div>
                <div className="font-medium text-slate-800 capitalize">
                  {selectedElement.type.replace('-', ' ')}
                </div>
              </div>

              {/* Basic Properties */}
              <div className="space-y-3">
                <div>
                  <Label htmlFor="mobile-label" className="text-sm font-medium">Label</Label>
                  <Input
                    id="mobile-label"
                    value={selectedElement.label}
                    onChange={(e) => updateElement(selectedElement.id, { label: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="mobile-name" className="text-sm font-medium">Name</Label>
                  <Input
                    id="mobile-name"
                    value={selectedElement.name}
                    onChange={(e) => updateElement(selectedElement.id, { name: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="mobile-placeholder" className="text-sm font-medium">Placeholder</Label>
                  <Input
                    id="mobile-placeholder"
                    value={selectedElement.placeholder || ''}
                    onChange={(e) => updateElement(selectedElement.id, { placeholder: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="mobile-help" className="text-sm font-medium">Help Text</Label>
                  <Textarea
                    id="mobile-help"
                    value={selectedElement.helpText || ''}
                    onChange={(e) => updateElement(selectedElement.id, { helpText: e.target.value })}
                    className="mt-1"
                    rows={2}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="mobile-required"
                    checked={selectedElement.required}
                    onCheckedChange={(checked) => 
                      updateElement(selectedElement.id, { required: !!checked })
                    }
                  />
                  <Label htmlFor="mobile-required" className="text-sm">Required field</Label>
                </div>

                {/* Width Setting */}
                <div>
                  <Label className="text-sm font-medium">Width</Label>
                  <Select
                    value={selectedElement.styling?.width || 'full'}
                    onValueChange={(value) => {
                      const currentStyling = selectedElement.styling || { width: 'full', size: 'medium' };
                      const styling = { ...currentStyling, width: value as 'full' | 'half' | 'third' };
                      updateElement(selectedElement.id, { styling });
                    }}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full">Full Width</SelectItem>
                      <SelectItem value="half">Half Width</SelectItem>
                      <SelectItem value="third">Third Width</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Size Setting */}
                <div>
                  <Label className="text-sm font-medium">Size</Label>
                  <Select
                    value={selectedElement.styling?.size || 'medium'}
                    onValueChange={(value) => {
                      const currentStyling = selectedElement.styling || { width: 'full', size: 'medium' };
                      const styling = { ...currentStyling, size: value as 'small' | 'medium' | 'large' };
                      updateElement(selectedElement.id, { styling });
                    }}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Delete Element Button */}
              <div className="pt-4 border-t border-slate-200">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    removeElement(selectedElement.id);
                    setMobilePropertiesOpen(false);
                  }}
                  className="w-full"
                >
                  Delete Element
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Status Bar */}
      <div className="bg-white/95 backdrop-blur-sm border-t border-slate-200/60 px-3 md:px-6 py-2 md:py-3 shadow-sm">
        <div className="flex justify-between items-center text-xs">
          <div className="flex items-center space-x-3 md:space-x-6 overflow-x-auto">
            <div className="flex items-center space-x-1 whitespace-nowrap">
              <svg className="w-3 h-3 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"/>
              </svg>
              <span className="text-slate-500 hidden sm:inline">Elements:</span>
              <span className="font-semibold text-slate-800">{elements.length}</span>
            </div>
            <div className="flex items-center space-x-1 whitespace-nowrap">
              <svg className="w-3 h-3 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
              </svg>
              <span className="text-slate-500 hidden sm:inline">Required:</span>
              <span className="font-semibold text-slate-800">{elements.filter(el => el.required).length}</span>
            </div>
            <div className="flex items-center space-x-1 whitespace-nowrap hidden md:flex">
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
              <span className="font-medium text-green-600 hidden sm:inline">Ready</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
