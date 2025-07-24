import React from 'react';
import { Switch, RadioGroup, Checkbox } from '@headlessui/react';
import { cn } from '@/lib/utils';
import { FormTheme } from '@/types/form-builder';

// Helper functions for theme-specific radio button styling
const getRadioThemeChecked = (baseInput: string) => {
  if (baseInput.includes('bg-gray-900') || baseInput.includes('bg-gray-800')) {
    return 'border-yellow-400 bg-yellow-400';
  } else if (baseInput.includes('border-3') || baseInput.includes('font-mono')) {
    return 'border-orange-500 bg-orange-500';
  } else if (baseInput.includes('rounded-3xl') || baseInput.includes('border-4')) {
    return 'border-purple-500 bg-purple-500';
  } else if (baseInput.includes('rounded-2xl') && baseInput.includes('green')) {
    return 'border-emerald-600 bg-emerald-600';
  } else if (baseInput.includes('bg-black') || baseInput.includes('border-cyan')) {
    return 'border-cyan-400 bg-cyan-400';
  } else if (baseInput.includes('bg-purple-800') || baseInput.includes('font-serif')) {
    return 'border-yellow-400 bg-yellow-400';
  } else if (baseInput.includes('rounded-xl') && baseInput.includes('backdrop-blur')) {
    return 'border-purple-500 bg-purple-500';
  } else if (baseInput.includes('uppercase') && baseInput.includes('tracking-wider')) {
    return 'border-blue-600 bg-blue-600';
  } else {
    return 'border-blue-500 bg-blue-500';
  }
};

const getRadioThemeUnchecked = (baseInput: string) => {
  if (baseInput.includes('bg-gray-900') || baseInput.includes('bg-gray-800')) {
    return 'border-gray-600 bg-gray-800';
  } else if (baseInput.includes('border-3') || baseInput.includes('font-mono')) {
    return 'border-orange-400 bg-yellow-50';
  } else if (baseInput.includes('rounded-3xl') || baseInput.includes('border-4')) {
    return 'border-pink-300 bg-pink-50';
  } else if (baseInput.includes('rounded-2xl') && baseInput.includes('green')) {
    return 'border-green-300 bg-white';
  } else if (baseInput.includes('bg-black') || baseInput.includes('border-cyan')) {
    return 'border-cyan-400 bg-gray-900';
  } else if (baseInput.includes('bg-purple-800') || baseInput.includes('font-serif')) {
    return 'border-purple-600 bg-purple-800';
  } else if (baseInput.includes('rounded-xl') && baseInput.includes('backdrop-blur')) {
    return 'border-gray-200 bg-white';
  } else if (baseInput.includes('uppercase') && baseInput.includes('tracking-wider')) {
    return 'border-slate-300 bg-slate-50';
  } else {
    return 'border-gray-300 bg-gray-50';
  }
};

const getRadioIndicatorColor = (baseInput: string) => {
  if (baseInput.includes('bg-gray-900') || baseInput.includes('bg-gray-800')) {
    return 'bg-gray-800';
  } else if (baseInput.includes('border-3') || baseInput.includes('font-mono')) {
    return 'bg-yellow-50';
  } else if (baseInput.includes('rounded-3xl') || baseInput.includes('border-4')) {
    return 'bg-pink-50';
  } else if (baseInput.includes('rounded-2xl') && baseInput.includes('green')) {
    return 'bg-white';
  } else if (baseInput.includes('bg-black') || baseInput.includes('border-cyan')) {
    return 'bg-gray-900';
  } else if (baseInput.includes('bg-purple-800') || baseInput.includes('font-serif')) {
    return 'bg-purple-800';
  } else if (baseInput.includes('rounded-xl') && baseInput.includes('backdrop-blur')) {
    return 'bg-white';
  } else if (baseInput.includes('uppercase') && baseInput.includes('tracking-wider')) {
    return 'bg-slate-50';
  } else {
    return 'bg-gray-50';
  }
};

