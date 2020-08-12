import React from 'react';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import Adm from './pages/Client/Adm';

import Site from './Site';
import App from './pages/Client/User';
import Suggest from './pages/Suggest';
import { Login } from './components';

import { isAuthenticated } from './services/auth';
//import history from './services/history';

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
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Site}/>
      <Route path='/app' component={App}/>
      <Route path='/login' component={Login}/>
      <PrivateRoute path='/adm' component={Adm}/>
      <PrivateRoute path='/suggest' component={Suggest}/>
    </Switch>
  </BrowserRouter>
);

export default Routes;