import React from 'react';
import ColorControl from '../cmps/helpers/ColorControl';

function FloatWindows({ onToggleFloatWindows }) {
  return (
    <div className="float-windows">
      <div className="wrap-color-control">
        <h4 className="title">Primary Color</h4>
        <ColorControl key="--base-color1" colorVar="--base-color1" />
        <h4 className="title">Secondary Color</h4>
        <ColorControl key="--base-color2" colorVar="--base-color2" />
        <span className="close-window" onClick={onToggleFloatWindows}>X</span>
      </div>
    </div>
  );
}

export default FloatWindows;
