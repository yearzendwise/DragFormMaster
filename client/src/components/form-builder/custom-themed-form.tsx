import { FormTheme, FormElement } from '@/types/form-builder';
import { ThemedFormRenderer } from '@/components/form-builder/themed-form-renderer';
import { CSSProperties, useEffect } from 'react';

interface CustomThemedFormProps {
  theme: FormTheme;
  element: FormElement;
  onChange?: (fieldName: string, value: any) => void;
  onReset?: () => void;
}

export function CustomThemedForm({ theme, element, onChange, onReset }: CustomThemedFormProps) {
  // Check if theme has custom colors
  const customColors = theme.customColors;
  
  useEffect(() => {
    if (customColors) {
      // Inject custom CSS for color overrides
      const styleId = 'custom-theme-colors';
      let existingStyle = document.getElementById(styleId);
      
      if (!existingStyle) {
        existingStyle = document.createElement('style');
        existingStyle.id = styleId;
        document.head.appendChild(existingStyle);
      }
      
      existingStyle.textContent = `
        .custom-theme-wrapper button[type="submit"] {
          background-color: ${customColors.primary} !important;
          border-color: ${customColors.primary} !important;
        }
        .custom-theme-wrapper button[type="submit"]:hover {
          opacity: 0.9 !important;
        }
        .custom-theme-wrapper input:focus,
        .custom-theme-wrapper select:focus,
        .custom-theme-wrapper textarea:focus {
          border-color: ${customColors.primary} !important;
          box-shadow: 0 0 0 2px ${customColors.primary}20 !important;
        }
        .custom-theme-wrapper label {
          color: ${customColors.secondary} !important;
        }
        .custom-theme-wrapper .custom-background {
          background-color: ${customColors.background} !important;
        }
      `;
    }
  }, [customColors]);
  
  if (!customColors) {
    // No custom colors, use regular ThemedFormRenderer
    return (
      <ThemedFormRenderer
        element={element}
        themeStyles={theme.styles}
        onChange={onChange}
        onReset={onReset}
      />
    );
  }

  return (
    <div className="custom-theme-wrapper">
      <ThemedFormRenderer
        element={element}
        themeStyles={theme.styles}
        onChange={onChange}
        onReset={onReset}
      />
    </div>
  );
}