import React, { useState } from 'react';
import SettingsService from '../../services/SettingsService';

import { PRIMARY_COLOR, SECONDARY_COLOR, BRIGHTNESS } from '../../constants/CssVariable';
import ColorControl from '../helpers/ColorControl';
import Button from '../elements/Button';

function SettingsColors() {

  const [, forceUpdate] = useState();
  const saveColors = () => SettingsService.updateColorsToLocalStorage();
  const resetColors = () => SettingsService.resetColorsLocalStorage() || forceUpdate({});

  return (
    <div className="settings-colors">
      <div className="wrap-color-control">
        <h4 className="title">Primary Color</h4>
        <ColorControl colorVar={PRIMARY_COLOR} max={360} />
        <h4 className="title">Secondary Color</h4>
        <ColorControl colorVar={SECONDARY_COLOR} max={360} />
        <h4 className="title">Brightness</h4>
        <ColorControl colorVar={BRIGHTNESS} max={3.5} step={0.05} />
      </div>

      <div className="colors-btns">
        <Button text='Save' onClick={saveColors} />
        <Button text='Reset' onClick={resetColors} />
      </div>
    </div>
  );
}

export default SettingsColors;
