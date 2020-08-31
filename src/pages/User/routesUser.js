import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Companies from './Companies';
import SetupUser from './SetupUser';

const RoutesUser = () => {
  return(
    <Switch>
      <Route exact path='/user' component={Companies}/>
      <Route exact path='/user/setup' component={SetupUser}/>
    </Switch>
  );
}

export default RoutesUser;