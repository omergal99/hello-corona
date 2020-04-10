import React from 'react';

import ColorControl from '../cmps/helpers/ColorControl';
function Settings() {

  return (
    <div className="settings">
      <div className="visual-settings flex-col">
        <h4 className="title">Color Primary</h4>
        <ColorControl key="--base-color1" colorVar="--base-color1" />
        <h4 className="title">Color Secondary</h4>
        <ColorControl key="--base-color2" colorVar="--base-color2" />
      </div>
    </div>
  );
}

export default Settings;
