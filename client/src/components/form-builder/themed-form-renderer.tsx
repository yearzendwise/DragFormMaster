import { FormElement, FormTheme } from '@/types/form-builder';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RateScale } from '@/components/ui/rate-scale';
import { BooleanSwitch } from '@/components/ui/boolean-switch';

// Extended type for preview elements that includes buttons and spacer
type PreviewFormElement = FormElement | {
  id: string;
  type: 'submit-button' | 'reset-button' | 'spacer';
  label: string;
  name: string;
  required: boolean;
  styling?: {
    width: 'full' | 'half' | 'third';
    size: 'small' | 'medium' | 'large';
  };
};

interface ThemedFormRendererProps {
  element: PreviewFormElement;
  themeStyles: FormTheme['styles'];
}

export function ThemedFormRenderer({ element, themeStyles }: ThemedFormRendererProps) {
  const renderFormControl = () => {
    const baseInputClasses = themeStyles.input;
    
    // Special handling for glassmorphism theme to force transparency
    const isGlassmorphism = themeStyles.input.includes('glassmorphism-input');
    
    const forceTransparentStyle: React.CSSProperties = isGlassmorphism ? {
      background: 'transparent',
      backgroundColor: 'transparent',
      backgroundImage: 'none',
      opacity: '1',
      WebkitAppearance: 'none',
      MozAppearance: 'none',
      appearance: 'none'
    } : {};
    
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
            className={baseInputClasses}
            style={forceTransparentStyle}
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
            className={baseInputClasses}
            style={forceTransparentStyle}
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
            className={baseInputClasses}
            style={forceTransparentStyle}
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
            rows={4}
            minLength={element.validation?.minLength}
            maxLength={element.validation?.maxLength}
            className={baseInputClasses}
            style={forceTransparentStyle}
          />
        );

      case 'select':
        return (
          <select
            name={element.name}
            required={element.required}
            disabled={element.disabled}
            className={baseInputClasses}
          >
            <option value="">{element.placeholder || 'Select an option'}</option>
            {element.options?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      case 'checkbox':
        return (
          <div className="space-y-2">
            {element.options?.map((option, index) => (
              <label key={index} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name={element.name}
                  value={option}
                  className="rounded border-gray-300"
                />
                <span className="text-sm">{option}</span>
              </label>
            ))}
          </div>
        );

      case 'radio':
        return (
          <div className="space-y-2">
            {element.options?.map((option, index) => (
              <label key={index} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={element.name}
                  value={option}
                  className="border-gray-300"
                />
                <span className="text-sm">{option}</span>
              </label>
            ))}
          </div>
        );

      case 'image':
        return (
          <div className="w-full aspect-square bg-gray-100 border border-gray-200 rounded flex items-center justify-center overflow-hidden">
            {element.src ? (
              <img
                src={element.src}
                alt={element.alt || 'Form image'}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.innerHTML = `
                    <div class="text-center text-gray-500">
                      <svg class="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"/>
                      </svg>
                      <div class="text-sm">Image failed to load</div>
                    </div>
                  `;
                }}
              />
            ) : (
              <div className="text-center text-gray-500">
                <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"/>
                </svg>
                <div className="text-sm">No image source</div>
              </div>
            )}
          </div>
        );

      case 'spacer':
        return (
          <div className="h-[55px]" />
        );

      case 'submit-button':
        return (
          <button
            type="submit"
            className={`${themeStyles.button}`}
          >
            {element.label}
          </button>
        );

      case 'reset-button':
        return (
          <button
            type="reset"
            className={`${themeStyles.button.replace('bg-blue-600', 'bg-gray-600').replace('hover:bg-blue-700', 'hover:bg-gray-700')}`}
          >
            {element.label}
          </button>
        );

      case 'rate-scale':
        return (
          <RateScale
            name={element.name}
            required={element.required}
            disabled={(element as FormElement).disabled}
            min={(element as FormElement).validation?.min || 1}
            max={(element as FormElement).validation?.max || 10}
            variant={(element as FormElement).rateVariant || "numbers"}
            showNumbers={(element as FormElement).rateVariant === "numbers" || !(element as FormElement).rateVariant}
            className="justify-center"
          />
        );

      case 'boolean-switch':
        return (
          <BooleanSwitch
            name={element.name}
            required={element.required}
            disabled={(element as FormElement).disabled}
            variant={(element as FormElement).booleanVariant || "yes-no"}
            showLabels={true}
            className="justify-center"
          />
        );

      default:
        return <div className="text-red-500">Unknown element type: {(element as any).type}</div>;
    }
  };

  // Handle special types separately since they don't need labels
  if (element.type === 'submit-button' || element.type === 'reset-button' || element.type === 'spacer') {
    return renderFormControl();
  }

  return (
    <div className={themeStyles.field}>
      {element.type !== 'image' && (
        <label className={themeStyles.label}>
          {element.label}
          {element.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      {renderFormControl()}
      
      {(element as FormElement).helpText && (
        <p className="text-sm text-gray-500 mt-1">{(element as FormElement).helpText}</p>
      )}
    </div>
  );
}