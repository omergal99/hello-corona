import React, { useState, useRef, useEffect } from "react";

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
    setViewBox(`${bBoxX - 1} ${bBoxY - 1} ${max + 2} ${max + 2} `);
    setDynamicRatio(max / initStroke);
  }, [selectedCountry])

  return (
    <div className="country-view-presentation" key={selectedCountry.name}>
      <svg className='svg-country-presentation' viewBox={viewBox}>
        <path className="country-path" d={selectedCountry.d} ref={countryRef}
          style={{ strokeWidth: `${dynamicRatio}px` }}>
        </path>
        {/* <circle cx="50" cy="50" r="50"/> */}
      </svg>
    </div>
  );
}

export default CountryViewPresentation;
