import React from "react";

function MapOptions({ isCirclesShow, isAutoFocus,
  onToggleIsCirclesShow, onToggleIsAutoFocus }) {


  return (
    <div className="map-options">
      <button className="toggle-btn" onClick={onToggleIsCirclesShow}>
        {isCirclesShow ? 'Hide Circles' : 'Show Circles'}
      </button>
      <button className="toggle-btn" onClick={onToggleIsAutoFocus}>
        {isAutoFocus ? 'Dissable Auto Focus' : 'Enable Auto Focus'}
      </button>
    </div>
  );
}

export default MapOptions;