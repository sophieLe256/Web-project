import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './adminLayout.css';

const Sidebar = ({ hidden }) => {
  const location = useLocation();
  const [activeMenuItem, setActiveMenuItem] = useState(0);

  const allSideMenu = [
    { text: 'Dashboard', icon: 'bxs-dashboard', href: '/adminDashboard' },
    { text: 'Products', icon: 'bxs-shopping-bag-alt', href: '/adminProduct' },
    { text: 'Analytics', icon: 'bxs-doughnut-chart', href: '/analytics' },
  ];

  const handleMenuItemClick = (index, route) => {
    setActiveMenuItem(index);
    // You can perform additional logic here based on the route if needed
  };

  return (
    <section id="sidebar" className={hidden ? 'hide' : ''}>
      <Link to="/adminDashboard" className="brand">
        <i className="bx bxs-smile"></i>
        <span className="text">AdminBunny</span>
      </Link>
      <ul className="side-menu top">
        {allSideMenu.map((item, index) => (
          <li key={index} className={location.pathname === item.href ? 'active' : ''}>
            <Link
              to={item.href}
              onClick={() => handleMenuItemClick(index, item.href)}
            >
              <i className={`bx ${item.icon}`}></i>
              <span className="text">{item.text}</span>
            </Link>
          </li>
        ))}
      </ul>
      <ul className="side-menu">        
        <li>
          <Link to="/logout" className="logout">
            <i className="bx bxs-log-out-circle"></i>
            <span className="text">Logout</span>
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default Sidebar;
