import { ComponentPaletteItem, FormElementType } from '@/types/form-builder';
import { DraggableComponent } from './draggable-component';

const paletteItems: ComponentPaletteItem[] = [
  // Basic Inputs
  {
    type: 'text-input',
    label: 'Text Input',
    description: 'Single line text field',
    icon: 'fas fa-font',
    color: 'bg-blue-100 text-blue-600',
    category: 'basic',
  },
  {
    type: 'email-input',
    label: 'Email Input',
    description: 'Email address field',
    icon: 'fas fa-envelope',
    color: 'bg-green-100 text-green-600',
    category: 'basic',
  },
  {
    type: 'textarea',
    label: 'Textarea',
    description: 'Multi-line text area',
    icon: 'fas fa-align-left',
    color: 'bg-purple-100 text-purple-600',
    category: 'basic',
  },
  {
    type: 'number-input',
    label: 'Number Input',
    description: 'Numeric field',
    icon: 'fas fa-hashtag',
    color: 'bg-orange-100 text-orange-600',
    category: 'basic',
  },
  // Selection
  {
    type: 'select',
    label: 'Select Dropdown',
    description: 'Dropdown selection',
    icon: 'fas fa-caret-down',
    color: 'bg-indigo-100 text-indigo-600',
    category: 'selection',
  },
  {
    type: 'checkbox',
    label: 'Checkbox',
    description: 'Multiple selection',
    icon: 'fas fa-check-square',
    color: 'bg-emerald-100 text-emerald-600',
    category: 'selection',
  },
  {
    type: 'radio',
    label: 'Radio Button',
    description: 'Single selection',
    icon: 'fas fa-dot-circle',
    color: 'bg-pink-100 text-pink-600',
    category: 'selection',
  },
  // Actions
  {
    type: 'submit-button',
    label: 'Submit Button',
    description: 'Form submission',
    icon: 'fas fa-paper-plane',
    color: 'bg-blue-100 text-blue-600',
    category: 'actions',
  },
  {
    type: 'reset-button',
    label: 'Reset Button',
    description: 'Clear form data',
    icon: 'fas fa-undo',
    color: 'bg-red-100 text-red-600',
    category: 'actions',
  },
];

const categoryLabels = {
  basic: 'Basic Inputs',
  selection: 'Selection',
  actions: 'Actions',
};

interface ComponentPaletteProps {
  onAddElement: (type: FormElementType) => void;
}

export function ComponentPalette({ onAddElement }: ComponentPaletteProps) {
  const categories = ['basic', 'selection', 'actions'] as const;

  return (
    <aside className="w-80 bg-white border-r border-neutral-200 overflow-y-auto">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-neutral-800 mb-4">Form Components</h2>
        
        {categories.map((category) => {
          const items = paletteItems.filter(item => item.category === category);
          
          return (
            <div key={category} className="mb-6">
              <h3 className="text-sm font-medium text-neutral-600 mb-3 uppercase tracking-wider">
                {categoryLabels[category]}
              </h3>
              <div className="space-y-2">
                {items.map((item) => (
                  <DraggableComponent
                    key={item.type}
                    item={item}
                    onAddElement={onAddElement}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
