import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

const RoutesAppSuggest = () => {
  const match = useRouteMatch();

  return(
    <Switch>
      <Route exact path={`${match.url}`} component={()=><h1>SUGGEST</h1>}/>
    </Switch>
  );
}

export default RoutesAppSuggest;