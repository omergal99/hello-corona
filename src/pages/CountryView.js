import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import actions from '../store/actions';

import CountryViewList from '../cmps/countryView/CountryViewList';
import CountryViewPresentation from '../cmps/countryView/CountryViewPresentation';
import CountryViewDetails from '../cmps/countryView/CountryViewDetails';
import CountryViewBottom from '../cmps/countryView/CountryViewBottom';



function CountryView() {

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
