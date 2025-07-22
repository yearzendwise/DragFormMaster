export interface FormElement {
  id: string;
  type: FormElementType;
  label: string;
  placeholder?: string;
  helpText?: string;
  name: string;
  required: boolean;
  validation?: ValidationRules;
  styling?: ElementStyling;
  options?: string[]; // for select, radio, checkbox
  disabled?: boolean;
  readonly?: boolean;
}

export interface ValidationRules {
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  min?: number;
  max?: number;
}

export interface ElementStyling {
  width: 'full' | 'half' | 'third';
  size: 'small' | 'medium' | 'large';
}

export interface FormSettings {
  actionUrl: string;
  method: 'GET' | 'POST';
  enctype?: string;
}

export type FormElementType = 
  | 'text-input' 
  | 'email-input' 
  | 'number-input' 
  | 'textarea' 
  | 'select' 
  | 'checkbox' 
  | 'radio' 
  | 'submit-button' 
  | 'reset-button';

export interface ComponentPaletteItem {
  type: FormElementType;
  label: string;
  description: string;
  icon: string;
  color: string;
  category: 'basic' | 'selection' | 'actions';
}

export interface DragItem {
  type: FormElementType;
  isNew: boolean;
  elementId?: string;
}

export interface FormBuilderState {
  formTitle: string;
  elements: FormElement[];
  selectedElementId: string | null;
  settings: FormSettings;
  previewMode: boolean;
}
