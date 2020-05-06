import React from "react";
import UtilsService from '../../../services/UtilsService';
import { CASES, getDataKeyByKey } from '../../../constants/DataKeys';

function GCircles({ circlesDataKey = CASES, countries, dynamicRatio, args }) {

  const countriesCircles = countries.map(country => {
    const calcRadius = (country[circlesDataKey] / 1000).toFixed();
    // const radius = calcRadius > 15 ? 18 : calcRadius > 5 ? 14 : calcRadius > 1 ? 10 : 0;
    const radius = calcRadius > 100 ? 18 : calcRadius > 50 ? 14 : calcRadius > 10 ? 11 :  calcRadius > 2 ? 8 : 0;
    if (!radius) return '';
    const shortNum = UtilsService.numberToShortString(country[circlesDataKey]);
    const dataKey = getDataKeyByKey(circlesDataKey);
    // const fill = `${dataKey.colorHEX}1a`;
    const fill = `${dataKey.colorHEX}26`;
    return <g key={country.id}>
      <circle className="country-circle-data" name={country.name} style={{ fill }}
        // style={{ cx: country.centerPoint.x, cy: country.centerPoint.y, r: radius * dynamicRatio }}
        cx={country.centerPoint.x} cy={country.centerPoint.y} r={radius * dynamicRatio}
      />
      <text className="circle-text" x={country.centerPoint.x} y={country.centerPoint.y}
        dy={`${radius * dynamicRatio / 3}px`} fontSize={`${radius * 0.85 * dynamicRatio}px`}>
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