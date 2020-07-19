import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import Site from './Site';
import App from './pages';
 
const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Site}/>
      <Route path='/app' component={App}/>
    </Switch>
  </BrowserRouter>
);

export default Routes;