import React from 'react';
import UtilsService from '../../services/UtilsService';
import { getAllDataKeys } from '../../constants/DataKeys';
import GraphRows from '../helpers/graphs/GraphRows';

function WorldDashboardDetails({ countriesStore: { countries, selectedCountryIndex, worldData } }) {
  const selectedCountry = selectedCountryIndex || selectedCountryIndex === 0 ? countries[selectedCountryIndex] : worldData;

  const detailsList = getAllDataKeys().map(category => {
    return <li className="selected-country-detail" key={category.key} style={{ color: category.color }}>
      <span className="title">
        {category.title}:&nbsp;
        {category.svgIcon && <div className="wrap-icon-svg">{category.svgIcon}</div>}
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
      <GraphRows countries={countries} />
    </div>
  );
}

export default WorldDashboardDetails;
