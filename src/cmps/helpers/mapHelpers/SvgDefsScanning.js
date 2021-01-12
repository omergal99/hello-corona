import React from "react";

function SvgDefsScanning() {
  return (
    <>
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0" y2="100%">
          <stop offset="0%" style={{ stopColor: "var(--color1-border)" }} />
          <stop offset="25%" style={{ stopColor: "#82dcff" }} />
          <stop offset="50%" style={{ stopColor: "var(--color2-border)" }} />
          <stop offset="75%" style={{ stopColor: "#82dcff" }} />
          <stop offset="100%" style={{ stopColor: "var(--color1-border)" }} />
        </linearGradient>

        <pattern id="pattern" x="0" y="0" width="300%" height="300%" 
        patternUnits="objectBoundingBox"
        >
          <rect x="0" y="0" width="300%" height="150%" fill="url(#gradient)">
            <animate attributeType="XML"
              attributeName="y"
              from="0" to="150%"
              dur="6s"
              repeatCount="indefinite" />
          </rect>
          <rect x="0" y="-150%" width="300%" height="150%" fill="url(#gradient)">
            <animate attributeType="XML"
              attributeName="y"
              from="-150%" to="0"
              dur="6s"
              repeatCount="indefinite" />
          </rect>
        </pattern>
      </defs>
    </>
  );
}

export default SvgDefsScanning;