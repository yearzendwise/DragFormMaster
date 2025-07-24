import { FormElement, FormTheme } from '@/types/form-builder';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RateScale } from '@/components/ui/rate-scale';
import { BooleanSwitch } from '@/components/ui/boolean-switch';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import * as React from 'react';

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

// Themed Checkbox Component
interface ThemedCheckboxProps {
  name: string;
  value: string;
  label: string;
  themeStyles: FormTheme['styles'];
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

function ThemedCheckbox({ 
  name, 
  value, 
  label, 
  themeStyles, 
  checked = false, 
  onChange 
}: ThemedCheckboxProps) {
  const [isChecked, setIsChecked] = React.useState(checked);

  const handleChange = (newChecked: boolean) => {
    setIsChecked(newChecked);
    onChange?.(newChecked);
  };

  // Extract theme-specific styles
  const getCheckboxStyles = () => {
    const baseInput = themeStyles.input;
    
    // Theme-specific checkbox styling based on the theme patterns
    if (baseInput.includes('bg-gray-900') || baseInput.includes('bg-gray-800')) {
      // Elegant/Dark themes
      return {
        checkbox: 'w-5 h-5 rounded border-2 border-gray-600 bg-gray-800 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 checked:bg-yellow-400 checked:border-yellow-400 transition-all duration-300',
        label: 'text-gray-300 font-medium tracking-widest uppercase cursor-pointer select-none'
      };
    } else if (baseInput.includes('border-3') || baseInput.includes('font-mono')) {
      // Retro theme
      return {
        checkbox: 'w-5 h-5 rounded-none border-3 border-orange-400 bg-yellow-50 focus:ring-4 focus:ring-pink-500 focus:border-pink-500 checked:bg-orange-500 checked:border-orange-500 transition-all duration-200 transform hover:scale-105',
        label: 'text-pink-600 font-black tracking-wider uppercase cursor-pointer select-none transform skew-x-6'
      };
    } else if (baseInput.includes('rounded-3xl') || baseInput.includes('border-4')) {
      // Playful theme  
      return {
        checkbox: 'w-5 h-5 rounded-xl border-3 border-pink-300 bg-pink-50 focus:ring-4 focus:ring-purple-400 focus:border-purple-400 checked:bg-purple-500 checked:border-purple-500 transition-all duration-300 hover:border-purple-300 transform hover:scale-105',
        label: 'text-purple-700 font-bold cursor-pointer select-none'
      };
    } else if (baseInput.includes('rounded-2xl') && baseInput.includes('green')) {
      // Nature theme
      return {
        checkbox: 'w-5 h-5 rounded-lg border-2 border-green-300 bg-white/80 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 checked:bg-emerald-600 checked:border-emerald-600 transition-all duration-300 backdrop-blur-sm',
        label: 'text-emerald-700 font-semibold tracking-wide cursor-pointer select-none'
      };
    } else if (baseInput.includes('bg-black') || baseInput.includes('border-cyan')) {
      // Neon theme
      return {
        checkbox: 'w-5 h-5 rounded-lg border-2 border-cyan-400 bg-gray-900 focus:ring-2 focus:ring-green-400 focus:border-green-400 checked:bg-cyan-400 checked:border-cyan-400 transition-all duration-300 shadow-inner',
        label: 'text-green-400 font-bold tracking-wider uppercase cursor-pointer select-none'
      };
    } else if (baseInput.includes('bg-purple-800') || baseInput.includes('font-serif')) {
      // Luxury theme
      return {
        checkbox: 'w-5 h-5 rounded-lg border border-purple-600 bg-purple-800/50 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 checked:bg-yellow-400 checked:border-yellow-400 transition-all duration-300 backdrop-blur-sm',
        label: 'text-yellow-300 font-medium tracking-widest uppercase font-serif cursor-pointer select-none'
      };
    } else if (baseInput.includes('rounded-xl') && baseInput.includes('backdrop-blur')) {
      // Modern theme
      return {
        checkbox: 'w-5 h-5 rounded-xl border-2 border-gray-200 bg-white/80 focus:ring-2 focus:ring-purple-500 focus:border-transparent checked:bg-purple-500 checked:border-purple-500 transition-all duration-300 backdrop-blur-sm hover:scale-105',
        label: 'text-gray-800 font-semibold cursor-pointer select-none'
      };
    } else if (baseInput.includes('uppercase') && baseInput.includes('tracking-wider')) {
      // Professional theme
      return {
        checkbox: 'w-5 h-5 rounded-md border-2 border-slate-300 bg-slate-50 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 checked:bg-blue-600 checked:border-blue-600 transition-all duration-200',
        label: 'text-slate-700 font-bold uppercase tracking-wider cursor-pointer select-none'
      };
    } else {
      // Minimal theme (default)
      return {
        checkbox: 'w-5 h-5 rounded-lg border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 checked:bg-blue-500 checked:border-blue-500 transition-all duration-200 focus:bg-white',
        label: 'text-gray-700 font-medium tracking-wide cursor-pointer select-none'
      };
    }
  };

  const styles = getCheckboxStyles();

  return (
    <label className="flex items-center space-x-3 group">
      <div className="relative">
        <input
          type="checkbox"
          name={name}
          value={value}
          checked={isChecked}
          onChange={(e) => handleChange(e.target.checked)}
          className={cn("appearance-none", styles.checkbox)}
        />
        {isChecked && (
          <svg
            className="absolute inset-0.5 w-4 h-4 text-white pointer-events-none"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
      <span className={styles.label}>
        {label}
      </span>
    </label>
  );
}

// Themed Radio Component
interface ThemedRadioProps {
  name: string;
  value: string;
  label: string;
  themeStyles: FormTheme['styles'];
  checked?: boolean;
  onChange?: (value: string) => void;
}

function ThemedRadio({ 
  name, 
  value, 
  label, 
  themeStyles, 
  checked = false, 
  onChange 
}: ThemedRadioProps) {
  const handleChange = () => {
    if (onChange) {
      onChange(value);
    }
  };

  // Extract theme-specific styles for radio buttons (similar to checkbox but circular)
  const getRadioStyles = () => {
    const baseInput = themeStyles.input;
    
    // Clean theme-specific radio styling with no background bleeding
    if (baseInput.includes('bg-gray-900') || baseInput.includes('bg-gray-800')) {
      // Elegant/Dark themes
      return {
        radio: 'w-5 h-5 rounded-full border-2 border-gray-600 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300',
        label: 'text-gray-300 font-medium tracking-widest uppercase cursor-pointer select-none',
        indicator: 'bg-yellow-400'
      };
    } else if (baseInput.includes('border-3') || baseInput.includes('font-mono')) {
      // Retro theme
      return {
        radio: 'w-5 h-5 rounded-full border-3 border-orange-400 focus:ring-4 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200 transform hover:scale-105',
        label: 'text-pink-600 font-black tracking-wider uppercase cursor-pointer select-none transform skew-x-6',
        indicator: 'bg-orange-500'
      };
    } else if (baseInput.includes('rounded-3xl') || baseInput.includes('border-4')) {
      // Playful theme  
      return {
        radio: 'w-5 h-5 rounded-full border-3 border-pink-300 focus:ring-4 focus:ring-purple-400 focus:border-purple-400 transition-all duration-300 hover:border-purple-300 transform hover:scale-105',
        label: 'text-purple-700 font-bold cursor-pointer select-none',
        indicator: 'bg-purple-500'
      };
    } else if (baseInput.includes('rounded-2xl') && baseInput.includes('green')) {
      // Nature theme
      return {
        radio: 'w-5 h-5 rounded-full border-2 border-green-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300',
        label: 'text-emerald-700 font-semibold tracking-wide cursor-pointer select-none',
        indicator: 'bg-emerald-600'
      };
    } else if (baseInput.includes('bg-black') || baseInput.includes('border-cyan')) {
      // Neon theme
      return {
        radio: 'w-5 h-5 rounded-full border-2 border-cyan-400 focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-300',
        label: 'text-green-400 font-bold tracking-wider uppercase cursor-pointer select-none',
        indicator: 'bg-cyan-400'
      };
    } else if (baseInput.includes('bg-purple-800') || baseInput.includes('font-serif')) {
      // Luxury theme
      return {
        radio: 'w-5 h-5 rounded-full border border-purple-600 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300',
        label: 'text-yellow-300 font-medium tracking-widest uppercase font-serif cursor-pointer select-none',
        indicator: 'bg-yellow-400'
      };
    } else if (baseInput.includes('rounded-xl') && baseInput.includes('backdrop-blur')) {
      // Modern theme
      return {
        radio: 'w-5 h-5 rounded-full border-2 border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:scale-105',
        label: 'text-gray-800 font-semibold cursor-pointer select-none',
        indicator: 'bg-purple-500'
      };
    } else if (baseInput.includes('uppercase') && baseInput.includes('tracking-wider')) {
      // Professional theme
      return {
        radio: 'w-5 h-5 rounded-full border-2 border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all duration-200',
        label: 'text-slate-700 font-bold uppercase tracking-wider cursor-pointer select-none',
        indicator: 'bg-blue-600'
      };
    } else {
      // Minimal theme (default)
      return {
        radio: 'w-5 h-5 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200',
        label: 'text-gray-700 font-medium tracking-wide cursor-pointer select-none',
        indicator: 'bg-blue-500'
      };
    }
  };

  const styles = getRadioStyles();

  return (
    <label className="flex items-center space-x-3 group">
      <div className="relative">
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={handleChange}
          className={cn("appearance-none border-box", styles.radio)}
          style={{ 
            WebkitAppearance: 'none',
            MozAppearance: 'none',
            appearance: 'none',
            background: 'transparent',
            outline: 'none'
          }}
        />
        {checked && (
          <div className={cn("absolute inset-0 flex items-center justify-center", "")}>
            <div className={cn("w-2 h-2 rounded-full", styles.indicator)}></div>
          </div>
        )}
      </div>
      <span className={styles.label}>
        {label}
      </span>
    </label>
  );
}

// Themed Radio Group Component
interface ThemedRadioGroupProps {
  name: string;
  options: string[];
  themeStyles: FormTheme['styles'];
  defaultValue?: string;
  onChange?: (value: string) => void;
}

function ThemedRadioGroup({ 
  name, 
  options, 
  themeStyles, 
  defaultValue, 
  onChange 
}: ThemedRadioGroupProps) {
  const [selectedValue, setSelectedValue] = React.useState<string>(defaultValue || '');

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
    onChange?.(value);
  };

  return (
    <div className="space-y-3">
      {options.map((option, index) => (
        <ThemedRadio
          key={index}
          name={name}
          value={option}
          label={option}
          checked={selectedValue === option}
          onChange={handleRadioChange}
          themeStyles={themeStyles}
        />
      ))}
    </div>
  );
}

// Themed Boolean Switch Component
interface ThemedBooleanSwitchProps {
  value?: boolean;
  onValueChange?: (value: boolean) => void;
  disabled?: boolean;
  name?: string;
  required?: boolean;
  className?: string;
  variant?: "yes-no" | "true-false" | "on-off";
  showLabels?: boolean;
  themeStyles?: {
    track: string;
    thumb: string;
    activeLabel: string;
    inactiveLabel: string;
  };
}

function ThemedBooleanSwitch({ 
  value = false,
  onValueChange,
  disabled = false,
  name,
  required = false,
  className,
  variant = "yes-no",
  showLabels = true,
  themeStyles,
  ...props 
}: ThemedBooleanSwitchProps) {
  const [checked, setChecked] = React.useState(value);

  React.useEffect(() => {
    setChecked(value);
  }, [value]);

  const handleChange = (newValue: boolean) => {
    if (disabled) return;
    setChecked(newValue);
    onValueChange?.(newValue);
  };

  const getLabels = () => {
    switch (variant) {
      case "true-false":
        return { positive: "True", negative: "False" };
      case "on-off":
        return { positive: "On", negative: "Off" };
      case "yes-no":
      default:
        return { positive: "Yes", negative: "No" };
    }
  };

  const labels = getLabels();

  return (
    <div className={cn("inline-flex items-center gap-3", className)} {...props}>
      {showLabels && (
        <Label 
          className={cn(
            "text-sm font-medium transition-colors cursor-pointer select-none",
            checked 
              ? themeStyles?.inactiveLabel || "text-muted-foreground"
              : themeStyles?.activeLabel || "text-foreground font-semibold"
          )}
          onClick={() => handleChange(false)}
        >
          {labels.negative}
        </Label>
      )}
      
      <Switch
        checked={checked}
        onCheckedChange={handleChange}
        disabled={disabled}
        className={cn(themeStyles?.track || '')}
        aria-label={`Toggle between ${labels.negative} and ${labels.positive}`}
      />
      
      {showLabels && (
        <Label 
          className={cn(
            "text-sm font-medium transition-colors cursor-pointer select-none",
            checked 
              ? themeStyles?.activeLabel || "text-foreground font-semibold"
              : themeStyles?.inactiveLabel || "text-muted-foreground"
          )}
          onClick={() => handleChange(true)}
        >
          {labels.positive}
        </Label>
      )}

      {name && (
        <input
          type="hidden"
          name={name}
          value={checked ? "true" : "false"}
          required={required}
        />
      )}
    </div>
  );
}

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
          <div className="space-y-3">
            {element.options?.map((option, index) => (
              <ThemedCheckbox
                key={index}
                name={element.name}
                value={option}
                label={option}
                themeStyles={themeStyles}
              />
            ))}
          </div>
        );

      case 'radio':
        return (
          <ThemedRadioGroup
            name={element.name}
            options={element.options || []}
            themeStyles={themeStyles}
          />
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
          <div className="h-[35px]" />
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
          <ThemedBooleanSwitch
            name={element.name}
            required={element.required}
            disabled={(element as FormElement).disabled}
            variant={(element as FormElement).booleanVariant || "yes-no"}
            showLabels={true}
            className="justify-center"
            themeStyles={themeStyles.booleanSwitch}
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