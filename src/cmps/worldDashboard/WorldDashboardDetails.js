import React from 'react';

function WorldDashboardDetails({ selectedCountry }) {

  const data = [
    { key: 'cases', title: 'Cases', color: 'lightblue' },
    { key: 'todayCases', title: 'Today Cases', dividBy: 'cases', color: 'lightblue' },
    { key: 'deaths', title: 'Deaths', dividBy: 'cases', color: 'FireBrick' },
    { key: 'todayDeaths', title: 'Today Deaths', dividBy: 'deaths', color: 'FireBrick' },
    { key: 'recovered', title: 'Recovered', dividBy: 'cases', color: 'MediumSpringGreen' },
    { key: 'active', title: 'Active', dividBy: 'cases', color: 'orange' },
    { key: 'critical', title: 'Critical', dividBy: 'cases', color: 'DarkOrchid' },
    { key: 'casesPerOneMillion', title: 'Cases Per 1M' },
    { key: 'deathsPerOneMillion', title: 'Deaths Per 1M' },
    { key: 'firstCase', title: 'First Case' },
  ];

  const list = data.map(category => {
    return <li className="selected-country-detail" key={category.key}
      style={{ color: category.color }}>
      <span>{category.title}:&nbsp;</span>
      <span>{selectedCountry[category.key] || selectedCountry[category.key] === 0 ? selectedCountry[category.key] :
        selectedCountry[category.key] === undefined ? '' : 'No Data'}</span>
      {category.dividBy && !!selectedCountry[category.key] &&
        <span style={{ textAlign: 'right' }} >
          {(selectedCountry[category.key] / selectedCountry[category.dividBy] * 100).toFixed(0)}%</span>
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
