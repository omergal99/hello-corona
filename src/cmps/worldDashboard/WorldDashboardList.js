import React, { useState } from 'react';
import FilterInput from '../helpers/FilterInput';
import WorldDashboardListItem from './WorldDashboardListItem';

function WorldDashboardList({ countriesStore: { countries, selectedCountryIndex },
  onSelectCountry }) {
  const selectedCountry = selectedCountryIndex || selectedCountryIndex === 0 ? countries[selectedCountryIndex] : {};

  const [filteredCountries, setFilteredCountries] = useState(countries.filter((c, idx) => idx < 40));

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
        <li className="load-more" onClick={() => setFilteredCountries(countries)}>
          <h3>Load More</h3>
        </li>
      </ul>
    </div>
  );
}

export default WorldDashboardList;
