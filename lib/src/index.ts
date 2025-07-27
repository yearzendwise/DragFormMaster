// Main form builder components
export { default as FormBuilder } from './components/FormBuilder';
export { FormWizard } from './components/form-builder/form-wizard';

// Individual wizard steps
export { BuildStep } from './components/form-builder/wizard-steps/build-step';
export { StyleStep } from './components/form-builder/wizard-steps/style-step';
export { PreviewStep } from './components/form-builder/wizard-steps/preview-step';

// Form renderers
export { ThemedFormRenderer } from './components/form-builder/themed-form-renderer';
export { CustomThemedForm } from './components/form-builder/custom-themed-form';

// Hooks
export { useFormWizard } from './hooks/use-form-wizard';
export { useFormBuilder } from './hooks/use-form-builder';

// Types
export type {
  FormElement,
  FormTheme,
  FormSettings,
  CustomColors,
  WizardStep,
  FormElementType,
  ComponentPaletteItem,
  DragItem,
  FormBuilderState,
  ValidationRules,
  ElementStyling
} from './types/form-builder';

// Utilities
export { getThemeStyles } from './utils/theme-styles';
export { getThemeGradientPresets } from './utils/theme-gradient-presets';
export { extractThemeColors } from './utils/theme-color-utils';

// Theme definitions
export { themes } from './data/themes';

// Component palette
export { ComponentPalette } from './components/form-builder/component-palette';
export { PropertiesPanel } from './components/form-builder/properties-panel';

// Import styles
import './styles.css';
import './index.css';
