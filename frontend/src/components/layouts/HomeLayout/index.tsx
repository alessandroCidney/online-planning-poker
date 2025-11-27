import type { ReactNode } from 'react'

import textAppLogoWhiteSvg from '@/assets/images/logos/text-app-logo-white.svg'

import { NotificationSnackbar } from '@/features/notifications/components/NotificationSnackbar'

import { StyledFooter, StyledHeader, StyledMain } from './styles'

interface HomeLayoutProps {
  children: ReactNode
}

export function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <>
      <StyledHeader>
        <h1>
          <img
            src={textAppLogoWhiteSvg}
            alt='Super Planning Poker'
          />
        </h1>
      </StyledHeader>

      <StyledMain>
        { children }

        <NotificationSnackbar />
      </StyledMain>

      <StyledFooter>
        Copyright&copy;2025 Alessandro Cídney
      </StyledFooter>
    </>
  )
}