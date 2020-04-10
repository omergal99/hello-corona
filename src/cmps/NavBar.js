import React from 'react';
import { NavLink } from 'react-router-dom';
import { toTitleCase } from '../services/UtilsService';

import { WORLD_DASHBOARD, COUNTRY_VIEW, SETTINGS } from '../constants/RouterPaths';

function NavBar({ onToggleFloatWindows }) {

  const navLinks = [WORLD_DASHBOARD, COUNTRY_VIEW, SETTINGS];

  const list = navLinks.map(link => (
    <NavLink className="nav-link" to={`/${link}`} replace key={link}>
      <span className="text">{toTitleCase(link)}</span>
    </NavLink>
  ))

  return (
    <div className="nav-bar">
      <div className="nav-bar-links">
        {list}
      </div>
      <span className="float-windows-icon" onClick={onToggleFloatWindows}>+</span>
    </div>
  );
}

export default NavBar;
