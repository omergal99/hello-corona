import React from "react";

function MapOptions({ isGCirclesShow, onToggleCircles }) {


  return (
    <div className="map-options">
      {/* <button className="toggle-circles" onClick={onToggleCircles}>Click</button> */}
      <button className="toggle-circles"
        onClick={() => onToggleCircles(!isGCirclesShow)}>
        {isGCirclesShow ? 'Hide Circles' : 'Show Circles'}
      </button>
    </div>
  );
}

export default MapOptions;