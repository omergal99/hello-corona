import React from 'react';
import { useSelector } from 'react-redux';

import CountryViewList from '../cmps/countryView/CountryViewList';
import CountryViewPresentation from '../cmps/countryView/CountryViewPresentation';
import CountryViewDetails from '../cmps/countryView/CountryViewDetails';

function CountryView() {

  const countriesStore = useSelector(state => state.countriesStore);

  return (
    <div className="country-view">
      {countriesStore && <>
        <CountryViewList countries={countriesStore.countries} />
        <CountryViewPresentation />
        <CountryViewDetails />
      </>}
    </div>
  );
}

export default CountryView;
