import React, { useState, useEffect, useCallback, useRef } from "react";
import countriesLabels from "../../services/data/countriesLabels.json";
import SvgDefsFilterShadow from './mapHelpers/SvgDefsFilterShadow';

function WorldDashboardMap({ countriesStore: { countries, selectedCountryIndex },
  onSelectCountry }) {
  const selectedCountry = selectedCountryIndex || selectedCountryIndex === 0 ? countries[selectedCountryIndex] : {};

  const firstZoom = 554;
  const baseMap = { width: 954, height: 514 };

  const svgRef = useRef(firstZoom);

  const args = {
    initZoom: firstZoom, minMapZoom: 30, maxMapZoom: 1100, ratioUpdateZoom: 0.15,
    minTopSvg: (baseMap.height - firstZoom) / 2, minLeftSvg: (baseMap.width - firstZoom) / 2,
    initFontSize: firstZoom / 30, initStroke: firstZoom / 1000
  };

  const [mapView, setMapView] = useState({ zoom: args.initZoom, x: 0, y: 0 });
  const [viewBox, setViewBox] = useState(`${args.minLeftSvg} ${args.minTopSvg} ${args.initZoom} ${args.initZoom}`);

  const [isDragging, setIsDragging] = useState(false);
  const [pointerDiff, setPointerDiff] = useState({ x: 1, y: 1 });

  const [dynamicRatio, setDynamicRatio] = useState(1);
  const [currPathName, setCurrPathName] = useState('');

  const svgClassName = 'svg-map';
  const handleWheel = useCallback(ev => {
    const isMouseOnSvgMap = ev.path && ev.path.some(path => path.className && path.className.baseVal
      && path.className.baseVal.includes(svgClassName));
    if (!isMouseOnSvgMap) return;
    const updateZoom = mapView.zoom * args.ratioUpdateZoom;
    const copy = mapView;
    if (ev.deltaY > 0) {
      if (mapView.zoom + updateZoom + args.minMapZoom < args.maxMapZoom) {
        copy.zoom = copy.zoom + updateZoom;
        copy.x = copy.x - updateZoom / 2;
        copy.y = copy.y - updateZoom / 2;
        setMapView(copy);
      }
    } else {
      if (mapView.zoom - updateZoom - args.minMapZoom > 0) {
        copy.zoom = copy.zoom - updateZoom;
        copy.x = copy.x + updateZoom / 2;
        copy.y = copy.y + updateZoom / 2;
        setMapView(copy);
      }
    }
    setDynamicRatio(mapView.zoom / args.initZoom);
    setViewBox(`${mapView.x + args.minLeftSvg} ${mapView.y + args.minTopSvg} ${mapView.zoom} ${mapView.zoom}`);
  }, [mapView, args]);

  useEffect(() => {
    window.addEventListener("mousewheel", handleWheel, { passive: false });
    return () => window.removeEventListener("mousewheel", handleWheel, { passive: false });
  })

  const startDrag = ev => {
    setPointerDiff({ x: ev.clientX, y: ev.clientY });
    setIsDragging(true);
    setCurrPathName(ev.target.getAttribute('name'));
  }
  const drag = ev => {
    if (isDragging) {
      const ratioBySvgHeight = args.initZoom / svgRef.current.clientHeight;
      const x = mapView.x - (ev.clientX - pointerDiff.x) * dynamicRatio * ratioBySvgHeight;
      const y = mapView.y - (ev.clientY - pointerDiff.y) * dynamicRatio * ratioBySvgHeight;
      setMapView({ ...mapView, x, y });
      setViewBox(`${x + args.minLeftSvg} ${y + args.minTopSvg} ${mapView.zoom} ${mapView.zoom}`);
      setPointerDiff({ x: ev.clientX, y: ev.clientY });
    }
  }
  const stopDrag = () => {
    setIsDragging(false);
  }

  const countriesPaths = countries.map(country => {
    const isSelected = country.name === selectedCountry.name ? 'selected' : '';
    const isSelecting = isDragging && currPathName === country.name ? 'selecting' : '';
    return <path className={`country-path ${isSelected} ${isSelecting}`} key={country.id}
      alpha2={country.alpha2} name={country.name} d={country.d}
      onClick={(ev) => onSelectCountry(country)}>
      {/* onClick={(ev) => onSelectCountry(country) || console.log(ev.target.getBBox())}> */}
      <title>{country.name}</title>
    </path>
  })

  const countriesPathsLabels = countriesLabels.map(country => {
    return <path className="country-path-label" d={country.d} key={country.id}></path>
  })

  const handleScroll = ev => {
    console.log(ev);
  }

  return (
    <div className="world-dashboard-map">
      <svg className={svgClassName} viewBox={viewBox} ref={svgRef}
        onScroll={handleScroll}
        onMouseDown={startDrag} onMouseMove={drag} onMouseUp={stopDrag} onMouseLeave={stopDrag}>
        <SvgDefsFilterShadow />
        <g className="g-paths" style={{ strokeWidth: args.initStroke * dynamicRatio, filter: 'url(#dropshadow)' }}>
          {countriesPaths}
          {countriesPathsLabels}
        </g>
      </svg>
    </div>
  );
}

export default WorldDashboardMap;