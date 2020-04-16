import React from 'react';
import UtilsService from '../../services/UtilsService';

import { getAllDataKeys } from '../../constants/DataKeys';

function CountryViewDetails({ selectedCountry }) {

  const list = getAllDataKeys().map(category => {
    return <li className="selected-country-detail" key={category.key}
      style={{ color: category.color }}>
      <span>{category.title}:&nbsp;</span>
      <span>
        {selectedCountry[category.key] || selectedCountry[category.key] === 0
          ? UtilsService.numberWithCommas(selectedCountry[category.key])
          : selectedCountry[category.key] === undefined ? '' : 'No Data'}
      </span>
      {category.dividBy && !!selectedCountry[category.key] &&
        <span style={{ textAlign: 'right' }} >
          {(selectedCountry[category.key] / selectedCountry[category.dividBy] * 100).toFixed(0)}%</span>
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
