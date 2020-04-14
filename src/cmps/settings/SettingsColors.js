import React, { useState } from 'react';
import SettingsService from '../../services/SettingsService';

import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../constants/CssVariable';
import ColorControl from '../helpers/ColorControl';
import Button from '../elements/Button';

function SettingsColors() {

  const [, forceUpdate] = useState();
  const saveColors = () => SettingsService.updateColorsLocalStorage();
  const resetColors = () => SettingsService.resetColorsLocalStorage() || forceUpdate({});

  return (
    <div className="settings-colors">
      <div className="colors-control">
        <h4 className="title">Primary Color</h4>
        <ColorControl colorVar={PRIMARY_COLOR} />
        <h4 className="title">Secondary Color</h4>
        <ColorControl colorVar={SECONDARY_COLOR} />
      </div>

      <div className="colors-btns">
        <Button text='Save' onClick={saveColors} />
        <Button text='Reset' onClick={resetColors} />
      </div>
    </div>
  );
}

export default SettingsColors;
