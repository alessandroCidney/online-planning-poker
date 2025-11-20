import { useMemo, useState } from 'react'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'

import { useAppDispatch, useAppSelector } from '@/app/storeHooks'

import catKingImg from '@/assets/images/pixelarts/cat-king.png'
import dogWarriorImg from '@/assets/images/pixelarts/dog-warrior.png'
import birdWizardImg from '@/assets/images/pixelarts/bird-wizard.png'
import birdBusinesspersonImg from '@/assets/images/pixelarts/bird-businessperson.png'

import * as roomSlice from '@/features/room/roomSlice'

import { DefaultButton } from '@/components/commons/DefaultButton'

import { UserAvatar } from '../UserAvatar'

import { StyledAvatarButton, StyledCardContainer, StyledCornerActions, StyledCardImage, StyledCardsList, StyledOverlay } from './style'

export function AvatarSelector() {
  const dispatch = useAppDispatch()

  const showAvatarSelector = useAppSelector(state => state.room.showAvatarSelector)

  const [selectedIndex, setSelectedIndex] = useState(0)

  const imageWidth = 300

  const positionedImages = useMemo(() => {
    const imagesArr = [
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
    ]

    const translateStep = imageWidth + 100

    return imagesArr.map((imageData, imageOriginalIndex) => ({
      ...imageData,
      translateX: (imageOriginalIndex - selectedIndex) * translateStep,
      originalIndex: imageOriginalIndex,
      selected: imageOriginalIndex === selectedIndex,
    }))
  }, [selectedIndex])

  function incrementIndex() {
    if (selectedIndex + 1 < positionedImages.length) {
      setSelectedIndex(selectedIndex + 1)
    }
  }

  function decrementIndex() {
    if (selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1)
    }
  }

  function setIndex(originalImageIndex: number) {
    setSelectedIndex(originalImageIndex)
  }

  function selectAvatar(imageId: string) {
    dispatch(roomSlice.updateAvatar({
      avatar: {
        path: imageId,
        type: 'internal_photo',
      },
    }))

    dispatch(roomSlice.toggleAvatarSelector())
  }

  return (
    <div>
      <StyledAvatarButton
        onClick={() => dispatch(roomSlice.toggleAvatarSelector())}
      >
        <UserAvatar />
      </StyledAvatarButton>

      <div>
        {
          showAvatarSelector && (
            <StyledOverlay>
              <StyledCardsList>
                {
                  positionedImages.map((imageData) => (
                    <StyledCardContainer
                      key={imageData.imagePath}
                      $width={imageWidth}
                      animate={{ x: imageData.translateX, scale: imageData.selected ? 1.3 : 1 }}
                      whileHover={{ scale: imageData.selected ? 1.3 : 1.1 }}
                      layout
                    >
                      <StyledCardImage
                        className={imageData.selected ? 'card-image--selected' : ''}
                        $width={imageWidth}
                        $imageUrl={imageData.imagePath}
                        onClick={() => setIndex(imageData.originalIndex)}
                      />

                      {
                        imageData.selected && (
                          <DefaultButton
                            block
                            onClick={() => selectAvatar(imageData.imageId)}
                          >
                            Selecionar avatar
                          </DefaultButton>
                        )
                      }
                    </StyledCardContainer>
                  ))
                }
              </StyledCardsList>

              <StyledCornerActions>
                <DefaultButton
                  color='transparent'
                  hoverColor='rgb(255, 255, 255, .1)'
                  icon
                  onClick={decrementIndex}
                >
                  <BsArrowLeft size={25} />
                </DefaultButton>

                <DefaultButton
                  color='transparent'
                  hoverColor='rgb(255, 255, 255, .1)'
                  icon
                  onClick={incrementIndex}
                >
                  <BsArrowRight size={25} />
                </DefaultButton>
              </StyledCornerActions>
            </StyledOverlay>
          )
        }
      </div>
    </div>
  )
}