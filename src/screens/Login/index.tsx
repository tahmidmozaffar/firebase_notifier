import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import GoogleLoginButton from '../../components/GoogleLoginButton';
import { Events, logEvent } from '../../services/logger';
import {
  signInWithEmailPassword, signInWithGoogle,
  signUpWithEmailPassword,
} from '../../services/firebase/authentication';
import { Keys } from '../../services/hooks/Keys';
import { Routes } from '../../routes';
import { useLocalStorage } from '../../services/hooks/useLocalStorage';
import {
  ButtonContainer,
  Container,
  TextButton,
  Title,
  InputBox,
} from './styles';
import { SimpleButton } from '../../styles/commonStyles';

const Login = () => {
  const { setLocalItem, getLocalItem } = useLocalStorage();
  const [userId] = useState(() => getLocalItem(Keys.userId));
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginVisible, setLoginVisible] = useState(true);

  const onBtnClicked = () => {

    if (email.length === 0 || password.length === 0) {
      alert('Please enter email and password');
      return;
    }

    if (!loginVisible) {
      signUpWithEmailPassword(email, password, (userId, error) => {
        if (userId) {
          setLocalItem(Keys.userId, userId);
          history.replace(Routes.home);
          logEvent(Events.Signup);
        } else {
          alert(error);
          console.log(error);
          logEvent(Events.Signup_Failed);
        }
      });

    } else {
      signInWithEmailPassword(email, password, (userId, error) => {
        if (userId) {
          setLocalItem(Keys.userId, userId);
          history.replace(Routes.home);
          logEvent(Events.Login);
        } else {
          alert(error);
          logEvent(Events.Login_Failed);
          console.log('error', error);
        }
      });
    }
  };

  const onGoogleLoginBtnClicked = () => {
    signInWithGoogle((userId, error) => {
      if (userId) {
        setLocalItem(Keys.userId, userId);
        history.replace(Routes.home);
        logEvent(Events.Login);
      } else {
        alert(error);
        logEvent(Events.Login_Failed);
        console.log('error', error);
      }
    });
  };

  useEffect(() => {
    logEvent(Events.Login_Page);
    if (userId.length !== 0) {
      history.push(Routes.root);
    }
  }, []);

  return (
    <Container>
      <Title>Firebase Notifier</Title>
      <InputBox
        label="Email" value={email}
        onChange={(evt) => setEmail(evt.target.value)}/>
      <InputBox
        label="Password" value={password} type='password'
        onChange={(evt) => setPassword(evt.target.value)}/>
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
      <GoogleLoginButton onClick={onGoogleLoginBtnClicked} marginTop={30}/>
    </Container>
  );
};

export default Login;
