import styled from 'styled-components'

import { motion } from 'motion/react'

import { UserAvatar } from '@/features/room/components/UserAvatar'

export const StyledUserName = styled.div`
  position: absolute;

  top: -25px;
  
  padding: 0 10px;

  min-width: 100%;
  max-width: 200px;
  
  overflow: hidden;

  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
  text-align: center;
  color: #767676;
  
  background-color: #f6f6f6;

  border-radius: 8px;
`

export const StyledUserAvatar = styled(UserAvatar)``

export const StyledContainer = styled(motion.div)`
  position: absolute;

  display: flex;
  align-items: center;
  justify-content: center;

  &.table-user-avatar__container--primary {
    ${StyledUserName} {
      color: #fff;

      background-color: var(--theme-primary-darken-1-color);
    }

    ${StyledUserAvatar} {
      outline: 2px solid var(--theme-primary-darken-2-color);
    }
  }
`
