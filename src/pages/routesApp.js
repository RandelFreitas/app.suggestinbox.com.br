import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import { MainUser, FormUser, MenuUser, AtentionUser, AboutUser } from './Client/User';

const RoutesApp = () => {
  const match = useRouteMatch();

  return(
    <Switch>
      <Route exact path={`${match.url}`} component={MainUser}/>
      <Route exact path={`${match.url}/sugestao`} component={FormUser}/>
      <Route exact path={`${match.url}/atencao`} component={AtentionUser}/>
      <Route exact path={`${match.url}/sobrenos`} component={AboutUser}/>
      <Route exact poth={`${match.url}/cardapio`} component={MenuUser}/>
    </Switch>
  );
}

export default RoutesApp;