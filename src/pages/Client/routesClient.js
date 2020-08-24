import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import MainClient from './MainClient';
import FormClient from './FormClient';
import MenuClient from './MenuClient';
import AtentionClient from './AtentionClient';
import AboutClient from './AboutClient';
import ConfirmClient from './ConfirmClient';

const RoutesApp = () => (
  <Switch>
    <Route exact path='/client' component={MainClient}/>
    <Route exact path='/client/opiniao' component={FormClient}/>
    <Route exact path='/client/opiniao/sucesso' component={ConfirmClient}/>
    <Route exact path='/client/atencao' component={AtentionClient}/>
    <Route exact path='/client/sobrenos' component={AboutClient}/>
    <Route exact poth='/client/cardapio' component={MenuClient}/>
  </Switch>
)

export default RoutesApp;