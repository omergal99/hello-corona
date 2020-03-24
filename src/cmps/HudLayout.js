import React from 'react';

function HudLayout() {

  return (
    <div className="hud-layout">
      <div className="ui-elements">
        <div className="border-left border">
          <div className="dot-1 dot"></div>
          <div className="line-1 line strong"></div>
          <div className="line-2 line strong"></div>
          <div className="line-3 line strong"></div>
          <div className="line-4 line strong"></div>
          <div className="line-5 line strong"></div>
          <div className="line-6 line strong"></div>
        </div>
        <div className="border-top">
          <div className="border-top-left border">
            <div className="dot-1 dot"></div>
          </div>
          <div className="border-top-right border">
            <div className="dot-1 dot"></div>
            <div className="border-1 border"></div>
            <div className="dot-2 dot"></div>
          </div>
        </div>
        <div className="border-right border">
          <div className="dot-1 dot"></div>
          <div className="border-1 border"></div>
        </div>
        <div className="border-bottom border">
          <div className="dot-1 dot"></div>
        </div>
      </div>
    </div>
  );
}

export default HudLayout;
