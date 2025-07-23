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
  onMobileEdit?: (id: string) => void;
  isDragging?: boolean;
  onMoveUp?: (id: string) => void;
  onMoveDown?: (id: string) => void;
  canMoveUp?: boolean;
  canMoveDown?: boolean;
}

export function FormElementRenderer({
  element,
  isSelected,
  onSelect,
  onRemove,
  previewMode,
  onMobileEdit,
  isDragging = false,
  onMoveUp,
  onMoveDown,
  canMoveUp = true,
  canMoveDown = true,
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
            disabled={element.disabled || isDragging}
            readOnly={element.readonly}
            name={element.name}
            className="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            tabIndex={isDragging ? -1 : undefined}
          />
        );

      case 'email-input':
        return (
          <Input
            type="email"
            placeholder={element.placeholder}
            required={element.required}
            disabled={element.disabled || isDragging}
            readOnly={element.readonly}
            name={element.name}
            className="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            tabIndex={isDragging ? -1 : undefined}
          />
        );

      case 'number-input':
        return (
          <Input
            type="number"
            placeholder={element.placeholder}
            required={element.required}
            disabled={element.disabled || isDragging}
            readOnly={element.readonly}
            name={element.name}
            min={element.validation?.min}
            max={element.validation?.max}
            className="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            tabIndex={isDragging ? -1 : undefined}
          />
        );

      case 'textarea':
        return (
          <Textarea
            placeholder={element.placeholder}
            required={element.required}
            disabled={element.disabled || isDragging}
            readOnly={element.readonly}
            name={element.name}
            className="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={4}
            tabIndex={isDragging ? -1 : undefined}
          />
        );

      case 'select':
        return (
          <Select name={element.name} required={element.required} disabled={element.disabled || isDragging}>
            <SelectTrigger 
              className="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              tabIndex={isDragging ? -1 : undefined}
            >
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
                  disabled={element.disabled || isDragging}
                  tabIndex={isDragging ? -1 : undefined}
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

      case 'image':
        return (
          <div className="w-full">
            <div className="relative w-full aspect-square bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg overflow-hidden">
              {element.src ? (
                <img
                  src={element.src}
                  alt={element.alt || element.label}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to placeholder if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
              ) : null}
              <div className={`absolute inset-0 flex flex-col items-center justify-center text-slate-500 ${element.src ? 'hidden' : ''}`}>
                <svg className="w-16 h-16 mb-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-4.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
                <p className="text-sm font-medium">Image Placeholder</p>
                <p className="text-xs text-slate-400 mt-1">Click to configure image source</p>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Unknown element type</div>;
    }
  };

  const containerClasses = previewMode 
    ? "space-y-3"
    : `form-element group relative border-2 transition-all duration-200 p-3 md:p-5 rounded-lg md:rounded-xl cursor-pointer hover:shadow-lg hover:shadow-blue-100/20 select-none ${
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
          
          {/* Action buttons - Desktop */}
          <div className="hidden lg:flex absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-all duration-200 gap-1">
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

          {/* Mobile edit indicator */}
          <div className="lg:hidden absolute top-2 right-2 opacity-60 group-hover:opacity-100 transition-opacity">
            <button
              className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-sm hover:bg-blue-600 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onMobileEdit?.(element.id);
              }}
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>
          </div>

          {/* Move buttons for selected element */}
          {isSelected && (onMoveUp || onMoveDown) && (
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 flex flex-col gap-1">
              {/* Move Up Button */}
              {onMoveUp && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onMoveUp(element.id);
                  }}
                  disabled={!canMoveUp}
                  className={`w-6 h-6 rounded-lg shadow-sm flex items-center justify-center transition-all ${
                    canMoveUp 
                      ? 'bg-white border border-slate-200 hover:bg-blue-50 hover:border-blue-300 text-slate-600 hover:text-blue-600' 
                      : 'bg-slate-100 border border-slate-200 text-slate-300 cursor-not-allowed'
                  }`}
                >
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
              
              {/* Move Down Button */}
              {onMoveDown && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onMoveDown(element.id);
                  }}
                  disabled={!canMoveDown}
                  className={`w-6 h-6 rounded-lg shadow-sm flex items-center justify-center transition-all ${
                    canMoveDown 
                      ? 'bg-white border border-slate-200 hover:bg-blue-50 hover:border-blue-300 text-slate-600 hover:text-blue-600' 
                      : 'bg-slate-100 border border-slate-200 text-slate-300 cursor-not-allowed'
                  }`}
                >
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
            </div>
          )}
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
