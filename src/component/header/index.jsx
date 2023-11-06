import React,{useState} from "react";
import "./header.css";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export const Header = () => {
  const [isShow1, setIsShow1] = useState(false);
  const [isShow3, setIsShow3] = useState(false);
  const [isShow2, setIsShow2] = useState(false);
  const [isShow4, setIsShow4] = useState(false);


  return (
    <div className="header d-flex align-items-center">
       <Link to="/"  className="left d-flex justify-content-around">
        <img
          role="button"
          className="image-left"
          src="header_left.webp"
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
            {isShow3 && 
              <div className="shopping"  > shopping cart</div>
            }
            </div>
        </Link>
        </div>
        {/* go to the log in page */}
        <div className="hover-decor"> 
        <Link to="/auth/login">
        <div className="image-container" onMouseEnter={() => setIsShow4(true)} onMouseLeave={() => setIsShow4(false)}>
            <img
              role="button"
              className="image-right"
              src="header-icon-4.webp"
              alt="WebP rules."
            ></img>
            {isShow4 && 
              <div className="login" > login page</div>
            }
            </div>
        </Link>
        </div>
      </div>
    </div>
  );
};
