import React from 'react';
import CountryDetails from '../helpers/countryDetails';

function CountryViewDetails({ selectedCountry }) {

  return (
    <div className="country-view-details flex-col">
      <CountryDetails country={selectedCountry} />
    </div>
  );
}

export default CountryViewDetails;
