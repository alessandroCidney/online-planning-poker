import styled from 'styled-components'

import { motion } from 'motion/react'

export const StyledContainer = styled.div`
  z-index: var(--base-menu-z-index);

  position: relative;
`

export const StyledActivator = styled.button`
  border: 0;

  background-color: transparent;

  cursor: pointer;
`

interface StyledMenuContentProps {
  $width: string
}

export const StyledMenuContent = styled(motion.div)<StyledMenuContentProps>`  
  position: absolute;

  padding: 10px;

  width: ${props => props.$width};
  
  background-color: #fff;

  border-radius: 16px;

  box-shadow: 0px 5px 10px rgba(0, 0, 0, .05), 0 15px 40px rgba(0, 0, 0, .2);
`