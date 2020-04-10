import React from 'react';

function RainbowRange({ value, onUpdateColor }) {
  return (
    <input className="rainbow-range" type="range" min="0" max="360" value={value} step="1"
      onInput={onUpdateColor} onChange={onUpdateColor} />
  );
}

export default RainbowRange;
