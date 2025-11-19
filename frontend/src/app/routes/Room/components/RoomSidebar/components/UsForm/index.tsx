import React, { useState } from 'react'
import { BsCheck, BsX } from 'react-icons/bs'

import { DefaultButton } from '@/components/commons/DefaultButton'

import { StyledCardActions, StyledCardFormContainer, StyledHeader } from './styles'
import { SimpleInput } from '@/components/commons/SimpleInput'

interface UsFormProps {
  onSubmit: (title: string) => void | Promise<void>
  onCancel: () => void | Promise<void>
}

export function UsForm({ onSubmit, onCancel }: UsFormProps) {
  const [formPayload, setFormPayload] = useState({
    title: '',
  })

  function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault()

    onSubmit(formPayload.title)
  }

  return (
    <StyledCardFormContainer
      onSubmit={handleSubmit}
    >
      <StyledHeader>
        <SimpleInput
          label='Título da Tarefa'
          value={formPayload.title}
          autoFocus
          onChange={e => setFormPayload({ ...formPayload, title: e.target.value })}
        />
      </StyledHeader>

      <StyledCardActions>
        <DefaultButton
          prependIcon={<BsCheck size={25} />}
          color='var(--theme-primary-lighten-3-color)'
        >
          Salvar
        </DefaultButton>

        <DefaultButton
          prependIcon={<BsX size={25} />}
          color='var(--theme-primary-lighten-3-color)'
          onClick={onCancel}
        >
          Cancelar
        </DefaultButton>
      </StyledCardActions>
    </StyledCardFormContainer>
  )
}