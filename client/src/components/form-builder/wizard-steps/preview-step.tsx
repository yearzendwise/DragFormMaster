import { FormElement, FormTheme } from '@/types/form-builder';
import { ThemedFormRenderer } from '@/components/form-builder/themed-form-renderer';
import { Button } from '@/components/ui/button';
import { Save, Download } from 'lucide-react';

// Extended type for preview elements that includes buttons
type PreviewFormElement = FormElement | {
  id: string;
  type: 'submit-button' | 'reset-button';
  label: string;
  name: string;
  required: boolean;
  styling?: {
    width: 'full' | 'half' | 'third';
    size: 'small' | 'medium' | 'large';
  };
};

interface PreviewStepProps {
  formTitle: string;
  elements: FormElement[];
  selectedTheme: FormTheme | null;
  onSave: () => void;
  onExport: () => void;
}

export function PreviewStep({ 
  formTitle, 
  elements, 
  selectedTheme, 
  onSave, 
  onExport 
}: PreviewStepProps) {
  // Show error if no theme is selected
  if (!selectedTheme) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-neutral-50">
        <div className="text-center">
          <div className="text-lg font-medium text-slate-800 mb-2">No theme selected</div>
          <div className="text-sm text-slate-600">Please go back to Step 2 and select a theme</div>
        </div>
      </div>
    );
  }

  // Create enhanced elements list with automatic buttons
  const elementsWithButtons: PreviewFormElement[] = [
    ...elements,
    // Always add submit button
    {
      id: `auto-submit-${Date.now()}`,
      type: 'submit-button',
      label: 'Submit',
      name: 'submit',
      required: false,
      styling: {
        width: 'full',
        size: 'medium',
      }
    },
    // Always add reset button
    {
      id: `auto-reset-${Date.now()}`,
      type: 'reset-button', 
      label: 'Reset',
      name: 'reset',
      required: false,
      styling: {
        width: 'full',
        size: 'medium',
      }
    }
  ];

  const themeStyles = selectedTheme.styles;

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-slate-200/60 px-6 py-5 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Preview & Save</h2>
            <p className="text-slate-600">Review your form and save it when ready</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onExport} className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </Button>
            <Button onClick={onSave} className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700">
              <Save className="w-4 h-4" />
              <span>Save Form</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className={`flex-1 overflow-y-auto p-6 ${themeStyles.background}`}>
        <div className={`${themeStyles.container} ${selectedTheme.id === 'glassmorphism' ? 'glassmorphism-override' : ''}`}>
          <h1 className={themeStyles.header}>{formTitle}</h1>
          
          <form className="space-y-4">
            {elementsWithButtons.map((element) => (
              <ThemedFormRenderer
                key={element.id}
                element={element as FormElement}
                themeStyles={themeStyles}
              />
            ))}
            
            {elements.length === 0 && (
              <div className="text-center py-12 text-slate-500">
                <div className="text-lg font-medium mb-2">No form elements</div>
                <div className="text-sm">Go back to the build step to add form elements</div>
              </div>
            )}

            {/* Show notification that buttons are always auto-added */}
            {elements.length > 0 && (
              <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="text-sm text-blue-700">
                  <strong>Form completion:</strong> Submit and Reset buttons are automatically added to all forms in the preview.
                </div>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Theme info */}
      {selectedTheme && (
        <div className="bg-white border-t border-slate-200 px-6 py-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-4 h-4 rounded ${selectedTheme.preview}`}></div>
              <span className="text-sm text-slate-600">
                Using <strong>{selectedTheme.name}</strong> theme
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}