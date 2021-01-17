import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Keys } from '../services/hooks/Keys';
import { useLocalStorage } from '../services/hooks/useLocalStorage';
import { Routes } from '../routes';

export const ProtectedRoute = ({ ...props }) => {
  const { getLocalItem } = useLocalStorage();
  const userId = getLocalItem(Keys.userId);

  if (userId.length === 0) {
    return <Redirect to={Routes.root}/>;
  }

  return (
    <Route {...props} />
  );

};
