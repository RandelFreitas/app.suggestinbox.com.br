import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import MainUser from './MainUser';
import FormUser from './FormUser';
import MenuUser from './MenuUser';
import AtentionUser from './AtentionUser';
import AboutUser from './AboutUser';
import ConfirmUser from './ConfirmUser';

const RoutesApp = () => {
  const match = useRouteMatch();

  return(
    <Switch>
      <Route exact path={`${match.url}`} component={MainUser}/>
      <Route exact path={`${match.url}/opiniao`} component={FormUser}/>
      <Route exact path={`${match.url}/opiniao/sucesso`} component={ConfirmUser}/>
      <Route exact path={`${match.url}/atencao`} component={AtentionUser}/>
      <Route exact path={`${match.url}/sobrenos`} component={AboutUser}/>
      <Route exact poth={`${match.url}/cardapio`} component={MenuUser}/>
    </Switch>
  );
}

export default RoutesApp;