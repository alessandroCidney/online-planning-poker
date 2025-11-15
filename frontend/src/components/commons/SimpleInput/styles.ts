import styled from 'styled-components'

export const StyledLabel = styled.label`
  display: block;

  position: relative;

  width: 100%;

  border-bottom: 2px solid #fff;

  &.filled {
    span {
      opacity: 0;
    }
  }

  span {
    display: block;

    position: absolute;

    color: #fff;
  }

  input {
    z-index: 2;

    display: block;

    position: relative;

    width: 100%;

    caret-color: #fff;
    color: #fff;
    
    background-color: transparent;

    border: none;

    &:focus {
      outline: none;
    }
  }
`