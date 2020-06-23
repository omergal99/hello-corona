import React, { useState } from 'react';
import FilterInput from '../helpers/FilterInput';
import WorldDashboardListItem from './WorldDashboardListItem';

function WorldDashboardList({ countriesStore: { countries, selectedCountryIndex },
  onSelectCountry }) {
  const selectedCountry = selectedCountryIndex || selectedCountryIndex === 0 ? countries[selectedCountryIndex] : {};

  const [filteredCountries, setFilteredCountries] = useState(countries.filter((item, idx) => idx < 40));
  const [isFiltered, setIsFiltered] = useState(false);
  const [isScroll, setIsScroll] = useState(false);

  const list = filteredCountries.map((country, idx) => {
    return (isScroll || isFiltered || idx < 10)
      ? <WorldDashboardListItem key={country.id} country={country} selectedCountry={selectedCountry}
        onSelectCountry={onSelectCountry} />
      : <li key={idx} style={{ height: '6.5rem' }}></li>
  })

  const handleScroll = ev => {
    setIsScroll(true);
    if (isFiltered) return;
    const scrollEnd = ev.target.scrollTop + 100 >= ev.target.scrollHeight - ev.target.clientHeight;
    if (scrollEnd) setFilteredCountries(countries);
  }

  const filterCountries = filteredList => {
    if (filteredList) {
      setFilteredCountries(filteredList);
      setIsFiltered(true);
    } else {
      setFilteredCountries(countries.filter((item, idx) => idx < 40));
    }
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
