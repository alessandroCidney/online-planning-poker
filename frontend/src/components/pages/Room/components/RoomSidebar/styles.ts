import styled from 'styled-components'

export const StyledAside = styled.aside`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;

  width: 500px;
  height: 100%;

  padding-top: 30px;

  color: #fff;

  background-color: var(--theme-primary-color);

  > header {
    width: 100%;

    padding: 0 30px;
    margin-bottom: 20px;
  }
`

export const StyledContentContainer = styled.section`
  width: 100%;

  flex: 1 1 0;

  overflow: auto;

  padding: 0 30px;
`

export const StyledContentActions = styled.div`
  z-index: 2;
  
  position: sticky;

  top: 0;

  padding-bottom: 20px;

  background-color: var(--theme-primary-color);
`

export const StyledUsList = styled.div`
  width: 100%;
`
