import React from 'react';

function WorldDashboardGlobalDetails({ globalData }) {

  const data = [
    { key: 'cases', title: 'Cases' },
    { key: 'deaths', title: 'Deaths' },
    { key: 'recovered', title: 'Recovered' }
  ];

  const list = data.map(category => (
    <li className="global-detail flex-col" key={category.key}>
      <span className="pseudo-border"></span>
      <p>{category.title}</p>
      <p>{globalData[category.key]}</p>
    </li>
  ))

  return (
    <div className="world-dashboard-global-details">
      <h2 className="title">Global Data</h2>
      <ul className="global-details">
        {list}
      </ul>
    </div>
  );
}

export default WorldDashboardGlobalDetails;
