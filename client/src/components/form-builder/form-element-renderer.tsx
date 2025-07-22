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
    ? "space-y-3"
    : `form-element group relative border-2 transition-all duration-200 p-5 rounded-xl cursor-pointer hover:shadow-lg hover:shadow-blue-100/20 ${
        isSelected 
          ? 'border-blue-400 bg-gradient-to-br from-blue-50/80 to-indigo-50/50 shadow-md shadow-blue-200/25' 
          : 'border-transparent hover:border-blue-200 bg-white'
      }`;

  return (
    <div className={containerClasses} onClick={handleClick}>
      {!previewMode && (
        <>
          {/* Selection indicator */}
          {isSelected && (
            <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-r-full"></div>
          )}
          
          {/* Action buttons */}
          <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-all duration-200 flex gap-1">
            <Button
              size="sm"
              variant="secondary"
              className="w-7 h-7 p-0 rounded-full bg-white border border-slate-200 hover:border-blue-300 hover:bg-blue-50 shadow-sm"
              onClick={(e) => {
                e.stopPropagation();
                // Could add duplicate functionality here
              }}
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
                <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
              </svg>
            </Button>
            <Button
              size="sm"
              variant="destructive"
              className="w-7 h-7 p-0 rounded-full shadow-sm"
              onClick={(e) => {
                e.stopPropagation();
                onRemove(element.id);
              }}
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Button>
          </div>

          {/* Drag handle */}
          <div className="absolute -left-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-6 h-6 bg-white border border-slate-200 rounded-lg shadow-sm flex items-center justify-center cursor-grab hover:bg-slate-50">
              <svg className="w-3 h-3 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </div>
          </div>
        </>
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
