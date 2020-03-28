import React, { useState, useEffect, useCallback, useRef } from "react";
import countriesLabels from "../../services/data/countriesLabels.json"

function WorldDashboardMap({ countriesStore: { countries, selectedCountryIndex },
  onSelectCountry }) {

  const selectedCountry = selectedCountryIndex || selectedCountryIndex === 0 ? countries[selectedCountryIndex] : {};

  const firstZoom = 554;
  const baseMap = { width: 954, height: 514 };

  const svgRef = useRef(firstZoom);

  const args = {
    initZoom: firstZoom, minMapZoom: 40, maxMapZoom: 1100, ratioUpdateZoom: 0.15,
    diffHeightMapRatioY: (baseMap.height - firstZoom) / 2, diffHeightMapRatioX: (baseMap.width - firstZoom) / 2,
    initFontSize: firstZoom / 30, initStroke: firstZoom / 1000
  };

  const [mapView, setMapView] = useState({ zoom: args.initZoom, x: 0, y: 0 });
  const [viewBox, setViewBox] = useState(`${args.diffHeightMapRatioX} ${args.diffHeightMapRatioY} ${args.initZoom} ${args.initZoom}`);

  const [isDragging, setIsDragging] = useState(false);
  const [pointerDiff, setPointerDiff] = useState({ x: 1, y: 1 });

  const [dynamicRatio, setDynamicRatio] = useState(1);

  const svgClassName = 'svg-map';
  const handleWheel = useCallback(ev => {
    const isOccurInSvgMap = ev.path && ev.path.some(path => path.className && path.className.baseVal
      && path.className.baseVal.includes(svgClassName));
    if (isOccurInSvgMap) {
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
      setViewBox(`${mapView.x + args.diffHeightMapRatioX} ${mapView.y + args.diffHeightMapRatioY} ${mapView.zoom} ${mapView.zoom}`);
    }
  }, [mapView, args]);

  useEffect(() => {
    window.addEventListener("mousewheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("mousewheel", handleWheel, { passive: false });
    }
  })

  const startDrag = ev => {
    setPointerDiff({ x: ev.clientX, y: ev.clientY });
    setIsDragging(true);
  }
  const drag = ev => {
    if (isDragging) {
      const ratioBySvgHeight = args.initZoom / svgRef.current.clientHeight;
      const x = mapView.x - (ev.clientX - pointerDiff.x) * dynamicRatio * ratioBySvgHeight;
      const y = mapView.y - (ev.clientY - pointerDiff.y) * dynamicRatio * ratioBySvgHeight;
      setMapView({ ...mapView, x, y });
      setViewBox(`${x + args.diffHeightMapRatioX} ${y + args.diffHeightMapRatioY} ${mapView.zoom} ${mapView.zoom}`);
      setPointerDiff({ x: ev.clientX, y: ev.clientY });
    }
  }
  const stopDrag = () => {
    setIsDragging(false);
  }

  const countriesPaths = countries.map(country => {
    const isSelected = country.name === selectedCountry.name ? 'selected' : '';
    return <path className={`country-path ${isSelected}`} key={country.id}
      alpha2={country.alpha2} name={country.name} d={country.d}
      onClick={() => onSelectCountry(country)}>
      <title>{country.name}</title>
    </path>
  })

  const countriesPathsLabels = countriesLabels.map(country => {
    return <path className="country-path-label" d={country.d} key={country.id}></path>
  })

  return (
    <div className="world-dashboard-map">
      <svg className={svgClassName} viewBox={viewBox} ref={svgRef}
        onWheel={handleWheel} onMouseLeave={stopDrag}
        onMouseDown={startDrag} onMouseMove={drag} onMouseUp={stopDrag}>
        <defs>
          <filter id="dropshadow" height="130%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
            <feOffset dx="2" dy="2" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.5" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g className="g-paths" style={{ strokeWidth: args.initStroke * dynamicRatio, filter: 'url(#dropshadow)' }}>
          {countriesPaths}
          {countriesPathsLabels}
        </g>
      </svg>
    </div>
  );
}

export default WorldDashboardMap;