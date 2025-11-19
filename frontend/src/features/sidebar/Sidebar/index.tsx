import type { ReactNode } from 'react'
import { BsX } from 'react-icons/bs'

import { openSidebar, closeSidebar } from '../sidebarSlice'

import { DefaultButton } from '../../../components/commons/DefaultButton'

import { useRedux } from '../../../hooks/useRedux'

import { StyledAside } from './styles'

interface SidebarProps {
  children: ReactNode

  title: string
}

export function Sidebar({ children, title }: SidebarProps) {
  const { useAppSelector, useAppDispatch } = useRedux()

  const dispatch = useAppDispatch()

  const sidebarOpen = useAppSelector(state => state.sidebar.open)

  return (
    <StyledAside>
      <header>
        <h2>
          { title } { sidebarOpen ? 'open' : 'closed' }
        </h2>

        <DefaultButton
          icon
          onClick={() => dispatch(sidebarOpen ? closeSidebar() : openSidebar())}
        >
          <BsX size={30} />
        </DefaultButton>
      </header>

      { children }
    </StyledAside>
  )
}