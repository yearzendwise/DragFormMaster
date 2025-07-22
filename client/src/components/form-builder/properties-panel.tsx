import { FormElement, ValidationRules, ElementStyling } from '@/types/form-builder';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface PropertiesPanelProps {
  selectedElement: FormElement | null;
  onUpdateElement: (id: string, updates: Partial<FormElement>) => void;
  onDeselectElement: () => void;
}

export function PropertiesPanel({
  selectedElement,
  onUpdateElement,
  onDeselectElement,
}: PropertiesPanelProps) {
  if (!selectedElement) {
    return (
      <aside className="w-80 bg-white border-l border-neutral-200 overflow-y-auto">
        <div className="p-6">
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-wrench text-neutral-400 text-xl"></i>
            </div>
            <h3 className="text-lg font-medium text-neutral-800 mb-2">Properties Panel</h3>
            <p className="text-neutral-500">Select a form element to edit its properties</p>
          </div>
        </div>
      </aside>
    );
  }

  const handleUpdate = (field: keyof FormElement, value: any) => {
    onUpdateElement(selectedElement.id, { [field]: value });
  };

  const handleValidationUpdate = (field: keyof ValidationRules, value: any) => {
    const validation = { ...selectedElement.validation, [field]: value };
    onUpdateElement(selectedElement.id, { validation });
  };

  const handleStylingUpdate = (field: keyof ElementStyling, value: any) => {
    const currentStyling = selectedElement.styling || { width: 'full', size: 'medium' };
    const styling = { ...currentStyling, [field]: value };
    onUpdateElement(selectedElement.id, { styling });
  };

  const handleOptionsUpdate = (options: string[]) => {
    onUpdateElement(selectedElement.id, { options });
  };

  return (
    <aside className="w-80 bg-white border-l border-neutral-200 overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-neutral-800">Element Properties</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDeselectElement}
            className="text-neutral-400 hover:text-neutral-600"
          >
            <i className="fas fa-times"></i>
          </Button>
        </div>

        {/* Element Type Badge */}
        <div className="mb-6">
          <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-600 text-sm font-medium rounded-full">
            <i className="fas fa-font mr-2"></i>
            <span className="capitalize">{selectedElement.type.replace('-', ' ')}</span>
          </span>
        </div>

        {/* Basic Properties */}
        <div className="space-y-4 mb-8">
          <div>
            <Label htmlFor="label" className="text-sm font-medium text-neutral-700 mb-2">
              Label
            </Label>
            <Input
              id="label"
              value={selectedElement.label}
              onChange={(e) => handleUpdate('label', e.target.value)}
              className="focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {selectedElement.type !== 'submit-button' && selectedElement.type !== 'reset-button' && (
            <>
              <div>
                <Label htmlFor="placeholder" className="text-sm font-medium text-neutral-700 mb-2">
                  Placeholder
                </Label>
                <Input
                  id="placeholder"
                  value={selectedElement.placeholder || ''}
                  onChange={(e) => handleUpdate('placeholder', e.target.value)}
                  className="focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <Label htmlFor="helpText" className="text-sm font-medium text-neutral-700 mb-2">
                  Help Text
                </Label>
                <Input
                  id="helpText"
                  value={selectedElement.helpText || ''}
                  onChange={(e) => handleUpdate('helpText', e.target.value)}
                  className="focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <Label htmlFor="name" className="text-sm font-medium text-neutral-700 mb-2">
                  Field Name
                </Label>
                <Input
                  id="name"
                  value={selectedElement.name}
                  onChange={(e) => handleUpdate('name', e.target.value)}
                  className="focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </>
          )}
        </div>

        {/* Options for select, radio, checkbox */}
        {(selectedElement.type === 'select' || selectedElement.type === 'radio' || selectedElement.type === 'checkbox') && (
          <div className="mb-8">
            <Label className="text-sm font-medium text-neutral-700 mb-2">Options</Label>
            <div className="space-y-2">
              {selectedElement.options?.map((option, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...(selectedElement.options || [])];
                      newOptions[index] = e.target.value;
                      handleOptionsUpdate(newOptions);
                    }}
                    className="flex-1"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      const newOptions = selectedElement.options?.filter((_, i) => i !== index) || [];
                      handleOptionsUpdate(newOptions);
                    }}
                  >
                    <i className="fas fa-times"></i>
                  </Button>
                </div>
              ))}
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  const newOptions = [...(selectedElement.options || []), `Option ${(selectedElement.options?.length || 0) + 1}`];
                  handleOptionsUpdate(newOptions);
                }}
                className="w-full"
              >
                <i className="fas fa-plus mr-2"></i>Add Option
              </Button>
            </div>
          </div>
        )}

        {/* Validation Rules */}
        {selectedElement.type !== 'submit-button' && selectedElement.type !== 'reset-button' && (
          <div className="mb-8">
            <h3 className="text-sm font-medium text-neutral-700 mb-4">Validation Rules</h3>
            <div className="space-y-3">
              <label className="flex items-center">
                <Checkbox
                  checked={selectedElement.required}
                  onCheckedChange={(checked) => handleUpdate('required', checked)}
                />
                <span className="ml-2 text-sm text-neutral-700">Required field</span>
              </label>
              
              {(selectedElement.type === 'text-input' || selectedElement.type === 'textarea') && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs font-medium text-neutral-600 mb-1">Min Length</Label>
                    <Input
                      type="number"
                      value={selectedElement.validation?.minLength || ''}
                      onChange={(e) => handleValidationUpdate('minLength', parseInt(e.target.value) || undefined)}
                      className="text-sm"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-neutral-600 mb-1">Max Length</Label>
                    <Input
                      type="number"
                      value={selectedElement.validation?.maxLength || ''}
                      onChange={(e) => handleValidationUpdate('maxLength', parseInt(e.target.value) || undefined)}
                      className="text-sm"
                    />
                  </div>
                </div>
              )}

              {selectedElement.type === 'number-input' && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs font-medium text-neutral-600 mb-1">Min Value</Label>
                    <Input
                      type="number"
                      value={selectedElement.validation?.min || ''}
                      onChange={(e) => handleValidationUpdate('min', parseInt(e.target.value) || undefined)}
                      className="text-sm"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-neutral-600 mb-1">Max Value</Label>
                    <Input
                      type="number"
                      value={selectedElement.validation?.max || ''}
                      onChange={(e) => handleValidationUpdate('max', parseInt(e.target.value) || undefined)}
                      className="text-sm"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Styling Options */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-neutral-700 mb-4">Styling</h3>
          <div className="space-y-3">
            <div>
              <Label className="text-xs font-medium text-neutral-600 mb-1">Width</Label>
              <Select 
                value={selectedElement.styling?.width || 'full'}
                onValueChange={(value) => handleStylingUpdate('width', value)}
              >
                <SelectTrigger className="text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full">Full Width</SelectItem>
                  <SelectItem value="half">Half Width</SelectItem>
                  <SelectItem value="third">One Third</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="text-xs font-medium text-neutral-600 mb-1">Size</Label>
              <Select 
                value={selectedElement.styling?.size || 'medium'}
                onValueChange={(value) => handleStylingUpdate('size', value)}
              >
                <SelectTrigger className="text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Advanced Settings */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-neutral-700 mb-4">Advanced</h3>
          <div className="space-y-3">
            <label className="flex items-center">
              <Checkbox
                checked={selectedElement.disabled || false}
                onCheckedChange={(checked) => handleUpdate('disabled', checked)}
              />
              <span className="ml-2 text-sm text-neutral-700">Disabled</span>
            </label>
            
            <label className="flex items-center">
              <Checkbox
                checked={selectedElement.readonly || false}
                onCheckedChange={(checked) => handleUpdate('readonly', checked)}
              />
              <span className="ml-2 text-sm text-neutral-700">Read only</span>
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-6 border-t border-neutral-200">
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium"
            onClick={onDeselectElement}
          >
            Done Editing
          </Button>
        </div>
      </div>
    </aside>
  );
}
