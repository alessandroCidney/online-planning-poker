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
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;

    padding: 0 30px;
    margin-bottom: 20px;
  }
`