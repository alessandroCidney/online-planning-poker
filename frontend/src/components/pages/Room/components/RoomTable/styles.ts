import styled from 'styled-components'

export const StyledTableContainer = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  height: calc(100% - 80px - 200px);
`

export const StyledTable = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 820px;
  height: 440px;
  
  background-color: #f1f1f1;

  border-radius: 50%;
`

interface StyledCircleProps {
  $translateX: number
  $translateY: number
}

export const StyledCircle = styled.div<StyledCircleProps>`
  position: absolute;

  width: 70px;
  height: 70px;

  border-radius: 50%;

  background-color: var(--theme-primary-color);

  transform: translate(${props => props.$translateX ? `${props.$translateX}px` : '0px'}, ${props => props.$translateY ? `${props.$translateY}px` : '0px'});
`
