import * as React from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export interface NumberInputProps {
  value?: string | number
  onChange?: (value: string) => void
  variant?: "number" | "phone" | "currency"
  placeholder?: string
  disabled?: boolean
  required?: boolean
  name?: string
  min?: number
  max?: number
  className?: string
  tabIndex?: number
  readOnly?: boolean
}

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  ({ 
    value,
    onChange,
    variant = "number",
    placeholder,
    disabled = false,
    required = false,
    name,
    min,
    max,
    className,
    tabIndex,
    readOnly,
    ...props 
  }, ref) => {
    const [displayValue, setDisplayValue] = React.useState(value?.toString() || "")

    React.useEffect(() => {
      setDisplayValue(value?.toString() || "")
    }, [value])

    const formatValue = (inputValue: string, inputVariant: string) => {
      const numericValue = inputValue.replace(/[^0-9.]/g, '')
      
      switch (inputVariant) {
        case 'phone':
          // Format as (XXX) XXX-XXXX for US phone numbers
          const phoneDigits = numericValue.replace(/\D/g, '')
          if (phoneDigits.length <= 3) {
            return phoneDigits
          } else if (phoneDigits.length <= 6) {
            return `(${phoneDigits.slice(0, 3)}) ${phoneDigits.slice(3)}`
          } else {
            return `(${phoneDigits.slice(0, 3)}) ${phoneDigits.slice(3, 6)}-${phoneDigits.slice(6, 10)}`
          }
        
        case 'currency':
          // Format as currency with $ prefix
          if (!numericValue) return ""
          const currencyValue = parseFloat(numericValue)
          if (isNaN(currencyValue)) return ""
          return `$${currencyValue.toFixed(2)}`
          
        case 'number':
        default:
          return numericValue
      }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value
      let processedValue = inputValue

      if (variant === 'phone') {
        // Allow digits, parentheses, spaces, and dashes for phone
        processedValue = inputValue.replace(/[^0-9\s\(\)\-]/g, '')
      } else if (variant === 'currency') {
        // Allow digits, decimal point, and dollar sign for currency
        processedValue = inputValue.replace(/[^0-9\.\$]/g, '')
      } else {
        // Default number input - allow digits and decimal point
        processedValue = inputValue.replace(/[^0-9\.\-]/g, '')
      }

      setDisplayValue(processedValue)
      onChange?.(processedValue)
    }

    const handleBlur = () => {
      if (variant === 'phone' || variant === 'currency') {
        const formatted = formatValue(displayValue, variant)
        setDisplayValue(formatted)
        onChange?.(formatted)
      }
    }

    const getInputType = () => {
      switch (variant) {
        case 'phone':
          return 'tel'
        case 'currency':
        case 'number':
        default:
          return 'text' // Use text to allow custom formatting
      }
    }

    const getPlaceholder = () => {
      if (placeholder) return placeholder
      
      switch (variant) {
        case 'phone':
          return '(555) 123-4567'
        case 'currency':
          return '$0.00'
        case 'number':
        default:
          return 'Enter number...'
      }
    }

    return (
      <Input
        ref={ref}
        type={getInputType()}
        value={displayValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
        placeholder={getPlaceholder()}
        disabled={disabled}
        required={required}
        name={name}
        min={variant === 'number' ? min : undefined}
        max={variant === 'number' ? max : undefined}
        className={cn(className)}
        tabIndex={tabIndex}
        readOnly={readOnly}
        {...props}
      />
    )
  }
)

NumberInput.displayName = "NumberInput"

export { NumberInput }