import { DefaultButton } from '@/components/commons/DefaultButton'

import * as roomSlice from '@/features/room/roomSlice'

import { useRedux } from '@/hooks/useRedux'

import { StyledHeader } from './styles'

export function RoomHeader() {
  const { useAppDispatch, useAppSelector } = useRedux()

  const dispatch = useAppDispatch()

  const roomSelector = useAppSelector(state => state.room)

  return (
    <StyledHeader>
      <h1>
        Online Planning Poker
      </h1>

      {
        !!roomSelector.currentRoom && (
          <nav>
            <DefaultButton
              minWidth='150px'
              color='#d9d9d9'
              hoverColor='#ccc'
              onClick={() => dispatch(roomSlice.leaveRoom())}
            >
              Sair
            </DefaultButton>
          </nav>
        )
      }
    </StyledHeader>
  )
}