import React, { memo, useState, useEffect, useCallback, useRef } from "react";

import SvgDefsFilterShadow from '../../helpers/mapHelpers/SvgDefsFilterShadow';
import SvgDefsScanning from '../../helpers/mapHelpers/SvgDefsScanning';
import GCircles from './GCircles';
import GPaths from './GPaths';
import MapTooltip from './MapTooltip';
import MapOptions from './MapOptions';


const pathClassName = 'country-path';
const svgClassName = 'svg-map';

const initZoom = 554;
const baseMap = { width: 954, height: 514 };

const args = {
  minMapZoom: 30, maxMapZoom: 1100, ratioUpdateZoom: 0.15,
  minTopSvg: (baseMap.height - initZoom) / 2, minLeftSvg: (baseMap.width - initZoom) / 2,
  initFontSize: initZoom / 30, initStroke: initZoom / 1000
};

function SvgCountriesMap(props) {
  const {
    countries,
    selectedCountry,
    settings: { isCirclesShow, circlesDataKey, isAutoFocus, isTooltipShow, isGradient }, onSelectCountry
  } = props;

  const svgRef = useRef(initZoom);

  const [viewBox, setViewBox] = useState(`${args.minLeftSvg} ${args.minTopSvg} ${initZoom} ${initZoom}`);
  const [mapView, setMapView] = useState({ zoom: initZoom, x: args.minLeftSvg, y: args.minTopSvg });
  const [dynamicRatio, setDynamicRatio] = useState(1);

  const [didDrag, setDidDrag] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [pointerDiff, setPointerDiff] = useState({ x: 1, y: 1 });
  const [tooltip, setTooltip] = useState(null);

  const [currPathName, setCurrPathName] = useState(null);

  const zoomMap = useCallback(direction => {
    setMapView(current => {
      const updateZoom = current.zoom * args.ratioUpdateZoom * direction;
      const zoom = Math.min(args.maxMapZoom, Math.max(args.minMapZoom, current.zoom - updateZoom));
      if (zoom === current.zoom) return current;
      return {
        zoom,
        x: current.x - (zoom - current.zoom) / 2,
        y: current.y - (zoom - current.zoom) / 2
      };
    });
  }, []);

  const handleWheel = useCallback(ev => {
    ev.preventDefault();
    zoomMap(ev.deltaY > 0 ? -1 : 1);
  }, [zoomMap]);

  useEffect(() => {
    setDynamicRatio(mapView.zoom / initZoom);
    setViewBox(`${mapView.x} ${mapView.y} ${mapView.zoom} ${mapView.zoom}`);
  }, [mapView]);

  const startDrag = ev => {
    setPointerDiff({ x: ev.clientX, y: ev.clientY });
    setIsDragging(true);
    setCurrPathName(ev.target.getAttribute('name'));
  }
  const handleMouseMove = useCallback(ev => {
    if (isDragging) {
      const hasMoved = Math.abs(ev.clientX - pointerDiff.x) > 1 || Math.abs(ev.clientY - pointerDiff.y) > 1;
      if (hasMoved && !ev.currentTarget.hasPointerCapture(ev.pointerId)) {
        ev.currentTarget.setPointerCapture(ev.pointerId);
      }
      const ratioBySvgHeight = initZoom / svgRef.current.clientHeight;
      const x = mapView.x - (ev.clientX - pointerDiff.x) * dynamicRatio * ratioBySvgHeight;
      const y = mapView.y - (ev.clientY - pointerDiff.y) * dynamicRatio * ratioBySvgHeight;
      setMapView({ ...mapView, x, y });
      setViewBox(`${mapView.x} ${mapView.y} ${mapView.zoom} ${mapView.zoom}`);
      setPointerDiff({ x: ev.clientX, y: ev.clientY });
      hasMoved && setDidDrag(true);
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
  }, [dynamicRatio, isDragging, isTooltipShow, mapView, pointerDiff]);

  const stopDrag = ev => {
    if (ev && ev.currentTarget.hasPointerCapture(ev.pointerId)) {
      ev.currentTarget.releasePointerCapture(ev.pointerId);
    }
    setIsDragging(false);
    setTimeout(() => setDidDrag(false), 0);
  }
  const handleMouseLeave = () => {
    stopDrag();
    setTooltip(null);
  }

  return (
    <>
      <svg className={svgClassName} viewBox={viewBox} ref={svgRef}
        onWheel={handleWheel}
        onPointerDown={startDrag}
        onPointerMove={handleMouseMove}
        onPointerUp={stopDrag} onPointerCancel={stopDrag} onPointerLeave={handleMouseLeave}>

        <SvgDefsFilterShadow />
        <SvgDefsScanning />

        <GPaths countries={countries} selectedCountry={selectedCountry} dynamicRatio={dynamicRatio} args={args}
          currPathName={currPathName} isDragging={isDragging} pathClassName={pathClassName} didDrag={didDrag}
          initZoom={initZoom} minMapZoom={args.minMapZoom} isAutoFocus={isAutoFocus} isTooltipShow={isTooltipShow}
          isGradient={isGradient}
          onSetViewBox={setViewBox} onSetDynamicRatio={setDynamicRatio} onSetMapView={setMapView}
          onSelectCountry={onSelectCountry} />
        {isCirclesShow &&
          <GCircles circlesDataKey={circlesDataKey} countries={countries} dynamicRatio={dynamicRatio} args={args} />
        }
      </svg>

      <MapOptions settings={props.settings} zoomMap={zoomMap} {...props.mapOptionsFunction} />

      {isTooltipShow && tooltip &&
        <MapTooltip tooltip={tooltip} />
      }
    </>
  );
}

export default memo(SvgCountriesMap);