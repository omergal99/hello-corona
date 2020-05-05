import React, { useState, useEffect } from 'react';

function ColorControl({ colorVar = '--default-css-var', min = 0, max = 100, step = 1 }) {

  // const initColor = Number(document.styleSheets[0].cssRules[0].style.getPropertyValue(colorVar));
  const initColor = Number(getComputedStyle(document.documentElement).getPropertyValue(colorVar));
  const [valueColor, setValueColor] = useState(initColor);

  const updateColor = ({ target }) => {
    setValueColor(target.value);
    document.documentElement.style.setProperty(colorVar, target.value);
  }

  useEffect(() => {
    (() => setValueColor(Number(getComputedStyle(document.documentElement).getPropertyValue(colorVar))))();
  })

  return (
    <input type="range" className={`color-control class${colorVar}`}
      min={min} max={max} step={step}
      value={valueColor}
      onInput={updateColor} onChange={updateColor} />
  );
}

export default ColorControl;
