import React, { useEffect, useRef } from "react";
import countriesLabels from "../../../services/data/countriesLabels.json";

function GPaths({ countries, selectedCountry, dynamicRatio, args, minMapZoom,
  pathClassName, currPathName, isDragging, initZoom, isAutoFocus,
  onSetViewBox, onSetDynamicRatio, onSetMapView, onSelectCountry }) {

  const selectedCountryRef = useRef();

  useEffect(() => {
    if (!selectedCountryRef.current || !isAutoFocus) return;
    const bBox = selectedCountryRef.current.getBBox();
    if (selectedCountry.name === 'United States') bBox.width = 265;
    const abs = Math.abs(bBox.width - bBox.height) / 2;
    const max = bBox.width > bBox.height ? bBox.width : bBox.height;
    const bBoxX = bBox.width > bBox.height ? bBox.x : bBox.x - abs;
    const bBoxY = bBox.width > bBox.height ? bBox.y - abs : bBox.y;
    const x = bBoxX - minMapZoom / 2, y = bBoxY - minMapZoom / 2, zoom = max + minMapZoom;
    onSetViewBox(`${x} ${y} ${zoom} ${zoom}`);
    onSetDynamicRatio(zoom / initZoom);
    onSetMapView({ zoom, x, y });
  }, [selectedCountry, onSetViewBox, onSetDynamicRatio, onSetMapView, initZoom, minMapZoom, isAutoFocus])

  const countriesPaths = countries.map(country => {
    const isSelected = country.name === selectedCountry.name;
    const classSelected = isSelected ? 'selected' : '';
    const isSelecting = isDragging && currPathName === country.name ? 'selecting' : '';
    return <path className={`${pathClassName} ${classSelected} ${isSelecting}`} key={country.id}
      alpha2={country.alpha2} name={country.name} d={country.d}
      onClick={() => onSelectCountry(country)}
      ref={isSelected ? selectedCountryRef : undefined}>
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