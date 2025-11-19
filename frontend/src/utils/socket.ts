import { io, type Socket } from 'socket.io-client'

import type { Middleware, PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from '@/app/store'

import * as roomSliceReducers from '@/features/room/roomSlice'

import type { SocketResponse } from '@/types/socket'
import type { User } from '@/types/users'
import type { Room } from '@/types/rooms'
import type { Story } from '@/types/stories'

/*
  The Redux documentation recommends disabling the ESLint rule.
  https://redux.js.org/usage/usage-with-typescript#type-checking-middleware
*/

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export const setupSocketMiddleware: Middleware<{}, RootState> = (store) => {
  let globalSocket: Socket | undefined

  async function makeSureIsConnected() {
    if (globalSocket) {
      return globalSocket
    }

    return new Promise<Socket>((resolve) => {
      globalSocket = io(import.meta.env.VITE_API_URL)

      globalSocket.on('connect', () => {
        const connectedSocket = globalSocket as Socket

        store.dispatch({
          type: 'room/setSocketId',
          payload: connectedSocket.id,
        })

        connectedSocket.onAny((eventName, ...args) => {
          console.log('catch all', eventName, ...args)
        })

        resolve(connectedSocket)
      })
    })
  }

  async function emitMessage<T>(type: string, payload: unknown) {
    const socket = await makeSureIsConnected()

    const response = await new Promise<SocketResponse<T>>((resolve) => {
      socket.emit(type, payload, (res: SocketResponse<T>) => {
        resolve(res)
      })
    })

    if (response.error) {
      throw new Error(response.message)
    }

    return response
  }

  async function createRoom(userData: Partial<User>) {
    const socket = await makeSureIsConnected()

    const response = await emitMessage<Room>('room:create', {
      userData,
    })

    store.dispatch({
      type: 'room/setCurrentRoom',
      payload: response.data,
    })

    socket.on('room:updated', updateRoom)

    // navigate(`/rooms/${response.data._id}`)
  }

  async function joinRoom(roomId: string, userData: Partial<User>) {
    const socket = await makeSureIsConnected()

    const response = await emitMessage<Room>('room:join', {
      roomId,
      userData,
    })

    // if (response.error) {
    //   window.alert('Não foi possível se conectar à sala.')

    //   navigate('/')
    // }

    store.dispatch({
      type: 'room/setCurrentRoom',
      payload: response.data,
    })

    socket.on('room:updated', updateRoom)

    // navigate(`/rooms/${response.data._id}`)
  }

  function updateRoom(updatedRoom: Room) {
    store.dispatch({
      type: 'room/setCurrentRoom',
      payload: updatedRoom,
    })
  }

  async function leaveRoom() {
    const socket = await makeSureIsConnected()

    socket.removeAllListeners()

    socket.disconnect()

    store.dispatch({
      type: 'room/setSocketId',
      payload: undefined,
    })

    store.dispatch({
      type: 'room/setCurrentRoom',
      payload: undefined,
    })

    // window.location.href = window.location.origin
  }

  function makeSureRoomIsLoaded() {
    const currentRoom = store.getState().room.currentRoom

    if (!currentRoom) {
      throw new Error('The room data has not yet been loaded.')
    }

    return currentRoom
  }

  async function createStory(title: string) {
    const currentRoom = makeSureRoomIsLoaded()

    await emitMessage<Story>('story:create', {
      roomId: currentRoom._id,
      title,
    })
  }

  async function removeStory(storyId: string) {
    const currentRoom = makeSureRoomIsLoaded()

    await emitMessage('story:remove', {
      roomId: currentRoom._id,
      storyId,
    })
  }

  async function startVoting(storyId: string) {
    const currentRoom = makeSureRoomIsLoaded()

    await emitMessage('story:start-voting', {
      roomId: currentRoom._id,
      storyId,
    })
  }

  async function saveVote(storyId: string, voteValue: number) {
    const currentRoom = makeSureRoomIsLoaded()

    await emitMessage('story:save-vote', {
      roomId: currentRoom._id,
      storyId,
      voteValue,
    })
  }

  async function concludeVoting(storyId: string) {
    const currentRoom = makeSureRoomIsLoaded()

    await emitMessage('story:conclude-voting', {
      roomId: currentRoom._id,
      storyId,
    })
  }

  async function restartVoting(storyId: string) {
    const currentRoom = makeSureRoomIsLoaded()

    await emitMessage('story:restart-voting', {
      roomId: currentRoom._id,
      storyId,
    })
  }

  return next => (action) => {
    console.log('MIDDLEWARE LOG - action:', action)

    // It was not possible to configure the type directly in the parameter.
    const typedAction = action as PayloadAction<unknown>

    switch (typedAction.type) {
      case 'room/createRoom': {
        const actionPayload = typedAction.payload as Parameters<typeof roomSliceReducers['createRoom']>[0]

        createRoom(actionPayload.userData)

        break
      }

      case 'room/joinRoom': {
        const actionPayload = typedAction.payload as Parameters<typeof roomSliceReducers['joinRoom']>[0]

        joinRoom(actionPayload.roomId, actionPayload.userData)

        break
      }

      case 'room/leaveRoom': {
        leaveRoom()

        break
      }

      case 'room/createStory': {
        const actionPayload = typedAction.payload as Parameters<typeof roomSliceReducers['createStory']>[0]

        createStory(actionPayload.title)

        break
      }

      case 'room/removeStory': {
        const actionPayload = typedAction.payload as Parameters<typeof roomSliceReducers['removeStory']>[0]

        removeStory(actionPayload.storyId)

        break
      }

      case 'room/startVoting': {
        const actionPayload = typedAction.payload as Parameters<typeof roomSliceReducers['startVoting']>[0]

        startVoting(actionPayload.storyId)

        break
      }

      case 'room/saveVote': {
        const actionPayload = typedAction.payload as Parameters<typeof roomSliceReducers['saveVote']>[0]

        saveVote(actionPayload.storyId, actionPayload.voteValue)

        break
      }

      case 'room/concludeVoting': {
        const actionPayload = typedAction.payload as Parameters<typeof roomSliceReducers['concludeVoting']>[0]

        concludeVoting(actionPayload.storyId)

        break
      }

      case 'room/restartVoting': {
        const actionPayload = typedAction.payload as Parameters<typeof roomSliceReducers['restartVoting']>[0]

        restartVoting(actionPayload.storyId)

        break
      }

      default:
        next(action)
    }
  }
}