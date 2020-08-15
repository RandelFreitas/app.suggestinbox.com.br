import React from 'react';
import { Route, Switch } from 'react-router-dom';

import MainUser from './MainUser';
import FormUser from './FormUser';
import MenuUser from './MenuUser';
import AtentionUser from './AtentionUser';
import AboutUser from './AboutUser';
import ConfirmUser from './ConfirmUser';

const RoutesApp = () => (
  <Switch>
    <Route exact path='/app' component={MainUser}/>
    <Route exact path='/app/opiniao' component={FormUser}/>
    <Route exact path='/app/opiniao/sucesso' component={ConfirmUser}/>
    <Route exact path='/app/atencao' component={AtentionUser}/>
    <Route exact path='/app/sobrenos' component={AboutUser}/>
    <Route exact poth='/app/cardapio' component={MenuUser}/>
  </Switch>
)

export default RoutesApp;