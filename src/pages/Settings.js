import React from 'react';

import SettingsColors from '../cmps/settings/SettingsColors';

function Settings() {

  return (
    <div className="settings">
      <div className="visual-settings flex-col">
        <SettingsColors />
      </div>
    </div>
  );
}

export default Settings;
