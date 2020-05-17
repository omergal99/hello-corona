import React from 'react';
import { PRIMARY_COLOR, SECONDARY_COLOR, BRIGHTNESS } from '../constants/CssVariable';
import ColorControl from '../cmps/helpers/ColorControl';

function FloatWindows({ onToggleFloatWindows }) {
  return (
    <div className="float-windows">
      <div className="wrap-color-control">
        <div className="wrap-close-window">
          <button className="close-window" onClick={onToggleFloatWindows}>X</button>
        </div>
        <h4 className="title">Primary Color</h4>
        <ColorControl colorVar={PRIMARY_COLOR} max={360} />
        <h4 className="title">Secondary Color</h4>
        <ColorControl colorVar={SECONDARY_COLOR} max={360} />
        <h4 className="title">Theme Brightness</h4>
        <ColorControl colorVar={BRIGHTNESS} max={3.5} step={0.05} />
      </div>
    </div>
  );
}

export default FloatWindows;
