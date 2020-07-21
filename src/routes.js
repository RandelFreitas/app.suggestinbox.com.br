import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Adm from './pages/Client/Adm';

import Site from './Site';
import App from './pages/Client/User';
import Suggest from './pages/Suggest';
 
const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Site}/>
      <Route path='/app' component={App}/>
      <Route path='/adm' component={Adm}/>
      <Route path='/suggest' component={Suggest}/>
    </Switch>
  </BrowserRouter>
);

export default Routes;