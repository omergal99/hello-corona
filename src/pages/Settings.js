import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import actions from '../store/actions';

import SettingsColors from '../cmps/settings/SettingsColors';

function Settings() {

  // const settingsStore = useSelector(state => state.settingsStore);
  // const dispatch = useDispatch();
  // const saveColors = () => dispatch(actions.updateColors());

  return (
    <div className="settings">
      <div className="visual-settings flex-col">
        <SettingsColors />
      </div>
    </div>
  );
}

export default Settings;
