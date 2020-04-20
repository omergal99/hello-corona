import React from 'react';
import UtilsService from '../../services/UtilsService';
import {
  POPULATION, CASES, DEATHS, RECOVERED, ACTIVE, CRITICAL, TOTAL_TESTS,
  getCoronaDataKeys, getDataKeyByKey
} from '../../constants/DataKeys';
import GraphRows from '../helpers/graphs/GraphRows';

function WorldDashboardDetails({ countriesStore: { countries, selectedCountryIndex, worldData },
  onSelectCountry }) {
  const selectedCountry = selectedCountryIndex || selectedCountryIndex === 0 ? countries[selectedCountryIndex] : worldData;

  const categoriesToAddIcon = [CASES, DEATHS, RECOVERED, ACTIVE, CRITICAL, TOTAL_TESTS];
  const coronaDetails = getCoronaDataKeys().map(category => {
    const isWishIcon = categoriesToAddIcon.some(key => key === category.key);
    const value = selectedCountry[category.key] || selectedCountry[category.key] === 0
      ? UtilsService.numberWithCommas(selectedCountry[category.key])
      : selectedCountry[category.key] === undefined ? '' : 'No Data';
    const percent = selectedCountry[category.key] / selectedCountry[category.dividBy] * 100;
    return <li className="selected-country-detail" key={category.key} style={{ color: category.color }}>
      <span className="title">
        {category.title}:&nbsp;
        {isWishIcon && <div className="wrap-icon-svg">{category.svgIcon}</div>}
      </span>
      <span className="value" title={value}>{value}</span>
      {category.dividBy && !!selectedCountry[category.key] &&
        <span className="percent" title={percent.toFixed(2)}>
          {Number(percent.toFixed(0)) !== 0 ? percent.toFixed(0) : percent.toFixed(2)}
          %
        </span>
      }
    </li>
  })

  const populationDetails = (() => {
    const populationData = getDataKeyByKey(POPULATION);
    const value = UtilsService.numberWithCommas(selectedCountry[populationData.key]);
    return <li className="selected-country-detail">
      <span className="title">{populationData.title}:&nbsp;</span>
      <span className="value population" title={value}>{value}</span>
    </li>
  })()

  const src = selectedCountry.alpha2 && UtilsService.getImgSrc(`flags/${selectedCountry.alpha2.toLowerCase()}.png`);
  return (
    <div className="world-dashboard-details flex-col">
      <div className="selected-country-title">
        {selectedCountry.alpha2 && <div className="wrap-country-flag">
          <img className="country-flag" src={src} alt="Flag" title={selectedCountry.name} />
        </div>}
        <h2>{selectedCountry.name}</h2>
      </div>
      <ul className="selected-country-details">
        {populationDetails}
        {coronaDetails}
      </ul>
      <GraphRows countries={countries} onSelectCountry={onSelectCountry} />
    </div>
  );
}

export default WorldDashboardDetails;
