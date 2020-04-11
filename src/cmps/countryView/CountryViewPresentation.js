import React, { useState, useRef, useEffect } from "react";
import SvgDefsFilterShadow from '../helpers/mapHelpers/SvgDefsFilterShadow';

function CountryViewPresentation({ selectedCountry }) {

  const countryRef = useRef();

  const initStroke = 200;
  const [dynamicRatio, setDynamicRatio] = useState(initStroke / initStroke);
  const [viewBox, setViewBox] = useState(`0 0 100 100`);

  useEffect(() => {
    const bBox = countryRef.current.getBBox();
    if (selectedCountry.name === 'United States') bBox.width = 265;
    const abs = Math.abs(bBox.width - bBox.height) / 2;
    const max = bBox.width > bBox.height ? bBox.width : bBox.height;
    const bBoxX = bBox.width > bBox.height ? bBox.x : bBox.x - abs;
    const bBoxY = bBox.width > bBox.height ? bBox.y - abs : bBox.y;
    setViewBox(`${bBoxX - 2} ${bBoxY - 2} ${max + 4} ${max + 4}`);
    setDynamicRatio(max / initStroke);
  }, [selectedCountry])

  return (
    <div className="country-view-presentation" key={selectedCountry.name}>
      <svg className='svg-country-presentation' viewBox={viewBox}
        style={{ filter: 'url(#dropshadow-color)' }}>
        <SvgDefsFilterShadow />
        <path className="country-path" d={selectedCountry.d} ref={countryRef}
          style={{ strokeWidth: `${dynamicRatio}px` }}>
        </path>
      </svg>
    </div>
  );
}

export default CountryViewPresentation;