const getRadioLabelStyle = (baseInput: string) => {
  if (baseInput.includes('bg-gray-900') || baseInput.includes('bg-gray-800')) {
    return 'text-gray-300 font-medium tracking-widest uppercase cursor-pointer select-none';
  } else if (baseInput.includes('border-3') || baseInput.includes('font-mono')) {
    return 'text-pink-600 font-black tracking-wider uppercase cursor-pointer select-none transform skew-x-6';
  } else if (baseInput.includes('rounded-3xl') || baseInput.includes('border-4')) {
    return 'text-purple-700 font-bold cursor-pointer select-none';
  } else if (baseInput.includes('rounded-2xl') && baseInput.includes('green')) {
    return 'text-emerald-700 font-semibold tracking-wide cursor-pointer select-none';
  } else if (baseInput.includes('bg-black') || baseInput.includes('border-cyan')) {
    return 'text-green-400 font-bold tracking-wider uppercase cursor-pointer select-none';
  } else if (baseInput.includes('bg-purple-800') || baseInput.includes('font-serif')) {
    return 'text-yellow-300 font-medium tracking-widest uppercase font-serif cursor-pointer select-none';
  } else if (baseInput.includes('rounded-xl') && baseInput.includes('backdrop-blur')) {
    return 'text-gray-800 font-semibold cursor-pointer select-none';
  } else if (baseInput.includes('uppercase') && baseInput.includes('tracking-wider')) {
    return 'text-slate-700 font-bold uppercase tracking-wider cursor-pointer select-none';
  } else {
    return 'text-gray-700 font-medium tracking-wide cursor-pointer select-none';
  }
};

// Helper functions for checkbox styling
const getCheckboxThemeChecked = (baseInput: string) => {
  if (baseInput.includes('bg-gray-900') || baseInput.includes('bg-gray-800')) {
    return 'border-yellow-400 bg-yellow-400';
  } else if (baseInput.includes('border-3') || baseInput.includes('font-mono')) {
    return 'border-orange-500 bg-orange-500';
  } else if (baseInput.includes('rounded-3xl') || baseInput.includes('border-4')) {
    return 'border-purple-500 bg-purple-500 rounded-xl';
  } else if (baseInput.includes('rounded-2xl') && baseInput.includes('green')) {
    return 'border-emerald-600 bg-emerald-600 rounded-lg';
  } else if (baseInput.includes('bg-black') || baseInput.includes('border-cyan')) {
    return 'border-cyan-400 bg-cyan-400';
  } else if (baseInput.includes('bg-purple-800') || baseInput.includes('font-serif')) {
    return 'border-yellow-400 bg-yellow-400';
  } else if (baseInput.includes('rounded-xl') && baseInput.includes('backdrop-blur')) {
    return 'border-purple-500 bg-purple-500 rounded-md';
  } else if (baseInput.includes('uppercase') && baseInput.includes('tracking-wider')) {
    return 'border-blue-600 bg-blue-600';
  } else {
    return 'border-blue-500 bg-blue-500';
  }
};

const getCheckboxThemeUnchecked = (baseInput: string) => {
  if (baseInput.includes('bg-gray-900') || baseInput.includes('bg-gray-800')) {
    return 'border-gray-600 bg-gray-800';
  } else if (baseInput.includes('border-3') || baseInput.includes('font-mono')) {
    return 'border-orange-400 bg-yellow-50 rounded-none';
  } else if (baseInput.includes('rounded-3xl') || baseInput.includes('border-4')) {
    return 'border-pink-300 bg-pink-50 rounded-xl';
  } else if (baseInput.includes('rounded-2xl') && baseInput.includes('green')) {
    return 'border-green-300 bg-white rounded-lg';
  } else if (baseInput.includes('bg-black') || baseInput.includes('border-cyan')) {
    return 'border-cyan-400 bg-gray-900';
  } else if (baseInput.includes('bg-purple-800') || baseInput.includes('font-serif')) {
    return 'border-purple-600 bg-purple-800';
  } else if (baseInput.includes('rounded-xl') && baseInput.includes('backdrop-blur')) {
    return 'border-gray-200 bg-white rounded-md';
  } else if (baseInput.includes('uppercase') && baseInput.includes('tracking-wider')) {
    return 'border-slate-300 bg-slate-50';
  } else {
    return 'border-gray-300 bg-gray-50';
  }
};

const getCheckboxLabelStyle = (baseInput: string) => {
  return getRadioLabelStyle(baseInput); // Same as radio labels
};

// HeadlessUI Boolean Switch Component
interface HeadlessUIBooleanSwitchProps {
  value?: boolean;
  onValueChange?: (value: boolean) => void;
  disabled?: boolean;
  name?: string;
  required?: boolean;
  className?: string;
  variant?: "yes-no" | "true-false" | "on-off";
  showLabels?: boolean;
  themeStyles?: FormTheme['styles'];
}

