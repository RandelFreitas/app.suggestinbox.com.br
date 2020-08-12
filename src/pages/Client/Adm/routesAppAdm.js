import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Main from './Main';
import Promo from './Promo';
import Setup from './Setup';

const RoutesAppAdm = () => {
  return(
    <Switch>
      <Route exact path='/adm' component={Main}/>
      <Route exact path='/adm/promo' component={Promo}/>
      <Route exact path='/adm/setup' component={Setup}/>
    </Switch>
  );
}

export default RoutesAppAdm;