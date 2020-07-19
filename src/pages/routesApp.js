import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import { MainUser, FormUser } from './Client/User';

const RoutesApp = () => {
  const match = useRouteMatch();

  return(
    <Switch>
      <Route exact path={`${match.url}`} component={MainUser}/>
      <Route exact path={`${match.url}/sugestao`} component={FormUser}/>
      <Route exact path={`${match.url}/atencao`} component={()=><h2>Atenção</h2>}/>
      <Route exact poth={`${match.url}/cardapio`} component={()=><h2>Cardapio</h2>}/>
    </Switch>
  );
}

export default RoutesApp;