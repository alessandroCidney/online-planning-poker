import styled from 'styled-components'

import { motion } from 'motion/react'

export const StyledLayoutContainer = styled.div`
  position: relative;

  width: 100vw;
  height: 100vh;

  overflow: hidden;
`

export const StyledRoomContent = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
`

export const StyledMain = styled(motion.main)`
  width: 100%;
  // 100% - header height
  height: calc(100% - 80px);
`
