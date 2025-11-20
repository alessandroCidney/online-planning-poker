import { useEffect, useState } from 'react'

import { useRedux } from '@/hooks/useRedux'

import { StyledImgContainer } from './style'

export function UserAvatar() {
  const { useAppSelector } = useRedux()

  const userAvatarPath = useAppSelector(state => state.room.currentRoom?.users[state.room.socketId ?? ''].avatar.path)

  const [loadedPhoto, setLoadedPhoto] = useState('')

  useEffect(() => {
    async function loadPhoto() {
      const importedImage = await import(`@/assets/images/pixelarts/${userAvatarPath}.png`)

      console.log('importedImage', importedImage.default)

      setLoadedPhoto(importedImage.default)
    }

    loadPhoto()
  }, [userAvatarPath])

  return (
    <StyledImgContainer
      $backgroundImage={loadedPhoto}
    />
  )
}