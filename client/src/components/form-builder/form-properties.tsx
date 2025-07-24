import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface FormPropertiesProps {
  formTitle: string;
  onUpdateFormTitle: (title: string) => void;
  onUpdateSettings?: (settings: any) => void;
  settings?: {
    description?: string;
    submitButtonText?: string;
    resetButtonText?: string;
    showProgressBar?: boolean;
    allowSaveProgress?: boolean;
  };
  elements?: any[];
}

export function FormProperties({ 
  formTitle, 
  onUpdateFormTitle, 
  onUpdateSettings,
  settings = {},
  elements = []
}: FormPropertiesProps) {
  const [isOpen, setIsOpen] = useState(true);
  
  const {
    description = '',
    submitButtonText = 'Submit',
    resetButtonText = 'Reset',
    showProgressBar = false,
    allowSaveProgress = false,
  } = settings;

  const handleSettingChange = (key: string, value: any) => {
    if (onUpdateSettings) {
      onUpdateSettings({
        ...settings,
        [key]: value,
      });
    }
  };

  return (
    <Card className="w-80 border-l border-neutral-200">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-neutral-50 transition-colors">
            <CardTitle className="text-base flex items-center justify-between">
              Form Properties
              <svg 
                className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="space-y-4">
            {/* Form Title */}
            <div>
              <Label htmlFor="form-title" className="text-sm font-medium text-neutral-700 mb-2">
                Form Title
              </Label>
              <Input
                id="form-title"
                value={formTitle}
                onChange={(e) => onUpdateFormTitle(e.target.value)}
                placeholder="Enter form title..."
                className="focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Form Description */}
            <div>
              <Label htmlFor="form-description" className="text-sm font-medium text-neutral-700 mb-2">
                Description
              </Label>
              <Textarea
                id="form-description"
                value={description}
                onChange={(e) => handleSettingChange('description', e.target.value)}
                placeholder="Optional form description..."
                className="focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
              <p className="text-xs text-neutral-500 mt-1">
                Brief description shown at the top of your form
              </p>
            </div>

            {/* Button Text Customization */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-neutral-700">Button Labels</h4>
              
              <div>
                <Label htmlFor="submit-text" className="text-xs font-medium text-neutral-600 mb-1">
                  Submit Button
                </Label>
                <Input
                  id="submit-text"
                  value={submitButtonText}
                  onChange={(e) => handleSettingChange('submitButtonText', e.target.value)}
                  placeholder="Submit"
                  className="focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <Label htmlFor="reset-text" className="text-xs font-medium text-neutral-600 mb-1">
                  Reset Button
                </Label>
                <Input
                  id="reset-text"
                  value={resetButtonText}
                  onChange={(e) => handleSettingChange('resetButtonText', e.target.value)}
                  placeholder="Reset"
                  className="focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Form Options */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-neutral-700">Form Options</h4>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="show-progress"
                  checked={showProgressBar}
                  onChange={(e) => handleSettingChange('showProgressBar', e.target.checked)}
                  className="rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
                />
                <Label htmlFor="show-progress" className="text-xs text-neutral-600">
                  Show progress bar
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="save-progress"
                  checked={allowSaveProgress}
                  onChange={(e) => handleSettingChange('allowSaveProgress', e.target.checked)}
                  className="rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
                />
                <Label htmlFor="save-progress" className="text-xs text-neutral-600">
                  Allow save progress
                </Label>
              </div>
            </div>

            {/* Form Info */}
            <div className="pt-2 border-t border-neutral-200">
              <div className="text-xs text-neutral-500 space-y-1">
                <div className="flex justify-between">
                  <span>Fields:</span>
                  <span className="font-medium">{elements.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Required:</span>
                  <span className="font-medium">{elements.filter(el => el.required).length}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}