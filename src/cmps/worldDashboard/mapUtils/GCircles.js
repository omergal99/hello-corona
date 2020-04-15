import React from "react";
import UtilsService from '../../../services/UtilsService';

function GCircles({ countries, dynamicRatio, args }) {

  const countriesCircles = countries.map(country => {
    const calcRadius = (country.cases / 1000).toFixed();
    const radius = calcRadius > 15 ? 17 : calcRadius > 5 ? 12 : calcRadius > 1 ? 8 : 0;
    const shortNum = UtilsService.numberToShortString(country.cases);
    if (!radius) return '';
    return <g key={country.id}>
      <circle className="country-circle-data" name={country.name}
        // style={{ cx: country.centerPoint.x, cy: country.centerPoint.y, r: radius * dynamicRatio }}
        cx={country.centerPoint.x} cy={country.centerPoint.y} r={radius * dynamicRatio}
      />
      <text className="circle-text" x={country.centerPoint.x} y={country.centerPoint.y}
        dy={`${radius * dynamicRatio / 3}px`} fontSize={`${radius * 0.8 * dynamicRatio}px`}>
        {shortNum}
      </text>
    </g>
  })

  return (
    <g className="g-circles" style={{ strokeWidth: args.initStroke * dynamicRatio }}>
      {countriesCircles}
    </g>
  );
}

export default GCircles;