export function HeadlessUIBooleanSwitch({
  value = false,
  onValueChange,
  disabled = false,
  name,
  required = false,
  className,
  variant = "yes-no",
  showLabels = true,
  themeStyles,
}: HeadlessUIBooleanSwitchProps) {
  const [enabled, setEnabled] = React.useState(value);

  React.useEffect(() => {
    setEnabled(value);
  }, [value]);

  const handleChange = (newValue: boolean) => {
    if (disabled) return;
    setEnabled(newValue);
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

  // Use the actual theme's booleanSwitch styles
  const booleanSwitchStyles = themeStyles?.booleanSwitch || {
    track: 'bg-gray-200',
    thumb: 'bg-white',
    activeLabel: 'text-gray-700 font-medium',
    inactiveLabel: 'text-gray-400 font-medium'
  };

  // Extract background and border styles from track
  const getTrackStyles = () => {
    const trackClass = booleanSwitchStyles.track;
    const baseInput = themeStyles?.input || '';
    
    // Define theme-specific colors based on input styles
    if (baseInput.includes('bg-gray-900') || baseInput.includes('bg-gray-800')) {
      // Elegant theme
      return {
        background: enabled ? 'linear-gradient(to right, #FBBF24, #FDE047)' : '#374151',
        borderColor: enabled ? '#FBBF24' : '#4B5563'
      };
    } else if (baseInput.includes('border-3') || baseInput.includes('font-mono')) {
      // Retro theme
      return {
        background: enabled ? 'linear-gradient(to right, #F97316, #EC4899)' : '#FEF3C7',
        borderColor: '#FB923C',
        borderWidth: '4px'
      };
    } else if (baseInput.includes('rounded-3xl') || baseInput.includes('border-4')) {
      // Playful theme
      return {
        background: enabled ? 'linear-gradient(to right, #EC4899, #9333EA)' : '#FCE7F3',
        borderColor: '#F9A8D4'
      };
    } else if (baseInput.includes('rounded-2xl') && baseInput.includes('green')) {
      // Nature theme
      return {
        background: enabled ? 'linear-gradient(to right, #16A34A, #059669)' : '#BBF7D0',
        borderColor: '#86EFAC'
      };
    } else if (baseInput.includes('bg-black') || baseInput.includes('border-cyan')) {
      // Neon theme
      return {
        background: enabled ? 'linear-gradient(to right, #06B6D4, #22D3EE)' : '#1F2937',
        borderColor: '#06B6D4'
      };
    } else if (baseInput.includes('bg-purple-800') || baseInput.includes('font-serif')) {
      // Luxury theme
      return {
        background: enabled ? 'linear-gradient(to right, #FBBF24, #FDE047)' : '#581C87',
        borderColor: enabled ? '#FBBF24' : '#7C3AED'
      };
    } else if (baseInput.includes('rounded-xl') && baseInput.includes('backdrop-blur')) {
      // Modern theme
      return {
        background: enabled ? '#A855F7' : '#E5E7EB',
        borderColor: enabled ? '#A855F7' : '#E5E7EB'
      };
    } else if (baseInput.includes('uppercase') && baseInput.includes('tracking-wider')) {
      // Professional theme
      return {
        background: enabled ? '#2563EB' : '#CBD5E1',
        borderColor: enabled ? '#2563EB' : '#CBD5E1'
      };
    } else {
      // Minimal theme
      return {
        background: enabled ? '#3B82F6' : '#E5E7EB',
        borderColor: enabled ? '#3B82F6' : '#D1D5DB'
      };
    }
  };

  const trackStyles = getTrackStyles();

  return (
    <div className={cn("inline-flex items-center justify-center gap-3", className)}>
      {showLabels && (
        <span 
          className={cn(
            "text-sm transition-colors cursor-pointer select-none whitespace-nowrap",
            !enabled ? booleanSwitchStyles.activeLabel : booleanSwitchStyles.inactiveLabel
          )}
          onClick={() => handleChange(false)}
        >
          {labels.negative}
        </span>
      )}
      
      <Switch
        checked={enabled}
        onChange={handleChange}
        disabled={disabled}
        className="relative inline-flex shrink-0 cursor-pointer items-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        style={{
          width: '44px',
          height: '24px',
          minWidth: '44px',
          borderRadius: '9999px',
          background: trackStyles.background,
          border: `${trackStyles.borderWidth || '2px'} solid ${trackStyles.borderColor}`,
          padding: '2px'
        }}
      >
        <span
          className={cn(
            "pointer-events-none inline-block transform transition-transform duration-200 shadow-sm",
            booleanSwitchStyles.thumb
          )}
          style={{
            width: '18px',
            height: '18px',
            borderRadius: '50%',
            transform: enabled ? 'translateX(20px)' : 'translateX(0)'
          }}
        />
      </Switch>
      
      {showLabels && (
        <span 
          className={cn(
            "text-sm transition-colors cursor-pointer select-none whitespace-nowrap",
            enabled ? booleanSwitchStyles.activeLabel : booleanSwitchStyles.inactiveLabel
          )}
          onClick={() => handleChange(true)}
        >
          {labels.positive}
        </span>
      )}

      {name && (
        <input
          type="hidden"
          name={name}
          value={enabled ? "true" : "false"}
          required={required}
        />
      )}
    </div>
  );
}

