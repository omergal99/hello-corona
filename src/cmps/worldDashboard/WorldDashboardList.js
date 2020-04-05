import React, { useState } from 'react';
import FilterInput from '../helpers/FilterInput';

function WorldDashboardList({ countriesStore: { countries, selectedCountryIndex },
  onSelectCountry }) {
  const selectedCountry = selectedCountryIndex || selectedCountryIndex === 0 ? countries[selectedCountryIndex] : {};

  const [filteredCountries, setFilteredCountries] = useState(countries);

  const list = filteredCountries.map(country => {
    const isSelected = country.name === selectedCountry.name ? 'selected' : '';
    let src = '';
    try { src = require(`../../assets/img/flags/${country.alpha2.toLowerCase()}.png`); }
    catch (err) { }
    return <li className={`country ${isSelected}`} key={country.id}
      onClick={() => onSelectCountry(country)}>
      <span className="country-name">{country.name}</span>
      <div className="wrap-country-flag">
      <img className="country-flag" src={src} alt="Flag" />
      </div>
    </li>
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
