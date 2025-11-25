import styled from 'styled-components'

import { motion } from 'motion/react'

interface StyledFigureProps {
  $backgroundColor?: string
}

export const StyledFigure = styled(motion.figure)<StyledFigureProps>`
  z-index: var(--base-menu-z-index);

  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;

  position: absolute;
  bottom: 20px;
  right: 20px;

  min-width: 450px;
  max-width: 600px;
  height: 100px;

  padding: 0 20px;

  color: #fff;

  background-color: ${props => props.$backgroundColor || 'var(--theme-primary-color)'};

  outline: 2px solid #fff;
  border-radius: 20px;

  figcaption {
    font-size: 1.2rem;
    font-weight: 600;
  }

  @media (max-width: 960px) {
    bottom: 10px;
    right: 10px;

    min-width: calc(100% - 20px);
    max-width: calc(100% - 20px);
  }
`

export const StyledContentContainer = styled.div`
  margin-right: 20px;

  p {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;

    overflow: hidden;
    text-overflow: ellipsis;

    max-width: 100%;
  }
`

export const FloatingActions = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
`
