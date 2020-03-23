import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';

import NavBar from './cmps/NavBar';

import WorldDashboard from './pages/WorldDashboard';
import CountryView from './pages/CountryView';
import TableData from './pages/TableData';

import { WORLD_DASHBOARD, COUNTRY_VIEW, ALPHA2,TABLE_DATA } from './constants/RouterPaths';

function Router() {
  return (
    <HashRouter>
      <NavBar />
      <div className="router">
        <Switch>
          <Redirect exact from="/" to={`/${WORLD_DASHBOARD}`} />
          <Route exact path={`/${WORLD_DASHBOARD}`} component={WorldDashboard} />
          <Route exact path={`/${COUNTRY_VIEW}/:${ALPHA2}?`} component={CountryView} />
          <Route exact path={`/${TABLE_DATA}`} component={TableData} />
        </Switch>
      </div>
    </HashRouter>
  );
}

export default Router;
