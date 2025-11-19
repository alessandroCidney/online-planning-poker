import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router'

import { DefaultButton } from '@/components/commons/DefaultButton'

import { createRoom, joinRoom } from '@/features/room/roomSlice'

import { useRedux } from '@/hooks/useRedux'

import { StyledMain, Form, FloatingH1, FormField, FieldTitle, FieldInput, FormBreak } from './styles'

export function Home() {
  const navigate = useNavigate()

  const { useAppSelector, useAppDispatch } = useRedux()

  const dispatch = useAppDispatch()

  const roomSelector = useAppSelector(state => state.room)

  const [searchParams] = useSearchParams()

  const [enterRoomPayload, setEnterRoomPayload] = useState({
    code: searchParams.get('room') ?? '',
    name: '',
  })
  
  const [formStep, setFormStep] = useState<'room' | 'user'>(searchParams.get('room') ? 'user': 'room')

  function handleNextStep(event: React.SyntheticEvent) {
    event.preventDefault()

    setFormStep('user')
  }

  async function handleFinish(event: React.SyntheticEvent) {
    event.preventDefault()

    if (enterRoomPayload.code) {
      dispatch(joinRoom({
        roomId: enterRoomPayload.code,
        userData: {
          name: enterRoomPayload.name,
        },
      }))
    } else {
      dispatch(createRoom({
        userData: {
          name: enterRoomPayload.name,
        },
      }))
    }
  }
  
  useEffect(() => {
    if (roomSelector.currentRoom) {
      navigate(`/rooms/${roomSelector.currentRoom._id}`)
    }
  }, [navigate, roomSelector.currentRoom])

  return (
    <StyledMain>
      <FloatingH1>
        Home
      </FloatingH1>

      {
        formStep === 'room'
          ? (
            <Form onSubmit={handleNextStep}>
              <h2>
                Entre em uma sala
              </h2>

              <FormField>
                <FieldTitle>
                  Informe o código da sala em que deseja entrar:
                </FieldTitle>

                <FieldInput
                  type='text'
                  placeholder='XXXXXX'
                  value={enterRoomPayload.code}
                  onChange={(e) => setEnterRoomPayload({ ...enterRoomPayload, code: e.target.value })}
                />

                <DefaultButton block>
                  Entrar
                </DefaultButton>
              </FormField>

              <FormBreak>
                ou
              </FormBreak>

              <DefaultButton block>
                Crie uma nova
              </DefaultButton>
            </Form>
          )
          : (
            <Form onSubmit={handleFinish}>
              <h2>
                Escolha seu nome
              </h2>

              <p>
                Entrando na sala { enterRoomPayload.code }
              </p>

              <FormField>
                <FieldTitle>
                  Como deseja ser chamado?
                </FieldTitle>

                <FieldInput
                  type='text'
                  placeholder='Potato Chips'
                  value={enterRoomPayload.name}
                  onChange={(e) => setEnterRoomPayload({ ...enterRoomPayload, name: e.target.value })}
                />

                <DefaultButton block>
                  Continuar
                </DefaultButton>
              </FormField>
            </Form>
          )
      }
    </StyledMain>
  )
}