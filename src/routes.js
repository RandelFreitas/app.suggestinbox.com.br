import React from 'react';
import { Route, Switch, Redirect, Router } from 'react-router-dom';

import Site from './Site';
import Client from './pages/Client';
import User from './pages/User';
import Adm from './pages/Adm';
import { Login } from './components';

import { isAuthenticated } from './services/auth';
import history from './services/history';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
      )
    }
  />
);
 
const Routes = () => (
  <Router history={history}>
    <Switch>
      <Route exact path='/' component={Site}/>
      <Route exact path='/login' component={Login}/>
      <Route path='/client' component={Client}/>
      <PrivateRoute path='/user' component={User}/>
      <PrivateRoute path='/adm' component={Adm}/>
    </Switch>
  </Router>
);

export default Routes;