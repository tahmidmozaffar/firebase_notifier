import styled from 'styled-components';

export const ButtonContainer = styled.div`
  display: flex;
  background: white;
  color: #444;
  width: 250px;
  border-radius: 5px;
  white-space: nowrap;
  transition: 0.3s;
  cursor: pointer;

  :hover {
    background-color: lightgray;
  }
`;

export const GoogleIcon = styled.img.attrs({
  src: 'https://firebasestorage.googleapis.com/v0/b/smart-firebase-notifier.appspot.com/o/googleicon.png?alt=media&token=8bad582a-d2bf-4f73-b76c-5caae22c0226',
})`
  width: 30px;
  height: 30px;
  margin: 5px;
  padding-left: 5px;
`;

export const ButtonText = styled.span`
  align-content: center;
  //padding-left: 42px;
  //padding-right: 42px;
  font-size: 16px;
  font-weight: bold;
  /* Use the Roboto font that is loaded in the <head> */
  font-family: 'Roboto', sans-serif;
  align-self: center;
  justify-self: center;
  margin: auto;
`;
