import React from 'react';
import { NavLink } from 'react-router-dom';

import { WORLD_DASHBOARD, COUNTRY_VIEW ,TABLE_DATA} from '../constants/RouterPaths';

function NavBar() {
  return (
    <div className="nav-bar">
      <NavLink className="nav-link" to={`/${WORLD_DASHBOARD}`}>
        <span className="text">World Dashboard</span>
      </NavLink>
      <NavLink className="nav-link" to={`/${COUNTRY_VIEW}`}>
        <span className="text">Country View</span>
      </NavLink>
      <NavLink className="nav-link" to={`/${TABLE_DATA}`}>
        <span className="text">Table Data</span>
      </NavLink>
    </div>
  );
}

export default NavBar;
