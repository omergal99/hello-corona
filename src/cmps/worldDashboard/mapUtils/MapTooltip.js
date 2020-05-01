import React from "react";
import UtilsService from '../../../services/UtilsService';
function MapTooltip({ tooltip }) {

  return (
    <div className="map-tooltip" style={tooltip.style}>
      <img className="tooltip-img" alt="Flag"
        src={UtilsService.getImgSrc(`flags/${tooltip.alpha2.toLowerCase()}.png`)} />
      <span className="tooltip-title">{tooltip.name}</span>
    </div>
  );
}

export default MapTooltip;