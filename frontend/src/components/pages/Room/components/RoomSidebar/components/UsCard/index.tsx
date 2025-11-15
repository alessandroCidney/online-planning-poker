import { BsFillTrash3Fill } from 'react-icons/bs'

import { DefaultButton } from '../../../../../../commons/DefaultButton'

import type { Story } from '../../../../../../../types/stories'

import { StyledCardActions, StyledCardContainer, StyledHeader } from './styles'

interface UsCardProps {
  storyData: Story

  handleRemove: (storyId: string) => void | Promise<void>
}

export function UsCard({ storyData, handleRemove }: UsCardProps) {
  return (
    <StyledCardContainer>
      <StyledHeader>
        { storyData.title }
      </StyledHeader>

      <StyledCardActions>
        <DefaultButton
          color='var(--theme-primary-lighten-2-color)'
        >
          Iniciar votação
        </DefaultButton>

        <DefaultButton
          color='var(--theme-primary-lighten-2-color)'
          icon
          onClick={() => handleRemove(storyData._id)}
        >
          <BsFillTrash3Fill />
        </DefaultButton>
      </StyledCardActions>
    </StyledCardContainer>
  )
}