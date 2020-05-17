import React from 'react';
import { useSelector } from 'react-redux';

import CountryDetailsTitle from './CountryDetailsTitle';
import CountryDetailsList from './CountryDetailsList';

function CountryDetails({ country }) {

  const settingsStore = useSelector(state => state.settingsStore);
  const sounds = settingsStore ? settingsStore.sounds : { sounds: false };
  return (
    <div className="country-details flex-col">
      <CountryDetailsTitle country={country} sounds={sounds} />
      <CountryDetailsList country={country} />
    </div>
  );
}

export default CountryDetails;
