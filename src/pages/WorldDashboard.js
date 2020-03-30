import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import actions from '../store/actions';

import WorldDashboardMap from '../cmps/worldDashboard/WorldDashboardMap';
import WorldDashboardList from '../cmps/worldDashboard/WorldDashboardList';
import WorldDashboardGlobalDetails from '../cmps/worldDashboard/WorldDashboardGlobalDetails';
import WorldDashboardDetails from '../cmps/worldDashboard/WorldDashboardDetails';

function WorldDashboard() {

  const dispatch = useDispatch();
  const countriesStore = useSelector(state => state.countriesStore);

  const selectCountry = country => {
    dispatch(actions.selectCountry(country));
  }

  const selectedCountryIndex = countriesStore && countriesStore.selectedCountryIndex;
  const selectedCountry = selectedCountryIndex || selectedCountryIndex === 0
    ? countriesStore.countries[selectedCountryIndex] : {};
  return (
    <>{countriesStore && <>
      <div className="world-dashboard">
        <div className="wrap-global-and-list flex-col overflow-hidden">
          <WorldDashboardGlobalDetails allCountriesData={countriesStore.allCountriesData} />
          <WorldDashboardList countriesStore={countriesStore} onSelectCountry={selectCountry} />
        </div>
        <WorldDashboardMap countriesStore={countriesStore} onSelectCountry={selectCountry} />
        <WorldDashboardDetails selectedCountry={selectedCountry} />
      </div>
    </>}</>
  );
}

export default WorldDashboard;
