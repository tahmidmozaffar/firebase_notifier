import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Events, logEvent } from '../../services/logger';
import { signIn, signUp } from '../../services/firebase';
import { Keys } from '../../services/hooks/Keys';
import { Routes } from '../../routes';
import { useLocalStorage } from '../../services/hooks/useLocalStorage';
import {
  ButtonContainer,
  Container,
  TextButton,
  Title,
  InputBox
} from './styles';
import { SimpleButton } from '../../styles/commonStyles';

const Login = () => {
  const { setLocalItem, getLocalItem } = useLocalStorage();
  const history = useHistory();
  const [accountName, setAccountName] = useState(() => getLocalItem(Keys.accountName, ''));
  const [loginVisible, setLoginVisible] = useState(true);

  const onBtnClicked = () => {
    if (accountName.length === 0) {
      alert('Please enter account name');
      return;
    }

    if (!loginVisible) {

      signUp(accountName).then(({ success, message }) => {
        if (success) {
          const result = confirm(message);
          if (result) {
            setLocalItem(Keys.accountName, accountName);
            history.replace(Routes.home);
            logEvent(Events.Signup);
          }
        } else {
          alert(message);
          logEvent(Events.Signup_Failed);
        }
      }).catch(() => {
        logEvent(Events.Signup_Failed);
        alert('Something went wrong. We could not create the account.');
      });

    } else {

      signIn(accountName).then(({ success, message }) => {
        if (success) {
          setLocalItem(Keys.accountName, accountName);
          history.replace(Routes.home);
          logEvent(Events.Login);
        } else {
          alert(message);
          logEvent(Events.Login_Failed);
        }
      }).catch(() => {
        logEvent(Events.Login_Failed);
        alert('Something went wrong. Please try again later');
      });

    }
  };

  useEffect(() => {
    if (accountName.length !== 0) {
      history.push(Routes.root);
    }
  }, []);

  return (
    <Container>
      <Title>Firebase Notifier</Title>
      <InputBox
        label="Account Name" value={accountName}
        onChange={(evt) => setAccountName(evt.target.value)} />
      {
        loginVisible ? (
          <ButtonContainer>
            <SimpleButton name="Login" onClick={onBtnClicked}>
              Login
            </SimpleButton>
            <TextButton onClick={() => setLoginVisible(false)}>
              Don't have an account yet? Click here.
            </TextButton>
          </ButtonContainer>
        ) : (
          <ButtonContainer>
            <SimpleButton name="Sign up" onClick={onBtnClicked}>
              Sign up
            </SimpleButton>
            <TextButton onClick={() => setLoginVisible(true)}>
              Existing user? Click here.
            </TextButton>
          </ButtonContainer>
        )
      }

    </Container>

  );
};

export default Login;