// HeadlessUI Radio Group Component
interface HeadlessUIRadioGroupProps {
  name: string;
  options: string[];
  themeStyles: FormTheme['styles'];
  defaultValue?: string;
  onChange?: (value: string) => void;
}

export function HeadlessUIRadioGroup({
  name,
  options,
  themeStyles,
  defaultValue,
  onChange
}: HeadlessUIRadioGroupProps) {
  const [selected, setSelected] = React.useState(defaultValue || '');

  const handleChange = (value: string) => {
    setSelected(value);
    onChange?.(value);
  };



  return (
    <RadioGroup value={selected} onChange={handleChange} className="space-y-3">
      {options.map((option) => (
        <RadioGroup.Option
          key={option}
          value={option}
          className="flex items-center space-x-3 group cursor-pointer"
        >
          {({ checked }) => (
            <>
              <div className="relative">
                <div 
                  className={cn(
                    "w-5 h-5 rounded-full border-2 transition-all duration-200",
                    checked 
                      ? getRadioThemeChecked(themeStyles.input)
                      : getRadioThemeUnchecked(themeStyles.input)
                  )} 
                />
                {checked && (
                  <div 
                    className={cn(
                      "absolute w-2 h-2 rounded-full",
                      getRadioIndicatorColor(themeStyles.input)
                    )}
                    style={{ 
                      top: '50%', 
                      left: '50%', 
                      transform: 'translate(-50%, -50%)' 
                    }}
                  />
                )}
              </div>
              <span className={cn(getRadioLabelStyle(themeStyles.input))}>
                {option}
              </span>
              {checked && (
                <input
                  type="hidden"
                  name={name}
                  value={option}
                />
              )}
            </>
          )}
        </RadioGroup.Option>
      ))}
    </RadioGroup>
  );
}

// HeadlessUI Checkbox Component
interface HeadlessUICheckboxProps {
  name: string;
  value: string;
  label: string;
  themeStyles: FormTheme['styles'];
  defaultChecked?: boolean;
  onChange?: (checked: boolean, value: string) => void;
}

export function HeadlessUICheckbox({
  name,
  value,
  label,
  themeStyles,
  defaultChecked = false,
  onChange
}: HeadlessUICheckboxProps) {
  const [checked, setChecked] = React.useState(defaultChecked);

  const handleChange = (newChecked: boolean) => {
    setChecked(newChecked);
    onChange?.(newChecked, value);
  };

  return (
    <Checkbox
      checked={checked}
      onChange={handleChange}
      className="flex items-center space-x-3 group cursor-pointer"
    >
      {({ checked }) => (
        <>
          <div className="relative">
            <div 
              className={cn(
                "w-5 h-5 border-2 transition-all duration-200",
                checked 
                  ? getCheckboxThemeChecked(themeStyles.input)
                  : getCheckboxThemeUnchecked(themeStyles.input)
              )} 
            />
            {checked && (
              <svg 
                className="absolute inset-0 w-full h-full text-white" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                  clipRule="evenodd" 
                />
              </svg>
            )}
          </div>
          <span className={cn(getCheckboxLabelStyle(themeStyles.input))}>
            {label}
          </span>
          {checked && (
            <input
              type="hidden"
              name={name}
              value={value}
            />
          )}
        </>
      )}
    </Checkbox>
  );
}