import React, { useMemo, useRef, useState, type ReactNode } from 'react'

import { AnimatePresence } from 'motion/react'

import { useElementDimensions } from '@/hooks/useElementDimensions'

import { StyledActivator, StyledContainer, StyledMenuContent } from './styles'

interface FloatingMenuProps {
  children: ReactNode

  activator: ReactNode

  width?: string
}

export function FloatingMenu({ children, activator, width = '300px' }: FloatingMenuProps) {
  const [open, setOpen] = useState(false)

  const activatorRef = useRef<HTMLButtonElement>(null)

  const windowDimensions = useElementDimensions()

  const menuPositionAdjust = useMemo(() => {
    // The variable "open" is used to force the calculations to be executed again.
    if (activatorRef.current && windowDimensions && open) {
      const activatorClientRect = activatorRef.current.getBoundingClientRect()

      // activatorDistanceToPageRight starts from the left corner of the activator
      const activatorDistanceToPageRight = windowDimensions.width - activatorClientRect.left

      const menuContentWidth = parseInt(/^(\d+).*/.exec(width)?.[1] ?? '')

      if (!isNaN(menuContentWidth) && activatorDistanceToPageRight < menuContentWidth) {
        return {
          translateX: `-${menuContentWidth - activatorClientRect.width}px`,
        }
      }
    }

    return {
      translateX: '0',
    }
  }, [open, width, windowDimensions])

  function handleBlur(event: React.FocusEvent<HTMLDivElement>) {
    if (!event.currentTarget.contains(event.relatedTarget) && open) {
      setOpen(false)
    }
  }

  function handleClick() {
    setOpen(!open)
  }

  return (
    <StyledContainer
      onBlur={handleBlur}
    >
      <StyledActivator
        ref={activatorRef}
        onClick={handleClick}
      >
        { activator }
      </StyledActivator>

      <AnimatePresence>
        {
          open && (
            <StyledMenuContent
              $width={width}
              style={{
                transform: `translateX(${menuPositionAdjust.translateX})`,
              }}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              tabIndex={0}
              onFocus={() => setOpen(true)}
            >
              { children }
            </StyledMenuContent>
          )
        }
      </AnimatePresence>
    </StyledContainer>
  )
}