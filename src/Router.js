import React, { useEffect, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import actions from './store/actions';

import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { WORLD_DASHBOARD, COUNTRY_VIEW, ALPHA2, SETTINGS, GRAPHS } from './constants/RouterPaths';

import NavBar from './cmps/NavBar';

// import WorldDashboard from './pages/WorldDashboard';
// import CountryView from './pages/CountryView';
// import Settings from './pages/Settings';

const WorldDashboard = React.lazy(() => import('./pages/WorldDashboard'));
const CountryView = React.lazy(() => import('./pages/CountryView'));
const Settings = React.lazy(() => import('./pages/Settings'));
const Graphs = React.lazy(() => import('./pages/Graphs'));


function Router({ onToggleFloatWindows }) {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.loadSettingsData());
    dispatch(actions.loadCountriesData());
  }, [dispatch]);

  return (
    <HashRouter>
      <NavBar onToggleFloatWindows={onToggleFloatWindows} />
      <Suspense fallback={<div className="router">Loading...</div>}>
        <div className="router">
          <Switch>
            <Redirect exact from="/" to={`/${WORLD_DASHBOARD}`} />
            <Route exact path={`/${WORLD_DASHBOARD}/:${ALPHA2}?`} component={WorldDashboard} />
            <Route exact path={`/${COUNTRY_VIEW}/:${ALPHA2}?`} component={CountryView} />
            <Route exact path={`/${SETTINGS}`} component={Settings} />
            <Route exact path={`/${GRAPHS}`} component={Graphs} />
          </Switch>
        </div>
      </Suspense>
    </HashRouter>
  );
}

export default Router;
