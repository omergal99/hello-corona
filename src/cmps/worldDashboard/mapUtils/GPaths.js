import React from "react";
import countriesLabels from "../../../services/data/countriesLabels.json";

function GPaths({ countries, selectedCountry, dynamicRatio, args, pathClassName, currPathName, isDragging,
  onSelectCountry }) {

  const countriesPaths = countries.map(country => {
    const isSelected = country.name === selectedCountry.name ? 'selected' : '';
    const isSelecting = isDragging && currPathName === country.name ? 'selecting' : '';
    return <path className={`${pathClassName} ${isSelected} ${isSelecting}`} key={country.id}
      alpha2={country.alpha2} name={country.name} d={country.d}
      onClick={() => onSelectCountry(country)}>
      <title>{country.name}</title>
    </path>
  })

  const countriesPathsLabels = countriesLabels.map(country => {
    return <path className="country-path-label" d={country.d} key={country.id}></path>
  })

  return (
    <g className="g-paths" style={{ strokeWidth: args.initStroke * dynamicRatio, filter: 'url(#dropshadow)' }}>
      {countriesPaths}
      {countriesPathsLabels}
    </g>
  );
}

export default GPaths;