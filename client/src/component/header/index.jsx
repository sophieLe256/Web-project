import React, { useState, useEffect } from "react";
import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'js-cookie';
import ClientAPI from "../../api/clientAPI";
import { Toast } from 'react-bootstrap';

export const Header = () => {
  const [isShow1, setIsShow1] = useState(false);  
  const [isShow2, setIsShow2] = useState(false);
  const [isShow3, setIsShow3] = useState(false);
  const [isShow4, setIsShow4] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);
  const navigate = useNavigate();
  
  const handleCartUpdate = async () => {
    try {
      const data = { nothing: "nothing" };
      const respond = await ClientAPI.post("getNumberCartItem", data);
      //console.log("From HeaderGetCart.jsx: ", respond.data);
      setCartTotal(respond.data);
    }
    catch (err) {
      //console.log("From HeaderGetCart.jsx: ", err);
    }
  };
  const handleLogOut = async () => {
    try {
      const data = { nothing: "nothing" };
      const respond = await ClientAPI.post("logout", data);
      //console.log("From HeaderLogOut.jsx: ", respond.data);
      if (respond.data === "Log out")
      {
        Cookies.remove("userID");
        Cookies.remove("isAdmin");
        Cookies.remove("access_token");     
      }
      alert("Log Out success.")
      navigate("/");
    }
    catch (err) {
      //console.log("From HeaderLogOut.jsx: ", err);
      alert("Log Out got Error.")
    }
  };

  useEffect(() => {   
    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  return (
    <div className="header d-flex align-items-center">      
      <Link to="/" className="left d-flex justify-content-around">
        <img
          role="button"
          className="image-left"
          src="banner.png"
          alt="WebP rules."
        ></img>
        <img
          role="button"
          className="image-left"
          src="logo.webp"
          alt="WebP rules."
        ></img>
      </Link>
      <div className="right d-flex justify-content-around">
        {/* go to the about us page  */}
        <div className="hover-decor">
          <Link to="/about-us">
            <div className="image-container" onMouseEnter={() => setIsShow1(true)} onMouseLeave={() => setIsShow1(false)}>
              <img
                role="button"
                className="image-right"
                src="header-icon-1.webp"
                alt="WebP rules."
              ></img>
              {isShow1 &&
                <div className="message"> about us</div>
              }
            </div>
          </Link>
        </div>
        {/* go to the product page */}
        <div className="hover-decor">
          <Link to="/products">
            <div className="image-container" onMouseEnter={() => setIsShow2(true)} onMouseLeave={() => setIsShow2(false)}>
              <img
                role="button"
                className="image-right"
                src="header-icon-2.webp"
                alt="WebP rules."
              ></img>
              {isShow2 &&
                <div className="search-bar">
                  <input
                    type="text"
                    className="search"
                    placeholder="Find your product"></input>
                </div>
              }
            </div>
          </Link>
        </div>
        {/* go to the shopping cart page */}
        <div className="hover-decor">
          <Link to="/shopping-cart">
            <div className="image-container" onMouseEnter={() => setIsShow3(true)} onMouseLeave={() => setIsShow3(false)}>
              <img
                role="button"
                className="image-right"
                src="header-icon-3.webp"
                alt="WebP rules."
              ></img>
              <span className="count-holder">
                <span className="count">{cartTotal}</span>
              </span>
              {isShow3 &&
                <div className="shopping"> shopping cart</div>
              }
            </div>
          </Link>
        </div>
        {/* go to the log in page */}
        <div className="hover-decor">
          <div className="image-container" onMouseEnter={() => setIsShow4(true)} onMouseLeave={() => setIsShow4(false)}>
            <img
              role="button"
              className="image-right"
              src="header-icon-4.webp"
              alt="WebP rules."
            ></img>
            { isShow4 && (Cookies.get("userID") ===undefined?(
              <div className="login">
                <ul>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>                               
                </ul>
              </div>
            ):(
              <div className="login">
                <ul>
                    {Cookies.get("isAdmin") !== undefined && Cookies.get("isAdmin") === '1' && (
                      <li>
                        <Link to="/adminDashboard">Account</Link>
                      </li>
                    )}                  
                  <li>
                      <Link to="/order-history">Order History</Link>
                  </li>
                    <li>
                      <Link to="/" onClick={handleLogOut} >Logout</Link> 
                    </li>
                </ul>
              </div>
            ))}
            
          </div>
        </div>

      </div>
    </div>
  );
};
