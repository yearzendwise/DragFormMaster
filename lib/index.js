// Main export file for drag-form-zend package
// This exports the pre-built components from the dist directory

// Form Builder Components
export { FormWizard } from './dist/components/form-builder/form-wizard.js';
export { BuildStep } from './dist/components/form-builder/wizard-steps/build-step.js';
export { StyleStep } from './dist/components/form-builder/wizard-steps/style-step.js';
export { PreviewStep } from './dist/components/form-builder/wizard-steps/preview-step.js';

// Hooks
export { useFormWizard } from './dist/hooks/use-form-wizard.js';
export { useFormBuilder } from './dist/hooks/use-form-builder.js';

// Types
export * from './dist/types/form-builder.js';

// Themes
export * from './dist/data/themes.js';

// Utils
export * from './dist/lib/utils.js';

// Re-export everything from the main dist index for compatibility
export * from './dist/index.js';