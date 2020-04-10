import React from 'react';
import UtilsService from '../../services/UtilsService';
import VirusSVG from '../helpers/svg-icons/VirusSVG';

function WorldDashboardListItem({ country, idx, selectedCountry, onSelectCountry }) {

  const caterogies = [
    { title: 'Cases', key: 'cases' },
    { title: 'Deaths', key: 'deaths' },
    { title: 'Recovered', key: 'recovered' },
    { title: 'Critical', key: 'critical' },
  ]

  const isSelected = country.name === selectedCountry.name ? 'selected' : '';
  const src = UtilsService.getImgSrc(`flags/${country.alpha2.toLowerCase()}.png`);
  const categoryView = caterogies.map(category => {
    return <div className="category flex-col" key={category.key}
      title={`${category.title} ${country[category.key]}`}>
      <span className="title">{category.title}</span>
      <span className="value">{country[category.key]}</span>
    </div>
  })

  return (
    <li className={`country ${isSelected}`} onClick={() => onSelectCountry(country)}>
      <span className="numeric-code" title="Numeric Code">N-C {country.numericCode}</span>

      <div className="top-section">
        <div className="wrap-country-flag">
          <img className="country-flag" src={src} alt="Flag" title={country.name} />
        </div>
        <div className="wrap-country-status">
          <h3 className="country-name">{country.name}</h3>
          <div className="status-details">
            <span className="rank" title={`Rank ${idx + 1}`}>
              <span className="rank-icon">❱❱</span>
              {idx + 1}
            </span>
            <div className="cases" title={`Today Cases ${country.todayCases}`}>
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
  );
}

export default WorldDashboardListItem;
