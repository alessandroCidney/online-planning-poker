import { useMemo, type ReactNode } from 'react'

import { BsFillTrash3Fill, BsArrowCounterclockwise } from 'react-icons/bs'
import type { HTMLMotionProps } from 'motion/react'

import { useAppSelector } from '@/app/storeHooks'

import { DefaultButton } from '@/components/commons/DefaultButton'

import { useVoting } from '@/features/room/hooks/useVoting'

import type { Story } from '@/types/stories'

import { StyledCardActions, StyledCardContainer, StyledHeader, StyledVotingResultContainer, StyledVotingResult, StyledCardRightActions } from './styles'

interface UsCardProps extends HTMLMotionProps<'article'> {
  storyData: Story

  startVoting: (storyId: string) => void | Promise<void>
  concludeVoting: (storyId: string) => void | Promise<void>
  restartVoting: (storyId: string) => void | Promise<void>
  removeStory: (storyId: string) => void | Promise<void>

  width?: string
  className?: string
}

export function UsCard({
  storyData,
  
  startVoting,
  concludeVoting,
  restartVoting,
  removeStory,
  
  width,
  className = '',

  ...rest
}: UsCardProps) {
  const roomSelector = useAppSelector(state => state.room)

  const isRoomOwner = !!roomSelector.currentRoom
    && !!roomSelector.socketId
    && roomSelector.currentRoom.ownerIds.includes(roomSelector.socketId)

  const { getVotingResult, votingStory } = useVoting()

  const votingResult = useMemo(() => getVotingResult(storyData), [getVotingResult, storyData])

  const anotherStoryIsInVoting = votingStory && votingStory._id !== storyData._id

  const customClassName = useMemo(() => {
    const classNameArr = []
    
    if (storyData.votingStatus === 'in_progress') {
      classNameArr.push('us-card--voting')
    }

    // Allows CSS extension via styled components
    classNameArr.push(className)

    return classNameArr.join(' ')
  }, [className, storyData.votingStatus])

  interface AnimatedContainerProps {
    children: ReactNode
  }

  function AnimatedContainer({ children }: AnimatedContainerProps) {
    return (
      <StyledCardContainer
        className={customClassName}
        $width={width}
        layout
        {...rest}
      >
        { children }
      </StyledCardContainer>
    )
  }

  if (storyData.votingStatus === 'not_started') {
    return (
      <AnimatedContainer>
        <StyledHeader>
          <h3>
            { storyData.title }
          </h3>
        </StyledHeader>

        <StyledCardActions>
          <DefaultButton
            disabled={anotherStoryIsInVoting || !isRoomOwner}
            color='var(--theme-primary-lighten-2-color)'
            onClick={() => startVoting(storyData._id)}
          >
            Iniciar votação
          </DefaultButton>

          <DefaultButton
            disabled={!isRoomOwner}
            color='var(--theme-primary-lighten-2-color)'
            icon
            onClick={() => removeStory(storyData._id)}
          >
            <BsFillTrash3Fill />
          </DefaultButton>
        </StyledCardActions>
      </AnimatedContainer>
    )
  }

  if (storyData.votingStatus === 'in_progress') {
    return (
      <AnimatedContainer>
        <StyledHeader>
          <h3>
            { storyData.title }
          </h3>
        </StyledHeader>

        <StyledCardActions>
          <DefaultButton
            disabled={!isRoomOwner}
            color='var(--theme-primary-lighten-2-color)'
            onClick={() => concludeVoting(storyData._id)}
          >
            Concluir votação
          </DefaultButton>
        </StyledCardActions>
      </AnimatedContainer>
    )
  }

  return (
    <AnimatedContainer>
      <StyledHeader>
        <h3>
          { storyData.title }
        </h3>
      </StyledHeader>

      <StyledCardActions>
        <StyledVotingResultContainer>
          {
            votingResult?.map((voteValue, voteValueIndex) => (
              <StyledVotingResult
                key={`voteValueIndex${voteValueIndex}`}
              >
                { voteValue }
              </StyledVotingResult>
            ))
          }
        </StyledVotingResultContainer>

        <StyledCardRightActions>
          <DefaultButton
            disabled={anotherStoryIsInVoting || !isRoomOwner}
            color='var(--theme-primary-lighten-2-color)'
            icon
            onClick={() => restartVoting(storyData._id)}
          >
            <BsArrowCounterclockwise size={25} />
          </DefaultButton>

          <DefaultButton
            disabled={!isRoomOwner}
            color='var(--theme-primary-lighten-2-color)'
            icon
            onClick={() => removeStory(storyData._id)}
          >
            <BsFillTrash3Fill />
          </DefaultButton>
        </StyledCardRightActions>
      </StyledCardActions>
    </AnimatedContainer>
  )
}