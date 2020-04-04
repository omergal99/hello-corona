import React, { useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import actions from '../store/actions';
import { WORLD_DASHBOARD } from '../constants/RouterPaths';

import WorldDashboardMap from '../cmps/worldDashboard/WorldDashboardMap';
import WorldDashboardList from '../cmps/worldDashboard/WorldDashboardList';
import WorldDashboardGlobalDetails from '../cmps/worldDashboard/WorldDashboardGlobalDetails';
import WorldDashboardDetails from '../cmps/worldDashboard/WorldDashboardDetails';

function WorldDashboard() {

  const countriesStore = useSelector(state => state.countriesStore);
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();

  useEffect(() => {
    if (!countriesStore || !params) return;
    const { countries, selectedCountryIndex } = countriesStore;
    const isSelectedCountry = selectedCountryIndex || selectedCountryIndex === 0;
    if (params.alpha2 && !isSelectedCountry) {
      const country = countries.find(country => country.alpha2 === params.alpha2);
      dispatch(actions.selectCountry(country));
    }
    if (!params.alpha2 && isSelectedCountry) {
      history.push(`/${WORLD_DASHBOARD}/${countries[selectedCountryIndex].alpha2}`);
    }
  }, [dispatch, countriesStore, params, history]);

  const selectCountry = country => {
    history.push(`/${WORLD_DASHBOARD}/${country.alpha2}`);
    dispatch(actions.selectCountry(country));
  }

  const selectedCountryIndex = countriesStore && countriesStore.selectedCountryIndex;
  const selectedCountry = selectedCountryIndex || selectedCountryIndex === 0
    ? countriesStore.countries[selectedCountryIndex] : {};
  return (
    <>{countriesStore && <>
      <div className="world-dashboard">
        <div className="wrap-global-and-list flex-col overflow-hidden">
          <WorldDashboardGlobalDetails globalData={countriesStore.globalData} />
          <WorldDashboardList countriesStore={countriesStore} onSelectCountry={selectCountry} />
        </div>
        <WorldDashboardMap countriesStore={countriesStore} onSelectCountry={selectCountry} />
        <WorldDashboardDetails selectedCountry={selectedCountry} />
      </div>
    </>}</>
  );
}

export default WorldDashboard;
