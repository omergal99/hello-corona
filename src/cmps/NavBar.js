import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { toTitleCase } from '../services/UtilsService';
import VirusLogoSVG from './helpers/svg-icons/VirusLogoSVG';
import { WORLD_DASHBOARD, COUNTRY_VIEW, SETTINGS } from '../constants/RouterPaths';

function NavBar({ onToggleFloatWindows }) {

  const navLinks = [WORLD_DASHBOARD, COUNTRY_VIEW, SETTINGS];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [classAnimation, setClassAnimation] = useState('');

  const list = navLinks.map(link => (
    <NavLink className="nav-link" to={`/${link}`} replace key={link}>
      <span className="text">{toTitleCase(link)}</span>
    </NavLink>
  ))

  const menuClicked = () => {
    if (isMenuOpen) {
      setClassAnimation('animation-out');
      setTimeout(() => setIsMenuOpen(!isMenuOpen), 500);
      setTimeout(() => setClassAnimation(''), 500);
    } else {
      setClassAnimation('animation-in');
      setIsMenuOpen(!isMenuOpen);
      setTimeout(() => setClassAnimation(''), 500);
    }
  }

  return (
    <div className="nav-bar">
      <div className={`nav-menu ${isMenuOpen ? 'open' : ''}`} onClick={menuClicked}>
        <span className="text">Menu</span>
      </div>
      <div className={`wrap-nav-bar-links ${classAnimation}`}>
        {isMenuOpen &&
          <div className="nav-bar-links mobile">{list}</div>
        }
      </div>
      <div className="nav-bar-links desktop">{list}</div>

      <span className="float-windows-icon" onClick={onToggleFloatWindows}>+</span>
      <div className="wrap-icon-svg top-left"><VirusLogoSVG /></div>
      <div className="wrap-icon-svg top-right"><VirusLogoSVG /></div>
    </div>
  );
}

export default NavBar;
