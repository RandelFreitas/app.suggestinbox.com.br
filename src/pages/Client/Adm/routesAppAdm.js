import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import Login from '../../../components/Login';
import Main from './Main';
import Promo from './Promo';
import Setup from './Setup';

const RoutesAppAdm = () => {
  const match = useRouteMatch();

  return(
    <Switch>
      <Route exact path={`${match.url}`} component={Login}/>
      <Route exact path={`${match.url}/suggest`} component={Main}/>
      <Route exact path={`${match.url}/promo`} component={Promo}/>
      <Route exact path={`${match.url}/setup`} component={Setup}/>
    </Switch>
  );
}

export default RoutesAppAdm;