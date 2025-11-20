import styled from 'styled-components'

interface StyledImageContainerProps {
  $backgroundImage?: string
}

export const StyledImgContainer = styled.div<StyledImageContainerProps>`
  display: block;

  width: 50px;
  height: 50px;

  border-radius: 50%;

  background-image: ${props => `url('${props.$backgroundImage}')`};
  background-size: 100%;
  background-position: center 67px;
`