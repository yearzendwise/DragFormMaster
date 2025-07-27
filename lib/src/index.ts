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

// UI Components (including translation functionality)
export { LanguageSelector, SUPPORTED_LANGUAGES } from './components/ui/language-selector';
export { Button } from './components/ui/button';
export { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './components/ui/dialog';
export { Badge } from './components/ui/badge';
export { Input } from './components/ui/input';
export { Label } from './components/ui/label';
export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
export { Textarea } from './components/ui/textarea';
export { Switch } from './components/ui/switch';
export { RadioGroup, RadioGroupItem } from './components/ui/radio-group';
export { Checkbox } from './components/ui/checkbox';
export { Slider } from './components/ui/slider';
export { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/ui/card';
export { Alert, AlertDescription, AlertTitle } from './components/ui/alert';
export { Progress } from './components/ui/progress';
export { Separator } from './components/ui/separator';
export { Toast, ToastProvider, ToastViewport, ToastTitle, ToastDescription, ToastClose, ToastAction } from './components/ui/toast';
export { Toaster } from './components/ui/toaster';
export { useToast } from './hooks/use-toast';
export { BooleanSwitch } from './components/ui/boolean-switch';
export { NumberInput } from './components/ui/number-input';
export { RateScale } from './components/ui/rate-scale';
export { FullName } from './components/ui/full-name';

// Import styles
import './styles.css';
import './index.css';
