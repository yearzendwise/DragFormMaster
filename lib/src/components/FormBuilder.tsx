import React from 'react';
import { FormWizard } from './form-builder/form-wizard';

interface FormBuilderProps {
  onSave?: (formData: any) => void;
  onExport?: (formData: any) => void;
  className?: string;
}

export function FormBuilder({ onSave, onExport, className }: FormBuilderProps) {
  return (
    <div className={`form-builder-container ${className || ''}`}>
      <FormWizard />
    </div>
  );
}

export default FormBuilder;