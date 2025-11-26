import styled from 'styled-components'

export const StyledUserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;

  margin-bottom: 10px;

  width: 100%;
  height: 60px;

  color: black;

  > div.user-data-text {
    // 100% - avatar width - gap
    width: calc(100% - 50px - 10px);

    div {
      max-width: 100%;
    
      overflow: hidden;

      text-overflow: ellipsis;
    }
  }
`

export const StyledSignOutDialogActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;

  button {
    min-width: 150px;
  }

  @media (max-width: 600px) {
    justify-content: center;
    flex-direction: column-reverse;

    button {
      min-height: auto;
      width: 100%;
    }
  }
`
