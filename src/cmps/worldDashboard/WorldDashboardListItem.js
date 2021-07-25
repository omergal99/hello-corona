import React from 'react';
import UtilsService from '../../services/UtilsService';
import VirusSVG from '../helpers/svg-icons/VirusSVG';
import { CASES, DEATHS, RECOVERED, ACTIVE, RANK, getDataKeysByKeys } from '../../constants/DataKeys';

function WorldDashboardListItem({ country, selectedCountry, onSelectCountry, countryRef }) {

  const isSelected = country.name === selectedCountry.name ? 'selected' : '';
  const src = UtilsService.getImgSrc(`flags/${country.alpha2.toLowerCase()}.png`);

  const caterogies = getDataKeysByKeys([ACTIVE, CASES, DEATHS, RECOVERED]);

  const categoryView = caterogies.map(category => {
    const shortNum = country[category.key] ? UtilsService.numberWithCommas(country[category.key]) : 'No Data';
    const commasNum = UtilsService.numberWithCommas(country[category.key]);
    const APercent = (country[ACTIVE] / country[CASES] * 100).toFixed();
    const activePercent = !isNaN(APercent) && APercent > 0 ? APercent + '%' : '';
    return <div className="category flex-col" key={category.key}
      title={`${commasNum} ${category.title}`}>
      <span className="title">
        {category.title}
        {category.key === ACTIVE && <span className="title-percent">
          &nbsp;{activePercent}
        </span>}
      </span>
      <span className="value">{shortNum}</span>
    </div>
  })

  return (
    <li className={`country ${isSelected}`} ref={countryRef}
      onClick={() => onSelectCountry(country)}>
      <span className="numeric-code" title={`Numeric Code ${country.numericCode}`}>
        N-C {country.numericCode}
      </span>
      <div className="top-section">
        <div className="wrap-country-flag">
          <img className="country-flag" src={src} alt="Flag" title={country.name} />
        </div>
        <div className="wrap-country-status">
          <h3 className="country-name">{country.name}</h3>
          <div className="status-details">
            <span className="rank" title={`Rank ${country[RANK] + 1}`}>
              <span className="rank-icon">❱❱</span>
              <span className='rank-number' >{country[RANK] + 1}</span>
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
