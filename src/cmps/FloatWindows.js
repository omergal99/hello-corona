import React from 'react';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../constants/CssVariable';
import ColorControl from '../cmps/helpers/ColorControl';

function FloatWindows({ onToggleFloatWindows }) {
  return (
    <div className="float-windows">
      <div className="wrap-color-control">
        <h4 className="title">Primary Color</h4>
        <ColorControl colorVar={PRIMARY_COLOR}/>
        <h4 className="title">Secondary Color</h4>
        <ColorControl colorVar={SECONDARY_COLOR} />
        <span className="close-window" onClick={onToggleFloatWindows}>X</span>
      </div>
    </div>
  );
}

export default FloatWindows;
