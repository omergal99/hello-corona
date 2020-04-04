import React from "react";

function SvgDefsFilterShadow() {
  return (
    <>
      <defs>
        <filter id="dropshadow" height="130%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
          <feOffset dx="2" dy="2" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.5" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <defs>
        <filter id="dropshadow-color" x="0%" y="0%" width="100%" height="100%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
          <feOffset in="blur" dx="0" dy="0" result="offsetBlur" />
          <feFlood floodColor="var(--color2-border)" floodOpacity="0.6" result="offsetColor" />
          <feComposite in="offsetColor" in2="offsetBlur" operator="in" result="offsetBlur" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </>
  );
}

export default SvgDefsFilterShadow;