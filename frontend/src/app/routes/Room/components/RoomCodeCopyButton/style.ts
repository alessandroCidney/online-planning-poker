import styled from 'styled-components'

import { DefaultButton } from '@/components/commons/DefaultButton'

export const StyledButton = styled(DefaultButton)`
  position: absolute;
  bottom: 10px;
  left: 10px;

  white-space: nowrap;
`

export const StyledRoomCode = styled.div`
  max-width: 100px;

  overflow: hidden;
  text-overflow: ellipsis;

  margin-left: 5px;
`