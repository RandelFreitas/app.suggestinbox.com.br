import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Suggest from './Suggests';
import Promo from './Promo';
import Menu from './Menu';
import Setup from './Setup';
import Finances from './Finances';

const RoutesUser = () => {
  return(
    <Switch>
      <Route exact path='/suggest' component={Suggest}/>
      <Route exact path='/suggest/promo' component={Promo}/>
      <Route exact path='/suggest/cardapio' component={Menu}/>
      <Route exact path='/suggest/setup' component={Setup}/>
      <Route exact path='/suggest/finances' component={Finances}/>
    </Switch>
  );
}

export default RoutesUser;