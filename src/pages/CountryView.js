import React, { useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import actions from '../store/actions';
import { COUNTRY_VIEW } from '../constants/RouterPaths';

import CountryViewList from '../cmps/countryView/CountryViewList';
import CountryViewPresentation from '../cmps/countryView/CountryViewPresentation';
import CountryViewDetails from '../cmps/countryView/CountryViewDetails';
import CountryViewBottom from '../cmps/countryView/CountryViewBottom';

function CountryView() {

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
      history.push(`/${COUNTRY_VIEW}/${countries[selectedCountryIndex].alpha2}`);
    }
  }, [dispatch, countriesStore, params, history]);

  const selectCountry = country => {
    const alpha2ToPush = country.alpha2 === selectedCountry.alpha2 ? '' : country.alpha2;
    history.push(`/${COUNTRY_VIEW}/${alpha2ToPush}`);
    dispatch(actions.selectCountry(country));
  }

  const selectedCountryIndex = countriesStore && countriesStore.selectedCountryIndex;
  const selectedCountry = selectedCountryIndex || selectedCountryIndex === 0
    ? countriesStore.countries[selectedCountryIndex] : {};
  return (
    <>{countriesStore && <>
      <div className="country-view">
        <CountryViewList countriesStore={countriesStore} onSelectCountry={selectCountry} />
        <CountryViewPresentation selectedCountry={selectedCountry} />
        <CountryViewDetails selectedCountry={selectedCountry} />
        <CountryViewBottom />
      </div>
    </>}</>
  );
}

export default CountryView;
