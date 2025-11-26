import styled from 'styled-components'

interface StyledImageContainerProps {
  $size?: string
}

export const StyledImgContainer = styled.div<StyledImageContainerProps>`
  display: block;

  position: relative;

  width: ${props => props.$size || '50px'};
  height: ${props => props.$size || '50px'};

  overflow: hidden;

  border-radius: 50%;

  &.user-avatar--bordered {
    border: 2px solid #fff;
    outline: 2px solid #000;
  }

  &.user-avatar--disabled {
    filter: saturate(0);
  }

  img {
    width: 100%;
    
    position: absolute;
    left: 0;
    top: 0;

    transform: translateY(calc(-1 * ${props => props.$size || '50px'} * 0.14));
  }
`