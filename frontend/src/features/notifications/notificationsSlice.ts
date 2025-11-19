import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface NotificationsState {
  active: boolean
  title: string
  description: string
}

const initialState: NotificationsState = {
  active: false,
  title: '',
  description: '',
}

export const notificationsSlide = createSlice({
  name: 'notifications',

  initialState,

  reducers: {
    showMessage: (state, action: PayloadAction<{ title: string, description: string }>) => {
      state.title = action.payload.title
      state.description = action.payload.description
      state.active = true
    },

    hideMessage: (state) => {
      state.active = false
    },
  },
})

export const { showMessage, hideMessage } = notificationsSlide.actions

export default notificationsSlide.reducer
