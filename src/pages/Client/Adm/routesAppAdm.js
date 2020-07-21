import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

const RoutesAppAdm = () => {
  const match = useRouteMatch();

  return(
    <Switch>
      <Route exact path={`${match.url}`} component={()=><h1>ADM</h1>}/>
    </Switch>
  );
}

export default RoutesAppAdm;