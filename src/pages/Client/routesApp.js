import React from 'react';
import { Route, Switch } from 'react-router-dom';

import MainUser from './MainUser';
import FormUser from './FormUser';
import MenuUser from './MenuUser';
import AtentionUser from './AtentionUser';
import AboutClient from './AboutClient';
import ConfirmUser from './ConfirmUser';

const RoutesApp = () => (
  <Switch>
    <Route exact path='/client' component={MainUser}/>
    <Route exact path='/client/opiniao' component={FormUser}/>
    <Route exact path='/client/opiniao/sucesso' component={ConfirmUser}/>
    <Route exact path='/client/atencao' component={AtentionUser}/>
    <Route exact path='/client/sobrenos' component={AboutClient}/>
    <Route exact poth='/client/cardapio' component={MenuUser}/>
  </Switch>
)

export default RoutesApp;