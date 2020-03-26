import React from 'react';

function CountryViewBottom() {

  return (
    <div className="country-view-bottom">

      <div className="wrap-loader-svg">
        <div className="lighter-1 lighter"></div>
        <div className="lighter-2 lighter"></div>
        <svg className="loader-svg" viewBox="0 0 100 100">
          <g className="g-loader">
            <circle className="light-source" />
            <circle className="spiner-1 spiner" />
            <circle className="spiner-2 spiner" />
            <circle className="spiner-3 spiner" />
          </g>
        </svg>
      </div>
    </div>
  );
}

export default CountryViewBottom;
