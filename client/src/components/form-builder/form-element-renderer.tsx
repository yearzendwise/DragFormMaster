import { FormElement } from '@/types/form-builder';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface FormElementRendererProps {
  element: FormElement;
  isSelected: boolean;
  onSelect: (id: string | null) => void;
  onRemove: (id: string) => void;
  onUpdate?: (id: string, updates: Partial<FormElement>) => void;
  previewMode: boolean;
}

export function FormElementRenderer({
  element,
  isSelected,
  onSelect,
  onRemove,
  previewMode,
}: FormElementRendererProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (previewMode) return;
    e.stopPropagation();
    onSelect(element.id);
  };

  const renderFormControl = () => {
    switch (element.type) {
      case 'text-input':
        return (
          <Input
            type="text"
            placeholder={element.placeholder}
            required={element.required}
            disabled={element.disabled}
            readOnly={element.readonly}
            name={element.name}
            className="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        );

      case 'email-input':
        return (
          <Input
            type="email"
            placeholder={element.placeholder}
            required={element.required}
            disabled={element.disabled}
            readOnly={element.readonly}
            name={element.name}
            className="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        );

      case 'number-input':
        return (
          <Input
            type="number"
            placeholder={element.placeholder}
            required={element.required}
            disabled={element.disabled}
            readOnly={element.readonly}
            name={element.name}
            min={element.validation?.min}
            max={element.validation?.max}
            className="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        );

      case 'textarea':
        return (
          <Textarea
            placeholder={element.placeholder}
            required={element.required}
            disabled={element.disabled}
            readOnly={element.readonly}
            name={element.name}
            className="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={4}
          />
        );

      case 'select':
        return (
          <Select name={element.name} required={element.required} disabled={element.disabled}>
            <SelectTrigger className="focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <SelectValue placeholder={element.placeholder || "Choose an option"} />
            </SelectTrigger>
            <SelectContent>
              {element.options?.map((option, index) => (
                <SelectItem key={index} value={option.toLowerCase().replace(/\s+/g, '-')}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'checkbox':
        return (
          <div className="space-y-2">
            {element.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox 
                  id={`${element.id}-${index}`}
                  name={element.name}
                  value={option.toLowerCase().replace(/\s+/g, '-')}
                  disabled={element.disabled}
                />
                <Label htmlFor={`${element.id}-${index}`} className="text-sm">
                  {option}
                </Label>
              </div>
            ))}
          </div>
        );

      case 'radio':
        return (
          <RadioGroup name={element.name} disabled={element.disabled}>
            {element.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem 
                  value={option.toLowerCase().replace(/\s+/g, '-')}
                  id={`${element.id}-${index}`}
                />
                <Label htmlFor={`${element.id}-${index}`} className="text-sm">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      case 'submit-button':
        return (
          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium"
            disabled={element.disabled}
          >
            {element.label}
          </Button>
        );

      case 'reset-button':
        return (
          <Button 
            type="reset" 
            variant="outline"
            className="w-full"
            disabled={element.disabled}
          >
            {element.label}
          </Button>
        );

      default:
        return <div>Unknown element type</div>;
    }
  };

  const containerClasses = previewMode 
    ? "space-y-2"
    : `form-element group relative border transition-all p-4 rounded-lg cursor-pointer ${
        isSelected 
          ? 'border-blue-500 bg-blue-50' 
          : 'border-transparent hover:border-blue-400'
      }`;

  return (
    <div className={containerClasses} onClick={handleClick}>
      {!previewMode && (
        <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="sm"
            variant="destructive"
            className="w-6 h-6 p-0 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              onRemove(element.id);
            }}
          >
            <i className="fas fa-times text-xs"></i>
          </Button>
        </div>
      )}
      
      {element.type !== 'submit-button' && element.type !== 'reset-button' && (
        <Label className="block text-sm font-medium text-neutral-700 mb-2">
          {element.label}
          {element.required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      
      {renderFormControl()}
      
      {element.helpText && (
        <div className="text-xs text-neutral-500 mt-1">
          {element.helpText}
        </div>
      )}
    </div>
  );
}
