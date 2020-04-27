import React from 'react';
import UtilsService from '../../../services/UtilsService';
import {
  POPULATION, CASES, DEATHS, RECOVERED, ACTIVE, CRITICAL, TESTS,
  getCoronaDataKeys, getDataKeyByKey
} from '../../../constants/DataKeys';

function CountryDetailsList({ country }) {

  const categoriesToAddIcon = [CASES, DEATHS, RECOVERED, ACTIVE, CRITICAL, TESTS];
  const coronaDetails = getCoronaDataKeys().map(category => {
    const isWishIcon = categoriesToAddIcon.some(key => key === category.key);
    const value = country[category.key] ? UtilsService.numberWithCommas(country[category.key]) : 'No Data';
    const dividBy = category.key === CASES ? POPULATION : category.dividBy;
    const percent = country[category.key] / country[dividBy] * 100;
    return <li className="country-details-item" key={category.key} style={{ color: category.color }}>
      <span className="title">
        {category.title}:&nbsp;
        {isWishIcon && <div className="wrap-icon-svg">{category.svgIcon}</div>}
      </span>
      <span className="value" title={value}>{value}</span>
      {dividBy && !!country[category.key] &&
        <span className="percent" title={percent.toFixed(2)}>
          {Number(percent.toFixed(0)) !== 0 ? percent.toFixed(0) : percent.toFixed(2)}
          %
        </span>
      }
    </li>
  })

  const populationDetails = (() => {
    const populationData = getDataKeyByKey(POPULATION);
    const value = UtilsService.numberWithCommas(country[populationData.key]);
    return <li className="country-details-item">
      <span className="title">{populationData.title}:&nbsp;</span>
      <span className="value population" title={value}>{value}</span>
    </li>
  })()

  return (
    <ul className="country-details-list">
      {populationDetails}
      {coronaDetails}
    </ul>
  );
}

export default CountryDetailsList;
