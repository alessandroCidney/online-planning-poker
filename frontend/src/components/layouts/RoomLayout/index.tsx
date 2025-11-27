import { useMemo, type ReactNode } from 'react'

import { useAppSelector } from '@/app/storeHooks'

import { Sidebar } from '@/features/sidebar/components/Sidebar'
import { NotificationSnackbar } from '@/features/notifications/components/NotificationSnackbar'

import { useElementDimensions } from '@/hooks/useElementDimensions'

import { StyledLayoutContainer, StyledMain, StyledRoomContent } from './style'
import { RoomHeader } from '@/app/routes/Room/components/RoomHeader'

interface RoomLayoutProps {
  children: ReactNode

  sidebarContent: ReactNode
  sidebarTitle: string
}

export function RoomLayout({ children, sidebarContent, sidebarTitle }: RoomLayoutProps) {
  const sidebarIsOpen = useAppSelector(state => state.sidebar.open)

  const windowDimensions = useElementDimensions()

  const finalSectionWidth = useMemo(() => {
    if (windowDimensions && windowDimensions.width <= 960) {
      return '100%'
    }

    return sidebarIsOpen ? 'calc(100% - 500px)' : '100%'
  }, [sidebarIsOpen, windowDimensions])

  return (
    <StyledLayoutContainer>
      <StyledRoomContent
        initial={{
          width: '100%',
        }}
        animate={{
          width: finalSectionWidth,
        }}
      >
        <RoomHeader />

        <StyledMain>
          { children }

          <NotificationSnackbar />
        </StyledMain>
      </StyledRoomContent>

      <Sidebar
        title={sidebarTitle}
      >
        { sidebarContent }
      </Sidebar>
    </StyledLayoutContainer>
  )
}