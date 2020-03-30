import React from 'react';

function WorldDashboardList({ countriesStore: { countries, selectedCountryIndex },
  onSelectCountry }) {
  const selectedCountry = selectedCountryIndex || selectedCountryIndex === 0 ? countries[selectedCountryIndex] : {};

  const list = countries.map(country => {
    const isSelected = country.name === selectedCountry.name ? 'selected' : '';
    return <li className={`country ${isSelected}`} key={country.id}
      onClick={() => onSelectCountry(country)}>
      <span>{country.name}</span>
    </li>
  })

  return (
    <div className="world-dashboard-list flex-col">
      <h3 className="selected-country-name">{selectedCountry.name || 'Select Country'}</h3>
      <ul className="countries">
        {list}
      </ul>
    </div>
  );
}

export default WorldDashboardList;
