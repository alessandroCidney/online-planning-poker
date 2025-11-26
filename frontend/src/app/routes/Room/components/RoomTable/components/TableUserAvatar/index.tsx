import { useAppSelector } from '@/app/storeHooks'

import type { EllipseCoordinate } from '@/utils/calc'

import type { User } from '@/types/users'

import { StyledContainer, StyledUserAvatar, StyledUserName } from './styles'

interface UserAvatarProps {
  user: User
  coordinates: EllipseCoordinate

  disabled: boolean
}

export function TableUserAvatar({ user, coordinates, disabled }: UserAvatarProps) {
  const roomSelector = useAppSelector(state => state.room)

  const isRoomOwner = !!roomSelector.currentRoom?.ownerIds.includes(user._id)

  return (
    <StyledContainer
      initial={{
        translateX: coordinates.x,
        translateY: coordinates.y * -1,
        scale: 0,
        opacity: 0,
      }}
      animate={{
        translateX: coordinates.x,
        translateY: coordinates.y * -1,
        scale: 1,
        opacity: 1,
      }}
      className={isRoomOwner ? 'table-user-avatar__container--primary' : undefined}
    >
      <StyledUserName>
        { user.name }
      </StyledUserName>

      <StyledUserAvatar
        size='60px'
        imageId={user.avatar.path}
        disabled={disabled}
        bordered
      />
    </StyledContainer>
  )
}