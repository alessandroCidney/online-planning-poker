import styled from 'styled-components'

import { motion } from 'motion/react'

export const StyledOverlayHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 20px;
  
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 80px;

  color: #fff;
`

export const StyledOverlay = styled(motion.div)`
  z-index: var(--base-overlay-z-index);

  display: flex;
  align-items: center;
  justify-content: center;
  
  position: fixed;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  background-color: rgb(0, 0, 0, .7);
  backdrop-filter: blur(5px);
`
