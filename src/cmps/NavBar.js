import React from 'react';
import { NavLink } from 'react-router-dom';

import { WORLD_DASHBOARD, COUNTRY_VIEW, TABLE_DATA } from '../constants/RouterPaths';

function NavBar() {

  const navLinks = [
    { route: WORLD_DASHBOARD, name: 'World Dashboard' },
    { route: COUNTRY_VIEW, name: 'Country View' },
    { route: TABLE_DATA, name: 'Table Data' }
  ]

  const list = navLinks.map(link => (
    <NavLink className="nav-link" to={`/${link.route}`} replace key={link.route}>
      <span className="text">{link.name}</span>
    </NavLink>
  ))

  return (
    <div className="nav-bar">
      {list}
    </div>
  );
}

export default NavBar;
