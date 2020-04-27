import React from 'react';
import UtilsService from '../../services/UtilsService';
import VirusSVG from '../helpers/svg-icons/VirusSVG';
import { CASES, DEATHS, RECOVERED, CRITICAL, getDataKeysByKeys } from '../../constants/DataKeys';

function WorldDashboardListItem({ country, idx, selectedCountry, onSelectCountry }) {

  const isSelected = country.name === selectedCountry.name ? 'selected' : '';
  const src = UtilsService.getImgSrc(`flags/${country.alpha2.toLowerCase()}.png`);

  const caterogies = getDataKeysByKeys([CASES, DEATHS, RECOVERED, CRITICAL]);
  
  const categoryView = caterogies.map(category => {
    const shortNum = country[category.key] ? UtilsService.numberWithCommas(country[category.key]) : 'No Data';
    const commasNum = UtilsService.numberWithCommas(country[category.key]);
    return <div className="category flex-col" key={category.key}
      title={`${commasNum} ${category.title}`}>
      <span className="title">{category.title}</span>
      <span className="value">{shortNum}</span>
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
            <div className="cases" title={`Today Cases ${UtilsService.numberWithCommas(country.todayCases)}`}>
              <div className="wrap-icon-svg"><VirusSVG /></div>
              <span className="cases-value">+{UtilsService.numberWithCommas(country.todayCases)}</span>
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
