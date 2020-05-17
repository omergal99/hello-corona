import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import actions from '../store/actions';

import VoiceOn from './helpers/svg-icons/VoiceOn';
import VoiceOff from './helpers/svg-icons/VoiceOff';
import ColorPalette from './helpers/svg-icons/ColorPalette';
import VirusLogoSVG from './helpers/svg-icons/VirusLogoSVG';

import { toTitleCase } from '../services/UtilsService';
import { WORLD_DASHBOARD, COUNTRY_VIEW, SETTINGS, GRAPHS } from '../constants/RouterPaths';

function NavBar({ onToggleFloatWindows }) {

  const navLinks = process.env.NODE_ENV === 'production'
    ? [WORLD_DASHBOARD, COUNTRY_VIEW, SETTINGS]
    : [WORLD_DASHBOARD, COUNTRY_VIEW, SETTINGS, GRAPHS];

  const dispatch = useDispatch();
  const settingsStore = useSelector(state => state.settingsStore);
  const { isCountryVoice } = settingsStore ? settingsStore.sounds : { isCountryVoice: false };

  const onToggleIsCountryVoice = () => dispatch(actions.toggleIsCountryVoice());

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [classAnimation, setClassAnimation] = useState('');

  const list = navLinks.map(link => (
    <NavLink className="nav-link" to={`/${link}`} replace key={link}>
      <span className="text">{toTitleCase(link)}</span>
    </NavLink>
  ))

  const menuClicked = () => {
    if (classAnimation) return;
    if (isMenuOpen) {
      setClassAnimation('height-animation-out');
      setTimeout(() => setIsMenuOpen(!isMenuOpen), 500);
    } else {
      setClassAnimation('height-animation-in');
      setIsMenuOpen(!isMenuOpen);
    }
    setTimeout(() => setClassAnimation(''), 500);
  }

  const menuOpenClass = isMenuOpen && classAnimation !== 'height-animation-out' ? 'open' : '';
  return (
    <div className="nav-bar">
      <div className="links">
        <div className={`nav-menu ${menuOpenClass}`} onClick={menuClicked}>
          <span className="text">Menu</span>
        </div>
        <div className={`wrap-nav-bar-links ${classAnimation}`}>
          {isMenuOpen &&
            <div className="nav-bar-links mobile">{list}</div>
          }
        </div>
        <div className="nav-bar-links desktop">{list}</div>
      </div>

      <div className="controls">
        <div className="color-palette" onClick={onToggleFloatWindows}><ColorPalette /></div>
        {isCountryVoice
          ? <div className="country-voice" onClick={onToggleIsCountryVoice}><VoiceOn /></div>
          : <div className="country-voice" onClick={onToggleIsCountryVoice}><VoiceOff /></div>
        }
      </div>

      <div className="wrap-icon-svg top-left"><VirusLogoSVG /></div>
      <div className="wrap-icon-svg top-right"><VirusLogoSVG /></div>
    </div>
  );
}

export default NavBar;
