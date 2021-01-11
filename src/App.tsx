import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { theme } from './styles/theme';
import { ThemeProvider } from 'styled-components';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Routes } from './routes';
import Home from './screens/Home';
import Login from './screens/Login';
import NotificationForm from './screens/NotificationForm';
import Root from './screens/Root';

const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <div className="Container">
        <Router>
          <Switch>
            <Route exact path={Routes.root} component={Root}/>
            <Route exact path={Routes.login} component={Login}/>
            <ProtectedRoute exact path={Routes.home} component={Home}/>
            <ProtectedRoute exact path={Routes.notificationForm}
              component={NotificationForm}/>
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
};

export default App;
