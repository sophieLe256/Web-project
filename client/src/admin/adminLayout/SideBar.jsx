import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './adminLayout.css';
import ClientAPI from "../../api/clientAPI";


const Sidebar = ({ hidden }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeMenuItem, setActiveMenuItem] = useState(0);
  const allSideMenu = [
    { text: 'Dashboard', icon: 'bxs-dashboard', href: '/adminDashboard' },
    { text: 'Products', icon: 'bxs-shopping-bag-alt', href: '/adminProduct' },
  ];

  const handleMenuItemClick = (index, route) => {
    setActiveMenuItem(index);
    // You can perform additional logic here based on the route if needed
  };

  const handleLogOut = async () => {
    try {
      const data = { nothing: "nothing" };
      await ClientAPI.post("logout", data);
      //console.log("From HeaderLogOut.jsx: ", respond.data);     
      navigate("/");
    }
    catch (err) {
      //console.log("From HeaderLogOut.jsx: ", err);
    }
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
      <ul className="side-menu" style={{position:'absolute', bottom:'2em'}}>        
        <li>         
          <Link to="/" className="logout" onClick={handleLogOut}>
            <i className="bx bxs-log-out-circle"></i>
            <span className="text">Logout</span>
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default Sidebar;
