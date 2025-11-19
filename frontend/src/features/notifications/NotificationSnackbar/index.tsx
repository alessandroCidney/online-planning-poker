import { useMemo } from 'react'
import { BsCheckCircleFill, BsExclamationCircleFill, BsX } from 'react-icons/bs'

import * as notificationsSlice from '@/features/notifications/notificationsSlice'

import { DefaultButton } from '@/components/commons/DefaultButton'

import { useRedux } from '@/hooks/useRedux'

import { FloatingActions, StyledFigure, StyledContentContainer } from './styles'

export function NotificationSnackbar() {
  const { useAppSelector, useAppDispatch } = useRedux()

  const dispatch = useAppDispatch()
  
  const notificationsSelector = useAppSelector(state => state.notifications)

  const dynamicStyleData = useMemo(() => {
    const styleDataObject = {
      error: {
        icon: <BsExclamationCircleFill size={40} />,
        backgroundColor: 'var(--theme-error-color)',
        closeButtonColor: 'var(--theme-error-darken-1-color)',
        closeButtonHoverColor: 'var(--theme-error-darken-1-color)',
      },

      success: {
        icon: <BsCheckCircleFill size={40} />,
        backgroundColor: undefined,
        closeButtonColor: undefined,
        closeButtonHoverColor: undefined,
      },
    }

    return styleDataObject[notificationsSelector.type]
  }, [notificationsSelector.type])

  return notificationsSelector.active
    ? (
      <StyledFigure
        $backgroundColor={dynamicStyleData.backgroundColor}
      >
        <div>
          { dynamicStyleData.icon }
        </div>

        <StyledContentContainer>
          <figcaption>
            { notificationsSelector.title }
          </figcaption>

          <p>
            { notificationsSelector.description }
          </p>
        </StyledContentContainer>

        <FloatingActions>
          <DefaultButton
            color={dynamicStyleData.closeButtonColor}
            hoverColor={dynamicStyleData.closeButtonHoverColor}
            iconSize='40px'
            icon
            onClick={() => dispatch(notificationsSlice.hideMessage())}
          >
            <BsX size={25} />
          </DefaultButton>
        </FloatingActions>
      </StyledFigure>
    )
    : null
}