import React from 'react';
import { Route, Switch } from 'react-router-dom';

import MainUser from './MainUser';
import PromoUser from './PromoUser';
import SetupUser from './SetupUser';
import FinancesUser from './FinancesUser';

const RoutesUser = () => {
  return(
    <Switch>
      <Route exact path='/user' component={MainUser}/>
      <Route exact path='/user/promo' component={PromoUser}/>
      <Route exact path='/user/setup' component={SetupUser}/>
      <Route exact path='/user/finances' component={FinancesUser}/>
    </Switch>
  );
}

export default RoutesUser;