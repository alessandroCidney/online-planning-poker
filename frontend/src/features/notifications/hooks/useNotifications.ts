import { useRedux } from '@/hooks/useRedux'

import { showMessage as showMessageReducer, hideMessage as hideMessageReducer } from '../notificationsSlice'

import { waitFor } from '@/utils/time'

export function useNotifications() {
  const { useAppSelector, useAppDispatch } = useRedux()

  const dispatch = useAppDispatch()
  const currentNotificationsData = useAppSelector(state => state.notifications)

  interface ShowMessageProps {
    title: string
    description: string
  }

  async function showMessage(payload: ShowMessageProps) {
    if (currentNotificationsData.active) {
      await waitFor(() => !currentNotificationsData.active)
    }

    dispatch(showMessageReducer(payload))

    setTimeout(() => {
      dispatch(hideMessageReducer())
    })
  }

  return {
    showMessage,
  }
}