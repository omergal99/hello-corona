import React from 'react';
import UtilsService from '../../services/UtilsService';

function WorldDashboardWorldData({ worldData }) {

  const data = [
    { key: 'cases', title: 'Cases' },
    { key: 'deaths', title: 'Deaths', dividBy: 'cases' },
    { key: 'recovered', title: 'Recovered', dividBy: 'cases' }
  ];

  const list = data.map(category => (
    <li className="global-detail flex-col" key={category.key}>
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
    <div className="world-dashboard-global-details">
      <h2 className="title">World</h2>
      <ul className="global-details">
        {list}
      </ul>
    </div>
  );
}

export default WorldDashboardWorldData;
