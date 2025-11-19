import { createSlice } from '@reduxjs/toolkit'

export interface SidebarState {
  open: boolean
}

const initialState: SidebarState = {
  open: true,
}

export const sidebarSlice = createSlice({
  name: 'sidebar',

  initialState,

  reducers: {
    openSidebar: (state) => {
      state.open = true
    },

    closeSidebar: (state) => {
      state.open = false
    },
  },
})

export const { openSidebar, closeSidebar } = sidebarSlice.actions

export default sidebarSlice.reducer
