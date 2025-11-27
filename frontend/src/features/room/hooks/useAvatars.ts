import { useCallback, useMemo } from 'react'

import catKingImg from '@/assets/images/pixelarts/cat-king.jpg'
import dogWarriorImg from '@/assets/images/pixelarts/dog-warrior.jpg'
import birdWizardImg from '@/assets/images/pixelarts/bird-wizard.jpg'
import birdBusinesspersonImg from '@/assets/images/pixelarts/bird-businessperson.jpg'
import spyFoxImg from '@/assets/images/pixelarts/spy-fox.jpg'
import rabbitDoctorImg from '@/assets/images/pixelarts/rabbit-doctor.jpg'

export function useAvatars() {
  const avatarsArr = useMemo(() => [
    {
      imageId: 'cat-king',
      imagePath: catKingImg,
    },
    {
      imageId: 'dog-warrior',
      imagePath: dogWarriorImg,
    },
    {
      imageId: 'bird-wizard',
      imagePath: birdWizardImg,
    },
    {
      imageId: 'bird-businessperson',
      imagePath: birdBusinesspersonImg,
    },
    {
      imageId: 'spy-fox',
      imagePath: spyFoxImg,
    },
    {
      imageId: 'rabbit-doctor',
      imagePath: rabbitDoctorImg,
    },
  ], [])

  const getRandomAvatar = useCallback(() => {
    return avatarsArr[Math.floor(Math.random() * avatarsArr.length)]
  }, [avatarsArr])

  return {
    avatarsArr,
    getRandomAvatar,
  }
}