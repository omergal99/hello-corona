import React, { useState } from 'react';

function Settings() {

  const [value, setValue] = useState(200);

  const updateColor = ({ target }) => {
    setValue(target.value);
    document.documentElement.style.setProperty('--base-color1', target.value);
  }

  return (
    <div className="settings">
      <div className="visual-settings">
        <div className="base-color flex-col">
          <span>{value}</span>
          <input type="range" min="0" max="360" value={value} step="1"
            onInput={updateColor} onChange={updateColor} />
        </div>
      </div>
    </div>
  );
}

export default Settings;
