import React from 'react';
import { NavLink } from 'react-router-dom';

import { WORLD_DASHBOARD, COUNTRY_VIEW } from '../constants/RouterPaths';

function NavBar() {
  return (
    <div className="nav-bar">
      <NavLink to={`/${WORLD_DASHBOARD}`}>World Dashboard</NavLink>
      <NavLink to={`/${COUNTRY_VIEW}`}>Country View</NavLink>
    </div>
  );
}

export default NavBar;
