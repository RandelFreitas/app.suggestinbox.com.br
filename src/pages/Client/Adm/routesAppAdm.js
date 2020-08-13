import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Main from './Main';
import Promo from './Promo';
import Setup from './Setup';
import Finances from './Finances';

const RoutesAppAdm = () => {
  return(
    <Switch>
      <Route exact path='/adm' component={Main}/>
      <Route exact path='/adm/promo' component={Promo}/>
      <Route exact path='/adm/setup' component={Setup}/>
      <Route exact path='/adm/finances' component={Finances}/>
    </Switch>
  );
}

export default RoutesAppAdm;