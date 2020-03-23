import React from 'react';

function HudLayout() {

  return (
    <div className="hud-layout">
      <div className="ui-elements">
        <div className="border-left">
          <div className="dot"></div>
          <div className="strong-line line-1"></div>
          <div className="strong-line line-2"></div>
        </div>
        <div className="border-top">
          <div className="border-top-left">
            <div className="dot"></div>
          </div>
          <div className="border-top-right">
            <div className="dot"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HudLayout;
