import type React from 'react'
import { StyledLabel } from './styles'
import { useMemo } from 'react'

interface SimpleInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export function SimpleInput({ className, label, value, onChange, ...rest }: SimpleInputProps) {
  const customClassName = useMemo(() => {
    let finalClassName = className
    
    if (typeof value === 'string' && value.length > 0) {
      finalClassName = `${finalClassName} filled`
    }

    return finalClassName
  }, [className, value])

  return (
    <StyledLabel
      className={customClassName}
    >
      <span>
        { label }
      </span>

      <input
        value={value}
        type='text'
        onChange={onChange}
        {...rest}
      />
    </StyledLabel>
  )
}