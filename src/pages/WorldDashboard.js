import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import actions from '../store/actions';

import WorldDashboardMap from '../cmps/worldDashboard/WorldDashboardMap';
import WorldDashboardList from '../cmps/worldDashboard/WorldDashboardList';
import WorldDashboardPreDetails from '../cmps/worldDashboard/WorldDashboardPreDetails';
import WorldDashboardDetails from '../cmps/worldDashboard/WorldDashboardDetails';

function WorldDashboard() {

  const dispatch = useDispatch();
  const countriesStore = useSelector(state => state.countriesStore);

  const selectCountry = country => {
    dispatch(actions.selectCountry(country));
  }

  return (
    <>{countriesStore && <>
      <div className="world-dashboard">
        <div>
          <WorldDashboardPreDetails />
          <WorldDashboardDetails />
        </div>
        <WorldDashboardMap countriesStore={countriesStore} />
        <WorldDashboardList />
      </div>
    </>}</>
  );
}

export default WorldDashboard;
