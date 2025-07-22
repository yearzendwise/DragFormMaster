import { useState, useCallback } from 'react';
import { FormElement, FormElementType, FormBuilderState, FormSettings } from '@/types/form-builder';
import { nanoid } from 'nanoid';

const defaultSettings: FormSettings = {
  actionUrl: '/api/submit-form',
  method: 'POST',
};

export function useFormBuilder() {
  const [state, setState] = useState<FormBuilderState>({
    formTitle: 'Untitled Form',
    elements: [],
    selectedElementId: null,
    settings: defaultSettings,
    previewMode: false,
  });

  const addElement = useCallback((type: FormElementType, index?: number) => {
    const newElement: FormElement = {
      id: nanoid(),
      type,
      label: getDefaultLabel(type),
      placeholder: getDefaultPlaceholder(type),
      helpText: '',
      name: generateFieldName(type),
      required: false,
      validation: {},
      styling: {
        width: 'full',
        size: 'medium',
      },
      options: type === 'select' || type === 'radio' || type === 'checkbox' ? ['Option 1', 'Option 2'] : undefined,
    };

    setState(prev => ({
      ...prev,
      elements: index !== undefined 
        ? [...prev.elements.slice(0, index), newElement, ...prev.elements.slice(index)]
        : [...prev.elements, newElement],
      selectedElementId: newElement.id,
    }));
  }, []);

  const updateElement = useCallback((id: string, updates: Partial<FormElement>) => {
    setState(prev => ({
      ...prev,
      elements: prev.elements.map(el => 
        el.id === id ? { ...el, ...updates } : el
      ),
    }));
  }, []);

  const removeElement = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      elements: prev.elements.filter(el => el.id !== id),
      selectedElementId: prev.selectedElementId === id ? null : prev.selectedElementId,
    }));
  }, []);

  const moveElement = useCallback((fromIndex: number, toIndex: number) => {
    setState(prev => {
      const elements = [...prev.elements];
      const [movedElement] = elements.splice(fromIndex, 1);
      elements.splice(toIndex, 0, movedElement);
      return { ...prev, elements };
    });
  }, []);

  const selectElement = useCallback((id: string | null) => {
    setState(prev => ({ ...prev, selectedElementId: id }));
  }, []);

  const updateFormTitle = useCallback((title: string) => {
    setState(prev => ({ ...prev, formTitle: title }));
  }, []);

  const updateSettings = useCallback((settings: Partial<FormSettings>) => {
    setState(prev => ({ 
      ...prev, 
      settings: { ...prev.settings, ...settings }
    }));
  }, []);

  const togglePreview = useCallback(() => {
    setState(prev => ({ ...prev, previewMode: !prev.previewMode }));
  }, []);

  const exportForm = useCallback(() => {
    const formConfig = {
      title: state.formTitle,
      elements: state.elements,
      settings: state.settings,
    };
    
    const dataStr = JSON.stringify(formConfig, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `${state.formTitle.toLowerCase().replace(/\s+/g, '-')}-form.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }, [state]);

  return {
    ...state,
    addElement,
    updateElement,
    removeElement,
    moveElement,
    selectElement,
    updateFormTitle,
    updateSettings,
    togglePreview,
    exportForm,
  };
}

function getDefaultLabel(type: FormElementType): string {
  const labels = {
    'text-input': 'Text Field',
    'email-input': 'Email Address',
    'number-input': 'Number',
    'textarea': 'Text Area',
    'select': 'Select Option',
    'checkbox': 'Checkbox',
    'radio': 'Radio Button',
    'submit-button': 'Submit',
    'reset-button': 'Reset',
  };
  return labels[type];
}

function getDefaultPlaceholder(type: FormElementType): string {
  const placeholders = {
    'text-input': 'Enter text...',
    'email-input': 'you@example.com',
    'number-input': 'Enter number...',
    'textarea': 'Enter description...',
    'select': 'Choose an option',
    'checkbox': '',
    'radio': '',
    'submit-button': '',
    'reset-button': '',
  };
  return placeholders[type];
}

function generateFieldName(type: FormElementType): string {
  const timestamp = Date.now().toString(36);
  return `${type.replace('-', '_')}_${timestamp}`;
}
