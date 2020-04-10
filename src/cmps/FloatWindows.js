import React from 'react';
import ColorControl from '../cmps/helpers/ColorControl';

function FloatWindows({ onToggleFloatWindows }) {
  return (
    <div className="float-windows">
      <div className="wrap-color-control">
        <ColorControl />
        <span className="close-window" onClick={onToggleFloatWindows}>X</span>
      </div>
    </div>
  );
}

export default FloatWindows;
