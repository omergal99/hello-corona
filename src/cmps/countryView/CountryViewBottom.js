import React from 'react';

function CountryViewBottom() {

  return (
    <div className="country-view-bottom">
      <svg className="loader-svg" viewBox="0 0 100 100">
        <g className="g-spin">
          <circle className="spiner-1 spiner"/>
          <circle className="spiner-2 spiner"/>
          <circle className="spiner-3 spiner"/>
        </g>
      </svg>
    </div>
  );
}

export default CountryViewBottom;
