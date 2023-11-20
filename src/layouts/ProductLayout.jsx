//ul li link
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Products } from "../pages/products/index";
import { Tshirts } from "../pages/t-shirts/index";
import { Jackets } from "../pages/jackets/index";
import { Pants } from "../pages/pants/index";
import { Accessories } from "../pages/accessories/index";
import "./ProductLayout.css";
import { ProductsDetails } from "../pages/products-details";

export const ProductLayout = () => {
  const location = useLocation();

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
        {location.pathname === "/t-shirts" ? (
          <Tshirts>
            <ProductsDetails />
          </Tshirts>
        ) : location.pathname === "/jackets" ? (
          <Jackets>
            <ProductsDetails />
          </Jackets>
        ) : location.pathname === "/pants" ? (
          <Pants>
            <ProductsDetails />
          </Pants>
        ) : location.pathname === "/accessories" ? (
          <Accessories>
            <ProductsDetails />
          </Accessories>
        ) : (
          <Products>
            <ProductsDetails />
          </Products>
        )}
      </div>
    </>
  );
};
