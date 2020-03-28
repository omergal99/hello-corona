import React from 'react';
import CountryViewListItem from './CountryViewListItem';

function CountryViewList({ countriesStore: { countries, selectedCountryIndex },
  onSelectCountry }) {

  console.log('222222');
  const selectedCountry = selectedCountryIndex || selectedCountryIndex === 0 ? countries[selectedCountryIndex] : {};

  const list = countries.map(country => (
    <CountryViewListItem key={country.name} country={country} selectedCountry={selectedCountry}
      onSelectCountry={onSelectCountry} />
  ))

  return (
    <ul className="country-view-list">
      {list}
    </ul>
  );
}

export default CountryViewList;
