import React, { useState, useEffect, useCallback, useRef } from "react";

function WorldDashboardMap({ countriesStore: { countriesMap } }) {

  const firstZoom = 540;
  const baseMap = { width: 954, height: 514 };

  const svgRef = useRef(firstZoom);

  const args = {
    initZoom: firstZoom, minMapZoom: 40, maxMapZoom: 1100, ratioUpdateZoom: 0.15,
    diffHeightMapRatioY: (firstZoom - baseMap.height) / -2, diffHeightMapRatioX: (baseMap.width - firstZoom) / 2,
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
      console.log(ratioBySvgHeight);
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

  const countriesPaths = countriesMap.map(country => {
    return <path className="country-path" id={country.id} key={country.id} d={country.d} >
      <title>{country.name}</title>
    </path>
  })

  return (
    <div className="world-dashboard-map">
      <svg className={svgClassName} viewBox={viewBox} ref={svgRef} preserveAspectRatio="xMinYMin"
        // style={{ height: svgRef.current.clientHeight }}
        onWheel={handleWheel} onMouseLeave={stopDrag}
        onMouseDown={startDrag} onMouseMove={drag} onMouseUp={stopDrag}>
        <g className="g-paths" style={{ strokeWidth: args.initStroke * dynamicRatio }}>
          {countriesPaths}
        </g>
      </svg>
    </div>
  );
}

export default WorldDashboardMap;