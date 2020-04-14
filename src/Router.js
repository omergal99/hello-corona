import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import actions from './store/actions';

import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';

import NavBar from './cmps/NavBar';

import WorldDashboard from './pages/WorldDashboard';
import CountryView from './pages/CountryView';
import Settings from './pages/Settings';

import { WORLD_DASHBOARD, COUNTRY_VIEW, ALPHA2, SETTINGS } from './constants/RouterPaths';

function Router({ onToggleFloatWindows }) {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.loadSettingsData());
    dispatch(actions.loadCountriesData());
  }, [dispatch]);

  return (
    <HashRouter>
      <NavBar onToggleFloatWindows={onToggleFloatWindows} />
      <div className="router">
        <Switch>
          <Redirect exact from="/" to={`/${WORLD_DASHBOARD}`} />
          <Route exact path={`/${WORLD_DASHBOARD}/:${ALPHA2}?`} component={WorldDashboard} />
          <Route exact path={`/${COUNTRY_VIEW}/:${ALPHA2}?`} component={CountryView} />
          <Route exact path={`/${SETTINGS}`} component={Settings} />
        </Switch>
      </div>
    </HashRouter>
  );
}

export default Router;
