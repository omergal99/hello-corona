import React from 'react';
import { PRIMARY_COLOR, SECONDARY_COLOR, BRIGHTNESS } from '../constants/CssVariable';
import ColorControl from '../cmps/helpers/ColorControl';

function FloatWindows({ onToggleFloatWindows }) {
  return (
    <div className="float-windows">
      <div className="wrap-color-control">
        <h4 className="title">Primary Color</h4>
        <ColorControl colorVar={PRIMARY_COLOR} max={360} />
        <h4 className="title">Secondary Color</h4>
        <ColorControl colorVar={SECONDARY_COLOR} max={360} />
        <h4 className="title">Brightness</h4>
        <ColorControl colorVar={BRIGHTNESS} max={3.5} step={0.05} />
        <span className="close-window" onClick={onToggleFloatWindows}>X</span>
      </div>
    </div>
  );
}

export default FloatWindows;
