import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Suggest from './Suggests';
import Call from './Call';
import Promo from './Promo';
import Menu from './Menu';
import Finances from './Finances';
import Reservation from './Reservation';
import Delivery from './Delivery';
import SetupCompany from '../Companies/SetupCompany';

const RoutesUser = () => {
  return(
    <Switch>
      <Route exact path='/suggest' component={Suggest}/>
      <Route exact path='/suggest/call' component={Call}/>
      <Route exact path='/suggest/promo' component={Promo}/>
      <Route exact path='/suggest/cardapio' component={Menu}/>
      <Route exact path='/suggest/finances' component={Finances}/>
      <Route exact path='/suggest/reservation' component={Reservation}/>
      <Route exact path='/suggest/delivery' component={Delivery}/>
      <Route exact path='/suggest/setup-company' component={SetupCompany}/>
    </Switch>
  );
}

export default RoutesUser;