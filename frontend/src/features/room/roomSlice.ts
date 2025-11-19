import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { Room } from '@/types/rooms'
import type { User } from '@/types/users'

export interface RoomState {
  socketId?: string

  currentRoom?: Room
}

const initialState: RoomState = {
  socketId: undefined,

  currentRoom: undefined,
}

export const roomSlice = createSlice({
  name: 'room',

  initialState,

  reducers: {
    setSocketId: (state, action: PayloadAction<string | undefined>) => {
      state.socketId = action.payload
    },

    setCurrentRoom: (state, action: PayloadAction<Room | undefined>) => {
      state.currentRoom = action.payload
    },

    createRoom: (_state, _action: PayloadAction<{ userData: Partial<User> }>) => {},
    joinRoom: (_state, _action: PayloadAction<{ roomId: string, userData: Partial<User> }>) => {},
    leaveRoom: (_state) => {},

    createStory: (_state, _action: PayloadAction<{ title: string }>) => {},
    removeStory: (_state, _action: PayloadAction<{ storyId: string }>) => {},

    startVoting: (_state, _action: PayloadAction<{ storyId: string }>) => {},
    saveVote: (_state, _action: PayloadAction<{ storyId: string, voteValue: number }>) => {},
    concludeVoting: (_state, _action: PayloadAction<{ storyId: string }>) => {},
    restartVoting: (_state, _action: PayloadAction<{ storyId: string }>) => {},
  },
})

export const {
  setSocketId,
  setCurrentRoom,

  createRoom,
  joinRoom,
  leaveRoom,

  createStory,
  removeStory,

  startVoting,
  saveVote,
  concludeVoting,
  restartVoting,
} = roomSlice.actions

export default roomSlice.reducer
