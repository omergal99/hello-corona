import React, { useState } from 'react';
import RainbowRange from './RainbowRange';

function ColorControl({ colorVar = '--base-color1' }) {
  const initColor1 = document.documentElement.style.getPropertyValue(colorVar);
  const [valueColor1, setValueColor1] = useState(initColor1);

  const updateColor = ({ target }) => {
    setValueColor1(target.value);
    document.documentElement.style.setProperty(colorVar, target.value);
  }
  return (
    <RainbowRange value={valueColor1} onUpdateColor={updateColor} />
  );
}

export default ColorControl;
