import { useEffect, useMemo, useState } from 'react'

import { useAppSelector } from '@/app/storeHooks'

import type { EllipseCoordinate } from '@/utils/calc'

import type { User } from '@/types/users'

import { StyledUserContainer, StyledUserName } from './styles'

interface UserAvatarProps {
  user: User
  coordinates: EllipseCoordinate

  disabled: boolean
}

export function UserAvatar({ user, coordinates, disabled }: UserAvatarProps) {
  const roomSelector = useAppSelector(state => state.room)

  const [loadedPhoto, setLoadedPhoto] = useState('')

  const className = useMemo(() => {
    const classNameArr = []
    
    if (disabled) {
      classNameArr.push('user-avatar--disabled')
    }

    if (roomSelector.currentRoom?.ownerIds.includes(user._id)) {
      classNameArr.push('user-avatar--owner')
    }

    return classNameArr.join(' ')
  }, [disabled, roomSelector.currentRoom?.ownerIds, user._id])

  useEffect(() => {
    async function loadPhoto() {
      const importedImage = await import(`@/assets/images/pixelarts/${user.avatar.path}.png`)

      setLoadedPhoto(importedImage.default)
    }

    loadPhoto()
  }, [user.avatar.path])

  return (
    <StyledUserContainer
      $backgroundImage={loadedPhoto}
      className={className}
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
    >
      <StyledUserName>
        { user.name }
      </StyledUserName>
    </StyledUserContainer>
  )
}