import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import WorldDashboard from './pages/WorldDashboard';
import CountryView from './pages/CountryView';

import { WORLD_DASHBOARD, COUNTRY_VIEW, ALPHA2 } from './constants/RouterPaths';

function Router() {
  return (
    <HashRouter>
      <div className="router">
        <Switch>
          <Route exact path={`/${WORLD_DASHBOARD}`} component={WorldDashboard} />
          <Route exact path={`/${COUNTRY_VIEW}/:${ALPHA2}?`} component={CountryView} />
        </Switch>
      </div>
    </HashRouter>
  );
}

export default Router;
