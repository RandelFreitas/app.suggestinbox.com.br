import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Companies from './Companies';
import SetupUser from './SetupUser';
import SetupCompany from './SetupCompany';

const RoutesUser = () => {
  return(
    <Switch>
      <Route exact path='/user' component={Companies}/>
      <Route exact path='/user/setup' component={SetupUser}/>
      <Route exact path='/user/setup-company' component={SetupCompany}/>
    </Switch>
  );
}

export default RoutesUser;