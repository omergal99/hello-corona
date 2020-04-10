import React from 'react';

function RainbowRange({ value, onUpdateColor, colorVar }) {
  return (
    <input className={`rainbow-range class${colorVar}`} type="range" min="0" max="360" value={value} step="1"
      onInput={onUpdateColor} onChange={onUpdateColor} />
  );
}

export default RainbowRange;
