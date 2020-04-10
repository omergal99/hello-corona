import React, { useState } from 'react';
import FilterInput from '../helpers/FilterInput';
import WorldDashboardListItem from './WorldDashboardListItem';

function WorldDashboardList({ countriesStore: { countries, selectedCountryIndex },
  onSelectCountry }) {
  const selectedCountry = selectedCountryIndex || selectedCountryIndex === 0 ? countries[selectedCountryIndex] : {};

  const [filteredCountries, setFilteredCountries] = useState(countries);

  const list = filteredCountries.map((country, idx) => {
    return <WorldDashboardListItem key={country.id} country={country} idx={idx}
      selectedCountry={selectedCountry}
      onSelectCountry={onSelectCountry} />
  })

  return (
    <div className="world-dashboard-list flex-col">
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

export default WorldDashboardList;
