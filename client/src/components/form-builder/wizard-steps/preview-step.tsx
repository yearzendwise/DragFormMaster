import { FormElement, FormTheme } from '@/types/form-builder';
import { ThemedFormRenderer } from '@/components/form-builder/themed-form-renderer';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Save, Download, Code } from 'lucide-react';
import { useState } from 'react';

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
  const [showJsonPreview, setShowJsonPreview] = useState(false);
  const [actualFormData, setActualFormData] = useState<Record<string, any>>({});

  // Generate sample form data based on form elements
  const generateSampleFormData = () => {
    const sampleData: Record<string, any> = {};
    
    elements.forEach((element) => {
      switch (element.type) {
        case 'text-input':
          sampleData[element.name] = element.placeholder || 'Sample text input';
          break;
        case 'email-input':
          sampleData[element.name] = 'user@example.com';
          break;
        case 'number-input':
          sampleData[element.name] = element.validation?.min || 42;
          break;
        case 'textarea':
          sampleData[element.name] = element.placeholder || 'Sample textarea content';
          break;
        case 'select':
          sampleData[element.name] = element.options?.[0] || 'Option 1';
          break;
        case 'checkbox':
          sampleData[element.name] = true;
          break;
        case 'radio':
          sampleData[element.name] = element.options?.[0] || 'Option 1';
          break;
        case 'rate-scale':
          const max = element.validation?.max || 10;
          sampleData[element.name] = Math.ceil(max / 2);
          break;
        case 'boolean-switch':
          sampleData[element.name] = true;
          break;

      }
    });

    return {
      formTitle,
      submittedAt: new Date().toISOString(),
      formData: sampleData
    };
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Extract actual form data from the form
    const formData = new FormData(e.target as HTMLFormElement);
    const actualFormData: Record<string, any> = {};
    
    // Convert FormData to regular object with proper type handling
    const formDataEntries = Array.from(formData.entries());
    for (const [key, value] of formDataEntries) {
      // Skip the submit and reset buttons
      if (key === 'submit' || key === 'reset') continue;
      
      // Find the corresponding element to understand the data type
      const element = elements.find(el => el.name === key);
      
      if (element) {
        switch (element.type) {
          case 'number-input':
            actualFormData[key] = value ? Number(value) : null;
            break;
          case 'checkbox':
            actualFormData[key] = value === 'on';
            break;
          case 'rate-scale':
            actualFormData[key] = value ? Number(value) : null;
            break;
          case 'boolean-switch':
            actualFormData[key] = value === 'true';
            break;
          default:
            actualFormData[key] = value || null;
        }
      } else {
        actualFormData[key] = value || null;
      }
    }
    
    // Store the actual form data in state
    setActualFormData(actualFormData);
    setShowJsonPreview(true);
  };

  // Generate actual form data based on current form input values
  const getActualFormData = () => {
    return {
      formTitle,
      submittedAt: new Date().toISOString(),
      formData: actualFormData
    };
  };
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
          
          <form className="space-y-4" onSubmit={handleFormSubmit}>
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

      {/* JSON Preview Modal */}
      <Dialog open={showJsonPreview} onOpenChange={setShowJsonPreview}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Code className="w-5 h-5" />
              <span>Form Submission Preview</span>
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <p className="text-sm text-slate-600 mb-4">
              This is how your form data will be structured when submitted to the backend:
            </p>
            <div className="bg-slate-100 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm text-slate-800 whitespace-pre-wrap">
                {JSON.stringify(getActualFormData(), null, 2)}
              </pre>
            </div>
            <div className="mt-4 flex justify-end space-x-3">
              <Button 
                variant="outline" 
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(getActualFormData(), null, 2));
                }}
              >
                Copy JSON
              </Button>
              <Button onClick={() => setShowJsonPreview(false)}>
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}