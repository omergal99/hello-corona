import React from 'react';
import UtilsService from '../../../services/UtilsService';
import {
  POPULATION, CASES, DEATHS, RECOVERED, ACTIVE, CRITICAL, TESTS,
  getCoronaDataKeys, getDataKeyByKey
} from '../../../constants/DataKeys';

function CountryDetailsList({ country }) {
  console.log('country', country);

  const categoriesToAddIcon = [CASES, DEATHS, RECOVERED, ACTIVE, CRITICAL, TESTS];

  const coronaDetails = getCoronaDataKeys().map(category => {
    const isWishIcon = categoriesToAddIcon.some(key => key === category.key);
    const value = country[category.key] ? UtilsService.numberWithCommas(country[category.key]) : 'No Data';
    const dividBy = category.key === CASES ? POPULATION : category.dividBy;
    const percent = country[category.key] / country[dividBy] * 100;
    return <li className="country-details-item" key={category.key} style={{ color: category.colorHEX }}>
      <span className="title">
        {category.title}:&nbsp;
        {isWishIcon && <div className="wrap-icon-svg">{category.svgIcon}</div>}
      </span>
      <span className="value" title={value}>{value}</span>
      {!!percent && dividBy && !!country[category.key] &&
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
      <div className="value population">
        <span title={value}>{value}</span>
        <span className="wrap-icon-svg">
          <svg viewBox="0 0 512 512">
            <circle fill="currentColor" cx="256" cy="378.5" r="25" />
            <path fill="currentColor" d="M256,0C114.516,0,0,114.497,0,256c0,141.484,114.497,256,256,256c141.484,0,256-114.497,256-256
				C512,114.516,397.503,0,256,0z M256,472c-119.377,0-216-96.607-216-216c0-119.377,96.607-216,216-216
				c119.377,0,216,96.607,216,216C472,375.377,375.393,472,256,472z"/>
            <path fill="currentColor" d="M256,128.5c-44.112,0-80,35.888-80,80c0,11.046,8.954,20,20,20s20-8.954,20-20c0-22.056,17.944-40,40-40
				c22.056,0,40,17.944,40,40c0,22.056-17.944,40-40,40c-11.046,0-20,8.954-20,20v50c0,11.046,8.954,20,20,20
				c11.046,0,20-8.954,20-20v-32.531c34.466-8.903,60-40.26,60-77.469C336,164.388,300.112,128.5,256,128.5z"/>
          </svg>
          <div className="population-info">
            <span>Population of 2020</span>
          </div>
        </span>
      </div>
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
