import React from 'react';
import UtilsService from '../../services/UtilsService';
import { CASES, DEATHS, RECOVERED, getDataKeysByKeys } from '../../constants/DataKeys';

function WorldDashboardWorldData({ worldData, onSelectCountry }) {

  const data = getDataKeysByKeys([CASES, DEATHS, RECOVERED]);

  const list = data.map(category => (
    <li className="world-detail flex-col" key={category.key} onClick={() => onSelectCountry()}>
      <span className="pseudo-border"></span>
      <p>{category.title}</p>
      <p>{UtilsService.numberWithCommas(worldData[category.key])}</p>

      {category.dividBy &&
        <span className="wrap-precent">
          <span className="precent">
            {(worldData[category.key] / worldData[category.dividBy] * 100).toFixed()}%
          </span>
        </span>
      }
    </li>
  ))

  return (
    <div className="world-dashboard-world-details">
      <h2 className="title">World</h2>
      <ul className="world-details">
        {list}
      </ul>
    </div>
  );
}

export default WorldDashboardWorldData;
