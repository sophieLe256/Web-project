//ul li link
import React from "react";
import { Link } from "react-router-dom";
import { Products } from "../pages/products/index";
import "./ProductLayout.css";
import { ProductsDetails } from "../pages/products-details";

export const ProductLayout = () => {
  return (
    <>
      <div className="menu-products-container">
      
          <div className="menu-products-nav">
            <ul className="menu-products-list">
              <li>
                <Link to="/best-seller">Best Seller</Link>
              </li>
              <li>
                <Link to="/products">Products</Link>
              </li>
              <li>
                <Link to="/t-shirts">T-Shirts</Link>
              </li>
              <li>
                <Link to="/jackets">Jackets</Link>
              </li>
              <li>
                <Link to="/pants">Pants</Link>
              </li>
              <li>
                <Link to="/accessories">Accessories</Link>
              </li>
              <li>
                <Link to="/outlet-sale">Outlet Sale</Link>
              </li>
            </ul>
          </div>
        <Products>
        <ProductsDetails/>
        </Products>
      </div>
       
    </>
  );
};
