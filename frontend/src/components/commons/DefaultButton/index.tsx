import { useMemo, type ReactNode } from 'react'
import { StyledButton } from './styles'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string
  textColor?: string
  textHoverColor?: string
  hoverColor?: string
  minWidth?: string
  iconSize?: string

  block?: boolean
  icon?: boolean
  list?: boolean
  disabled?: boolean
  readonly?: boolean

  prependIcon?: ReactNode
  appendIcon?: ReactNode
}

export function DefaultButton({
  children,

  color,
  textColor,
  textHoverColor,
  hoverColor,
  minWidth,
  iconSize,

  className,

  block,
  icon,
  list,
  disabled,
  readonly,
  
  prependIcon,
  appendIcon,
  ...rest
}: ButtonProps) {
  const adaptedClasses = useMemo(
    () => {
      const customClassesArr = []

      if (block) {
        customClassesArr.push('default-button--block')
      }

      if (icon) {
        customClassesArr.push('default-button--icon')
      }

      if (list) {
        customClassesArr.push('default-button--list')
      }

      if (prependIcon) {
        customClassesArr.push('default-button--text-and-icon')
      }

      if (disabled) {
        customClassesArr.push('default-button--disabled')
      }

      if (readonly) {
        customClassesArr.push('default-button--readonly')
      }

      return `${customClassesArr.join(' ')} ${className}`
    },
    [block, icon, list, prependIcon, disabled, readonly, className],
  )
  
  return (
    <StyledButton
      className={adaptedClasses}
      $color={color}
      $textColor={textColor}
      $textHoverColor={textHoverColor}
      $hoverColor={hoverColor}
      $minWidth={minWidth}
      $iconSize={iconSize}
      {...rest}
    >
      { prependIcon }

      { children }

      { appendIcon }
    </StyledButton>
  )
}