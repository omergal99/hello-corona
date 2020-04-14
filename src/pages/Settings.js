import React, { useState } from 'react';
import SettingsService from '../services/SettingsService';
// import { useSelector, useDispatch } from 'react-redux';
// import actions from '../store/actions';

import { PRIMARY_COLOR, SECONDARY_COLOR } from '../constants/CssVariable';
import ColorControl from '../cmps/helpers/ColorControl';

function Settings() {
  
  // const settingsStore = useSelector(state => state.settingsStore);
  // const dispatch = useDispatch();
  // const saveColors = () => dispatch(actions.updateColors());
  
  const [, forceUpdate] = useState();
  const saveColors = () => SettingsService.updateColorsLocalStorage();
  const resetColors = () => SettingsService.resetColorsLocalStorage() || forceUpdate({});

  return (
    <div className="settings">
      <div className="visual-settings flex-col">
        <h4 className="title">Primary Color</h4>
        <ColorControl colorVar={PRIMARY_COLOR} />
        <h4 className="title">Secondary Color</h4>
        <ColorControl colorVar={SECONDARY_COLOR} />
        <button onClick={saveColors}>Save Colors</button>
        <button onClick={resetColors}>Reset Colors</button>
      </div>
    </div>
  );
}

export default Settings;
