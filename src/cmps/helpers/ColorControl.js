import React, { useState, useEffect } from 'react';
import RainbowRange from './RainbowRange';

function ColorControl({ colorVar = '--default-css-var' }) {

  // const initColor = Number(document.styleSheets[0].cssRules[0].style.getPropertyValue(colorVar));
  const initColor = Number(getComputedStyle(document.documentElement).getPropertyValue(colorVar));
  const [valueColor, setValueColor] = useState(initColor);

  const updateColor = ({ target }) => {
    setValueColor(target.value);
    document.documentElement.style.setProperty(colorVar, target.value);
  }

  // const forceUpdate = useCallback(() => {
  //   setValueColor(Number(getComputedStyle(document.documentElement).getPropertyValue(colorVar)));
  // }, [colorVar]);

  useEffect(() => {
    // const forceUpdate = (() => {
    //   setValueColor(Number(getComputedStyle(document.documentElement).getPropertyValue(colorVar)));
    // });
    // forceUpdate();
    (() =>
      setValueColor(Number(getComputedStyle(document.documentElement).getPropertyValue(colorVar)))
    )();
  })

  return (
    <RainbowRange value={valueColor} colorVar={colorVar} onUpdateColor={updateColor} />
  );
}

export default ColorControl;
