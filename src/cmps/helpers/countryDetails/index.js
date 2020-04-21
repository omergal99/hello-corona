import React from 'react';

import CountryDetailsTitle from './CountryDetailsTitle';
import CountryDetailsList from './CountryDetailsList';

function CountryDetails({ country }) {

  return (
    <div className="country-details flex-col">
      <CountryDetailsTitle country={country} />
      <CountryDetailsList country={country} />
    </div>
  );
}

export default CountryDetails;
