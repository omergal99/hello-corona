import React, { useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import actions from '../store/actions';
import { WORLD_DASHBOARD } from '../constants/RouterPaths';

import WorldDashboardMap from '../cmps/worldDashboard/WorldDashboardMap';
import WorldDashboardList from '../cmps/worldDashboard/WorldDashboardList';
import WorldDashboardWorldData from '../cmps/worldDashboard/WorldDashboardWorldData';
import WorldDashboardDetails from '../cmps/worldDashboard/WorldDashboardDetails';

function WorldDashboard() {

  const countriesStore = useSelector(state => state.countriesStore);
  const settingsStore = useSelector(state => state.settingsStore);

  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();

  useEffect(() => {
    if (!countriesStore) return;
    const { countries, selectedCountryIndex } = countriesStore;
    const isSelectedCountry = selectedCountryIndex || selectedCountryIndex === 0;
    const isParamsInUrlWithCountry = params.alpha2 && !isSelectedCountry;
    if (isParamsInUrlWithCountry) {
      const country = countries.find(country => country.alpha2 === params.alpha2);
      dispatch(actions.selectCountry(country));
    }
    const isUrlCmpUnmount = !params.alpha2 && isSelectedCountry;
    if (isUrlCmpUnmount) {
      history.push(`/${WORLD_DASHBOARD}/${countries[selectedCountryIndex].alpha2}`);
    }
  }, [dispatch, countriesStore, params, history]);

  const selectCountry = country => {
    const alpha2ToPush = country.alpha2 !== selectedCountry.alpha2 ? country.alpha2 : '';
    history.push(`/${WORLD_DASHBOARD}/${alpha2ToPush}`);
    dispatch(actions.selectCountry(country));
  }

  const toggleIsCirclesShow = () => dispatch(actions.toggleIsCirclesShow());
  const toggleIsAutoFocus = () => dispatch(actions.toggleIsAutoFocus());


  const selectedCountryIndex = countriesStore && countriesStore.selectedCountryIndex;
  const selectedCountry = selectedCountryIndex || selectedCountryIndex === 0
    ? countriesStore.countries[selectedCountryIndex]
    : countriesStore ? countriesStore.worldData : {};
  return (
    <>{countriesStore && settingsStore && <>
      <div className="world-dashboard">
        <div className="wrap-global-and-list flex-col overflow-hidden">
          <WorldDashboardWorldData worldData={countriesStore.worldData} />
          <WorldDashboardList countriesStore={countriesStore} onSelectCountry={selectCountry} />
        </div>
        <WorldDashboardMap countriesStore={countriesStore} settings={settingsStore.worldMap}
          onSelectCountry={selectCountry} onToggleIsCirclesShow={toggleIsCirclesShow}
          onToggleIsAutoFocus={toggleIsAutoFocus} />
        <WorldDashboardDetails selectedCountry={selectedCountry} />
      </div>
    </>}</>
  );
}

export default WorldDashboard;
