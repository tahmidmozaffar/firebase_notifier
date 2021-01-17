import React, { FC } from 'react';
import { ButtonContainer, GoogleIcon, ButtonText } from './style';

type Props = {
  onClick: () => void;
  marginTop: number;
}

const GoogleLoginButton: FC<Props> = ({ onClick, marginTop }) => {
  return (
    <ButtonContainer style={{ marginTop: marginTop }} onClick={onClick}>
      <GoogleIcon/>
      <ButtonText>Sign in with google</ButtonText>
    </ButtonContainer>
  );
};

export default GoogleLoginButton;
