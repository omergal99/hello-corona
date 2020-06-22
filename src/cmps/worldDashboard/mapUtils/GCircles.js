import React from "react";
import UtilsService from '../../../services/UtilsService';
import { ACTIVE, getDataKeyByKey } from '../../../constants/DataKeys';

function GCircles({ circlesDataKey = ACTIVE, countries, dynamicRatio, args }) {

  const countriesCircles = countries.map(country => {
    const calcRadius = (country[circlesDataKey] / 1000).toFixed();
    const radius = calcRadius > 100 ? 18 : calcRadius > 50 ? 14 : calcRadius > 10 ? 11 :  calcRadius > 2 ? 8 : 6;
    const shortNum = UtilsService.numberToShortString(country[circlesDataKey]);
    if (!shortNum) return '';
    const dataKey = getDataKeyByKey(circlesDataKey);
    // const fill = `${dataKey.colorHEX}1a`;
    const fill = `${dataKey.colorHEX}20`;
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