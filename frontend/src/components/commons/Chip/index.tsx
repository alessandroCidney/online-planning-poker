import type { ReactNode } from 'react'

import { StyledContainer } from './styles'

interface ChipProps {
  children: ReactNode
  
  color?: string
  textColor?: string
}

export function Chip({ children, color, textColor }: ChipProps) {
  return (
    <StyledContainer
      $backgroundColor={color}
      $color={textColor}
    >
      { children }
    </StyledContainer>
  )
}