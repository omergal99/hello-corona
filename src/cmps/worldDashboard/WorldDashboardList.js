import React, { useState } from 'react';
import FilterInput from '../helpers/FilterInput';
import WorldDashboardListItem from './WorldDashboardListItem';

function WorldDashboardList({ countriesStore: { countries, selectedCountryIndex },
  onSelectCountry }) {
  const selectedCountry = selectedCountryIndex || selectedCountryIndex === 0 ? countries[selectedCountryIndex] : {};

  const [filteredCountries, setFilteredCountries] = useState(countries.filter((c, idx) => idx < 40));
  const [isFiltered, setIsFiltered] = useState(false);

  const list = filteredCountries.map((country, idx) => {
    return <WorldDashboardListItem key={country.id} country={country} idx={idx}
      selectedCountry={selectedCountry}
      onSelectCountry={onSelectCountry} />
  })

  const handleScroll = ev => {
    if (isFiltered) return;
    const scrollEnd = ev.target.scrollTop + 100 >= ev.target.scrollHeight - ev.target.clientHeight;
    if (scrollEnd) setFilteredCountries(countries);
  }

  const filterCountries = filteredList => {
    setFilteredCountries(filteredList);
    setIsFiltered(true);
  }

  return (
    <div className="world-dashboard-list flex-col">
      <div className="custom-filter-input">
        <FilterInput list={countries} filterKeys={['name']} placeholder="Search Country"
          onFilter={filterCountries} />
      </div>
      <ul className="countries" onScroll={handleScroll}>
        {list}
      </ul>
    </div>
  );
}

export default WorldDashboardList;
