import React from 'react';
import UtilsService from '../../services/UtilsService';
import { CASES, DEATHS, RECOVERED, ACTIVE, CRITICAL, TOTAL_TESTS, getAllDataKeys } from '../../constants/DataKeys';
import GraphRows from '../helpers/graphs/GraphRows';

function WorldDashboardDetails({ countriesStore: { countries, selectedCountryIndex, worldData },
  onSelectCountry }) {
  const selectedCountry = selectedCountryIndex || selectedCountryIndex === 0 ? countries[selectedCountryIndex] : worldData;

  const categoriesToAddIcon = [CASES, DEATHS, RECOVERED, ACTIVE, CRITICAL, TOTAL_TESTS];
  const detailsList = getAllDataKeys().map(category => {
    const isWishIcon = categoriesToAddIcon.some(key => key === category.key);
    return <li className="selected-country-detail" key={category.key} style={{ color: category.color }}>
      <span className="title">
        {category.title}:&nbsp;
        {isWishIcon && <div className="wrap-icon-svg">{category.svgIcon}</div>}
      </span>

      <span className="value">
        {selectedCountry[category.key] || selectedCountry[category.key] === 0
          ? UtilsService.numberWithCommas(selectedCountry[category.key])
          : selectedCountry[category.key] === undefined ? '' : 'No Data'}
      </span>

      {category.dividBy && !!selectedCountry[category.key] &&
        <span className="percent" style={{ textAlign: 'right' }} >
          {(selectedCountry[category.key] / selectedCountry[category.dividBy] * 100).toFixed(0)}%
        </span>
      }
    </li>
  })

  return (
    <div className="world-dashboard-details flex-col">
      <h3 className="selected-country-name">{selectedCountry.name || 'Country Name'}</h3>
      <ul className="selected-country-details">
        {detailsList}
      </ul>
      <GraphRows countries={countries} onSelectCountry={onSelectCountry} />
    </div>
  );
}

export default WorldDashboardDetails;
