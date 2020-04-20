import React from 'react';
import UtilsService from '../../services/UtilsService';

import { getCoronaDataKeys } from '../../constants/DataKeys';

function CountryViewDetails({ selectedCountry }) {

  const list = getCoronaDataKeys().map(category => {
    const value = selectedCountry[category.key] || selectedCountry[category.key] === 0
      ? UtilsService.numberWithCommas(selectedCountry[category.key])
      : selectedCountry[category.key] === undefined ? '' : 'No Data';
    const percent = selectedCountry[category.key] / selectedCountry[category.dividBy] * 100;
    return <li className="selected-country-detail" key={category.key}
      style={{ color: category.color }}>
      <span>{category.title}:&nbsp;</span>

      <span className="value" title={value}>{value}</span>

      {category.dividBy && !!selectedCountry[category.key] &&
        <span className="percent" title={percent.toFixed(2)}>{percent.toFixed(0)}%</span>
      }
    </li>
  })

  return (
    <div className="country-view-details flex-col">
      <h3 className="selected-country-name">{selectedCountry.name || 'Country Name'}</h3>
      <ul className="selected-country-details">
        {list}
      </ul>
    </div>
  );
}

export default CountryViewDetails;
