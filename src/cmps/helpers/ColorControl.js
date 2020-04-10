import React, { useState } from 'react';
import RainbowRange from './RainbowRange';

function ColorControl({ colorVar = '--base-color1' }) {

  // const initColor = Number(document.styleSheets[0].cssRules[0].style.getPropertyValue(colorVar));
  const initColor = Number(getComputedStyle(document.documentElement).getPropertyValue(colorVar));
  const [valueColor, setValueColor] = useState(initColor);

  const updateColor = ({ target }) => {
    setValueColor(target.value);
    document.documentElement.style.setProperty(colorVar, target.value);
  }
  
  return (
    <RainbowRange value={valueColor} colorVar={colorVar} onUpdateColor={updateColor} />
  );
}

export default ColorControl;
