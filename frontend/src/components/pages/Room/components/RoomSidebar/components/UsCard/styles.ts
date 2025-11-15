import styled from 'styled-components'

export const StyledCardContainer = styled.article`
  position: relative;

  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  
  background-color: var(--theme-primary-lighten-1-color);

  border-radius: 24px;

  width: 100%;
  aspect-ratio: 2 / 1;

  margin-bottom: 20px;
`

export const StyledHeader = styled.header`
  padding: 20px;

  font-size: 1.2rem;
`

export const StyledCardActions = styled.div`
  position: relative;
  
  flex: 1 1 0;

  width: 100%;

  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  
  padding: 10px;
`
