import { BsLayoutSidebarInsetReverse } from 'react-icons/bs'

import textAppLogo from '@/assets/images/logos/text-app-logo.svg'
import iconAppLogo from '@/assets/images/logos/icon-app-logo.svg'

import { useAppDispatch, useAppSelector } from '@/app/storeHooks'

import { DefaultButton } from '@/components/commons/DefaultButton'

import * as roomSlice from '@/features/room/roomSlice'
import * as sidebarSlice from '@/features/sidebar/sidebarSlice'
import { AvatarSelector } from '@/features/room/components/AvatarSelector'

import { useElementDimensions } from '@/hooks/useElementDimensions'

import { StyledHeader } from './styles'

export function RoomHeader() {
  const dispatch = useAppDispatch()

  const roomSelector = useAppSelector(state => state.room)
  const sidebarSelector = useAppSelector(state => state.sidebar)

  const windowDimensions = useElementDimensions()

  return (
    <StyledHeader>
      <h1>
        {
          windowDimensions && windowDimensions.width > 960
            ? (
              <img
                src={textAppLogo}
                width='300px'
              />
            )
            : (
              <img
                src={iconAppLogo}
                width='40px'
              />
            )
        }
      </h1>

      {
        !!roomSelector.currentRoom && (
          <div>
            <DefaultButton
              minWidth='150px'
              color='#d9d9d9'
              hoverColor='#ccc'
              onClick={() => dispatch(roomSlice.leaveRoom())}
            >
              Sair
            </DefaultButton>

            <AvatarSelector />

            <DefaultButton
              color={sidebarSelector.open ? 'var(--theme-primary-lighten-3-color)' : '#e8e8e8'}
              hoverColor='var(--theme-primary-color)'
              textColor={sidebarSelector.open ? '#fff' : '#424a52'}
              textHoverColor='#fff'
              icon
              onClick={() => dispatch(sidebarSlice.toggleSidebar())}
            >
              <BsLayoutSidebarInsetReverse size={25} />
            </DefaultButton>
          </div>
        )
      }
    </StyledHeader>
  )
}