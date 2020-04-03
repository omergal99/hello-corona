import React, { useState } from 'react';

import CountryViewListItem from './CountryViewListItem';
import FilterInput from '../helpers/FilterInput';

function CountryViewList({ countriesStore: { countries, selectedCountryIndex },
  onSelectCountry }) {
  const selectedCountry = selectedCountryIndex || selectedCountryIndex === 0 ? countries[selectedCountryIndex] : {};

  const [filteredCountries, setFilteredCountries] = useState(countries);

  const list = filteredCountries.map(country => (
    <CountryViewListItem key={country.name} country={country} selectedCountry={selectedCountry}
      onSelectCountry={onSelectCountry} />
  ))

  return (
    <div className="country-view-list flex-col">
      <div className="custom-filter-input">
        <FilterInput list={countries} filterKeys={['name']} placeholder="Search Country"
          onFilter={setFilteredCountries} />
      </div>
      <ul className="countries">
        {list}
      </ul>
    </div>
  );
}

export default CountryViewList;
