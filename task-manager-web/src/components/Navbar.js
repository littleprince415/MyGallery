// src/components/Navbar.js
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css'; // Import CSS file for styling

const Navbar = ({ isLoggedIn, handleLogout }) => {
  const [isDown, setIsDown] = useState(false);

  const toggleNavbar = () => {
    setIsDown(!isDown);
  };

  return (
      <div className="navbar-inner">
        <div className="brand">
          IN THE CLOUDS <i className="fa fa-cloud" style={{ textShadow: '1px 1px white, -1px -1px #666' }}></i>
        </div>

        <ul className="nav">
          <li className="nav-item">
            <NavLink exact to="/" className="nav-link" activeClassName="active">Home</NavLink>
          </li>
          {isLoggedIn ? (
            <>
              <li className="nav-item">
                <NavLink to="/profile" className="nav-link" activeClassName="active">Profile</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/tasks" className="nav-link" activeClassName="active">Tasks</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/login" className="nav-link" onClick={handleLogout}>Logout</NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <NavLink to="/login" className="nav-link" activeClassName="active">Login</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/register" className="nav-link" activeClassName="active">Register</NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
  );
}

export default Navbar;
