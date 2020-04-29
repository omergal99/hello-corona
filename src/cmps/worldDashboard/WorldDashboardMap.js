import React, { useState, useEffect, useCallback, useRef } from "react";

import SvgDefsFilterShadow from '../helpers/mapHelpers/SvgDefsFilterShadow';
import GCircles from './mapUtils/GCircles';
import GPaths from './mapUtils/GPaths';
import MapOptions from './mapUtils/MapOptions';
import MapTooltip from './mapUtils/MapTooltip';
import GraphColumns from '../helpers/graphs/GraphColumns';

function WorldDashboardMap({ countriesStore: { countries, selectedCountryIndex, worldData },
  settings: { isCirclesShow, circlesDataKey, isAutoFocus, isTooltipShow },
  onSelectCountry, onToggleIsCirclesShow, onToggleIsAutoFocus, onSetCirclesDataKey, onToggleIsTooltipShow }) {

  const selectedCountry = selectedCountryIndex || selectedCountryIndex === 0
    ? countries[selectedCountryIndex] : worldData;

  const initZoom = 554;
  const baseMap = { width: 954, height: 514 };

  const svgRef = useRef(initZoom);

  const args = {
    minMapZoom: 30, maxMapZoom: 1100, ratioUpdateZoom: 0.15,
    minTopSvg: (baseMap.height - initZoom) / 2, minLeftSvg: (baseMap.width - initZoom) / 2,
    initFontSize: initZoom / 30, initStroke: initZoom / 1000
  };

  const [viewBox, setViewBox] = useState(`${args.minLeftSvg} ${args.minTopSvg} ${initZoom} ${initZoom}`);
  const [mapView, setMapView] = useState({ zoom: initZoom, x: args.minLeftSvg, y: args.minTopSvg });
  const [dynamicRatio, setDynamicRatio] = useState(1);

  const [didDrag, setDidDrag] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [pointerDiff, setPointerDiff] = useState({ x: 1, y: 1 });
  const [tooltip, setTooltip] = useState(null);

  const [currPathName, setCurrPathName] = useState(null);

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
    setDynamicRatio(mapView.zoom / initZoom);
    setViewBox(`${mapView.x} ${mapView.y} ${mapView.zoom} ${mapView.zoom}`);
  }, [mapView, args]);

  useEffect(() => {
    window.addEventListener("mousewheel", handleWheel, { passive: false });
    return () => window.removeEventListener("mousewheel", handleWheel, { passive: false });
  }, [handleWheel])

  const startDrag = ev => {
    setPointerDiff({ x: ev.clientX, y: ev.clientY });
    setIsDragging(true);
    setCurrPathName(ev.target.getAttribute('name'));
  }
  const handleMouseMove = ev => {
    if (isDragging) {
      const ratioBySvgHeight = initZoom / svgRef.current.clientHeight;
      const x = mapView.x - (ev.clientX - pointerDiff.x) * dynamicRatio * ratioBySvgHeight;
      const y = mapView.y - (ev.clientY - pointerDiff.y) * dynamicRatio * ratioBySvgHeight;
      setMapView({ ...mapView, x, y });
      setViewBox(`${mapView.x} ${mapView.y} ${mapView.zoom} ${mapView.zoom}`);
      setPointerDiff({ x: ev.clientX, y: ev.clientY });
      (ev.movementX !== 0 || ev.movementY !== 0) && setDidDrag(true);
    }
    if (isTooltipShow) {
      if (ev.target.getAttribute('class').includes(pathClassName)) {
        setTooltip({
          name: ev.target.getAttribute('name'),
          alpha2: ev.target.getAttribute('alpha2'),
          style: { top: ev.nativeEvent.offsetY - 50, left: ev.nativeEvent.offsetX + 25 }
        });
      } else {
        setTooltip(null);
      }
    }
  }
  const stopDrag = () => {
    setIsDragging(false);
    setTimeout(() => setDidDrag(false), 0);
  }
  const handleMouseLeave = () => {
    stopDrag();
    setTooltip(null);
  }

  const handleScroll = ev => {
    console.log(ev);
  }

  const pathClassName = 'country-path';
  const svgClassName = 'svg-map';
  const historyObj = selectedCountry.history ? selectedCountry.history.timeline.cases : {};
  const historyArr = Object.keys(historyObj).map(key => ({ date: key, value: historyObj[key] }));

  return (
    <div className="world-dashboard-map">
      <svg className={svgClassName} viewBox={viewBox} ref={svgRef}
        onScroll={handleScroll} onWheel={handleWheel}
        onMouseDown={startDrag} onMouseMove={handleMouseMove} onMouseUp={stopDrag} onMouseLeave={handleMouseLeave}>
        <SvgDefsFilterShadow />
        <GPaths countries={countries} selectedCountry={selectedCountry} dynamicRatio={dynamicRatio} args={args}
          currPathName={currPathName} isDragging={isDragging} pathClassName={pathClassName} didDrag={didDrag}
          initZoom={initZoom} minMapZoom={args.minMapZoom} isAutoFocus={isAutoFocus} isTooltipShow={isTooltipShow}
          onSetViewBox={setViewBox} onSetDynamicRatio={setDynamicRatio} onSetMapView={setMapView}
          onSelectCountry={onSelectCountry} />
        {isCirclesShow &&
          <GCircles circlesDataKey={circlesDataKey} countries={countries} dynamicRatio={dynamicRatio} args={args} />
        }
      </svg>
      <MapOptions isCirclesShow={isCirclesShow} isAutoFocus={isAutoFocus} circlesDataKey={circlesDataKey}
        isTooltipShow={isTooltipShow}
        onToggleIsCirclesShow={onToggleIsCirclesShow} onToggleIsAutoFocus={onToggleIsAutoFocus}
        onSetCirclesDataKey={onSetCirclesDataKey} onToggleIsTooltipShow={onToggleIsTooltipShow} />
      {isTooltipShow && tooltip &&
        <MapTooltip tooltip={tooltip} />
      }
      <div className="wrap-graph-columns">
        <GraphColumns arr={historyArr} />
      </div>
    </div>
  );
}

export default WorldDashboardMap;