import React, { FC, useState } from 'react';
import { Keys } from '../../services/hooks/Keys';
import { useLocalStorage } from '../../services/hooks/useLocalStorage';
import Home from '../Home';
import Login from '../Login';

const Root: FC = () => {
  const { getLocalItem } = useLocalStorage();
  const [accountName] = useState(() => getLocalItem(Keys.accountName, ''));

  if (accountName.length === 0) {
    return <Login/>;
  } else {
    return <Home/>;
  }

};

export default Root;
