import React, { useState } from 'react';
import { AppBar } from '@material-ui/core';
import { useHistory } from 'react-router';
import { signOut } from '../../services/firebase/authentication';
import { paletteColors } from '../../styles/palette';
import { Keys } from '../../services/hooks/Keys';
import { Routes } from '../../routes';
import { useLocalStorage } from '../../services/hooks/useLocalStorage';
import { useSessionStorage } from '../../services/hooks/useSessionStorage';
import { ProjectNameText, LogoutButton } from './styles';

export const HeaderBar = () => {
  const history = useHistory();
  const { getLocalItem, clearLocalItems } = useLocalStorage();
  const { clearSession } = useSessionStorage();
  const [projectName] = useState(() => getLocalItem(Keys.projectName));

  const onClickLogout = () => {
    const isConfirmed = confirm('Are you sure to log out?');
    if (isConfirmed) {
      clearLocalItems();
      clearSession();
      signOut();
      history.replace(Routes.login);
    }
  };

  return (
    <AppBar position="static"
      style={{
        flexDirection: 'row-reverse',
        backgroundColor: paletteColors.deepDarkBlue,
      }}>
      <LogoutButton onClick={onClickLogout}>Log out</LogoutButton>
      {
        history.location.pathname === '/send_notification' ?
          (
            <ProjectNameText>{projectName}</ProjectNameText>
          )
          : null
      }
    </AppBar>
  );
};
