import React, { useState } from 'react';
import FilterInput from '../helpers/FilterInput';
import UtilsService from '../../services/UtilsService';

import VirusSVG from '../helpers/svg-icons/VirusSVG';
function WorldDashboardList({ countriesStore: { countries, selectedCountryIndex },
  onSelectCountry }) {
  const selectedCountry = selectedCountryIndex || selectedCountryIndex === 0 ? countries[selectedCountryIndex] : {};

  const [filteredCountries, setFilteredCountries] = useState(countries);

  const caterogies = [
    { title: 'Cases', key: 'cases' },
    { title: 'Deaths', key: 'deaths' },
    { title: 'Recovered', key: 'recovered' },
    { title: 'Critical', key: 'critical' },
  ]

  const list = filteredCountries.map((country, idx) => {
    const isSelected = country.name === selectedCountry.name ? 'selected' : '';
    const src = UtilsService.getImgSrc(`flags/${country.alpha2.toLowerCase()}.png`);
    const categoryView = caterogies.map(category => {
      return <div className="category flex-col" key={category.key}>
        <span className="title" title={category.title}>{category.title}</span>
        <span className="value" title={country[category.key]}>{country[category.key]}</span>
      </div>
    })
    return <li className={`country ${isSelected}`} key={country.id} onClick={() => onSelectCountry(country)}>
      <span className="numeric-code" title="Numeric Code">N-C {country.numericCode}</span>

      <div className="top-section">
        <div className="wrap-country-flag">
          <img className="country-flag" src={src} alt="Flag" />
        </div>
        <div className="wrap-country-status">
          <h3 className="country-name">{country.name}</h3>
          <div className="status-details">
            <span className="rank"><span className="rank-icon">❱❱</span>{idx + 1}</span>
            <div className="cases">
              <div className="wrap-icon-svg"><VirusSVG /></div>
              <span className="cases-value">+{country.todayCases}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-section">
        {categoryView}
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
