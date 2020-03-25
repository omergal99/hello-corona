import React from 'react';

function CountryViewList({ countries }) {

  const list = countries.map(country => {
    return <li className="country-preview" key={country.country}>
      <div>
        <span>{country.country}</span>
      </div>
      <div>
        <span>Cases: </span>
        <span>{country.cases}</span>
      </div>
      <div>
        <span>Deaths: </span>
        <span>{country.deaths}</span>
      </div>
      <div>
        <span>Recovered: </span>
        <span>{country.recovered}</span>
      </div>
    </li>
  })

  return (
    <ul className="country-view-list">
      {list}
    </ul>
  );
}

export default CountryViewList;
