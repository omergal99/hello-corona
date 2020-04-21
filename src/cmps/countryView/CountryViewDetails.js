import React from 'react';
import CountryDetails from '../helpers/countryDetails';

function CountryViewDetails({ selectedCountry, worldData }) {

  const country = selectedCountry.alpha2 ? selectedCountry : worldData;
  return (
    <div className="country-view-details flex-col">
      <CountryDetails country={country} />
    </div>
  );
}

export default CountryViewDetails;
