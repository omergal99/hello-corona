import React from 'react';

function CountryViewListItem({ country, selectedCountry,
  onSelectCountry }) {

  const isSelected = country.name === selectedCountry.name ? 'selected' : '';
  return (
    <li className={`country-preview ${isSelected}`}
      onClick={() => onSelectCountry(country)}>
      <div>
        <span>{country.name}</span>
      </div>
      <div>
        <span>Cases: </span>
        <span>{country.cases}</span>
      </div>
      <div>
        <span>Deaths: </span>
        <span>{country.deaths}</span>
      </div>
      <div>
        <span>Recovered: </span>
        <span>{country.recovered}</span>
      </div>
    </li>
  );
}

export default CountryViewListItem;
