import React from 'react';
import UtilsService from '../../services/UtilsService';
import { CASES, DEATHS, RECOVERED } from '../../constants/DataKeys';
function CountryViewListItem({ country, selectedCountry,
  onSelectCountry }) {

  const isSelected = country.name === selectedCountry.name ? 'selected' : '';
  return (
    <li className="wrap-country">
      <div className={`country ${isSelected}`} onClick={() => onSelectCountry(country)}>
        <div>
          <span>{country.name}</span>
        </div>
        <div>
          <span>Cases: </span>
          <span>{UtilsService.numberWithCommas(country[CASES])}</span>
        </div>
        <div>
          <span>Deaths: </span>
          <span>{UtilsService.numberWithCommas(country[DEATHS])}</span>
        </div>
        <div>
          <span>Recovered: </span>
          <span>{UtilsService.numberWithCommas(country[RECOVERED])}</span>
        </div>
      </div>
    </li>
  );
}

export default CountryViewListItem;
