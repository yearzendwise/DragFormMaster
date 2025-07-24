interface ThemedFullNameProps {
  name: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  firstNamePlaceholder?: string;
  lastNamePlaceholder?: string;
  className?: string;
  themeStyles: {
    input: string;
    label: string;
  };
}

export function ThemedFullName({
  name,
  required = false,
  disabled = false,
  readonly = false,
  firstNamePlaceholder = "First Name",
  lastNamePlaceholder = "Last Name",
  className = "",
  themeStyles
}: ThemedFullNameProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div>
        <input
          id={`${name}-first`}
          name={`${name}-first`}
          type="text"
          placeholder={firstNamePlaceholder}
          required={required}
          disabled={disabled}
          readOnly={readonly}
          className={`${themeStyles.input} ${className}`}
        />
      </div>
      <div>
        <input
          id={`${name}-last`}
          name={`${name}-last`}
          type="text"
          placeholder={lastNamePlaceholder}
          required={required}
          disabled={disabled}
          readOnly={readonly}
          className={`${themeStyles.input} ${className}`}
        />
      </div>
    </div>
  );
}