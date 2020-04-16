import React from 'react';
import UtilsService from '../../services/UtilsService';

import TestTubeSVG from '../helpers/svg-icons/TestTubeSVG';
import BiohazardSVG from '../helpers/svg-icons/BiohazardSVG';
import HeartbeatSVG from '../helpers/svg-icons/HeartbeatSVG';
import HeartBrokenSVG from '../helpers/svg-icons/HeartBrokenSVG';
import SickBedSVG from '../helpers/svg-icons/SickBedSVG';
import VirusSVG from '../helpers/svg-icons/VirusSVG';

import { CASES, TOTAL_TESTS, RECOVERED, DEATHS, CRITICAL,ACTIVE, getAllDataKeys } from '../../constants/DataKeys';

function WorldDashboardDetails({ selectedCountry }) {

  const list = getAllDataKeys().map(category => {
    return <li className="selected-country-detail" key={category.key} style={{ color: category.color }}>
      <span className="title">
        {category.title}:&nbsp;
        {category.key === CASES && <div className="wrap-icon-svg"> <BiohazardSVG /> </div>}
        {category.key === TOTAL_TESTS && <div className="wrap-icon-svg"> <TestTubeSVG /> </div>}
        {category.key === RECOVERED && <div className="wrap-icon-svg"> <HeartbeatSVG /> </div>}
        {category.key === DEATHS && <div className="wrap-icon-svg"> <HeartBrokenSVG /> </div>}
        {category.key === CRITICAL && <div className="wrap-icon-svg"> <SickBedSVG /> </div>}
        {category.key === ACTIVE && <div className="wrap-icon-svg"> <VirusSVG /> </div>}
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
        {list}
      </ul>
    </div>
  );
}

export default WorldDashboardDetails;
