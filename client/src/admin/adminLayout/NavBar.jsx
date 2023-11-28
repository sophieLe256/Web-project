import React, { useState } from 'react';
import "./adminLayout.css";

const Navbar = ({ onDarkModeChange }) => {
  return (
    <nav>
      {/* <input type="checkbox" id="switch-mode" hidden />
      <label htmlFor="switch-mode" className="switch-mode" onClick={onDarkModeChange}></label> */}
      {/* <a href="#" className="notification">
        <i className='bx bxs-bell'></i>
        <span className="num">0</span>
      </a> */}
      <a href="/" target="_blank" className="profile" style={{position: 'absolute', right: '2em'}}>
        <img src="/header-icon-1.webp" alt="Profile" />
      </a>
    </nav>
  );
}

export default Navbar;

