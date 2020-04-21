import React from 'react';
import UtilsService from '../../../services/UtilsService';

function CountryDetailsTitle({ country }) {
  return (
    <div className="country-details-title">
      <div className="wrap-country-flag">
        {country.name === 'World'
          ? <img className="country-flag" src={UtilsService.getGifSrc(`earth.gif`)} alt="Earth" />
          : <img className="country-flag" alt="Flag" title={country.name}
            src={UtilsService.getImgSrc(`flags/${country.alpha2.toLowerCase()}.png`)} />
        }
      </div>
      <h2>{country.name}</h2>
    </div>
  );
}

export default CountryDetailsTitle;
