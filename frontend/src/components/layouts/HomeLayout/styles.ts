import styled from 'styled-components'

import cardBackground from '@/assets/images/backgrounds/card-background.jpg'

export const StyledHeader = styled.header`
  z-index: 2;

  position: absolute;
  top: 0;
  left: 0;

  padding: 20px;

  width: 100%;
  height: 80px;
`

export const StyledMain = styled.main`
  height: 100vh;
  width: 100vw;

  position: relative;

  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;

  background: url(${cardBackground});
`

export const StyledFooter = styled.footer`
  z-index: 2;
  
  position: absolute;
  bottom: 0;
  left: 0;

  padding: 20px;

  width: 100%;
  height: 50px;

  color: #fff;
  text-align: center;
  font-size: .7rem;
`
