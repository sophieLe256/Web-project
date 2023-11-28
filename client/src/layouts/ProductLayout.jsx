//ul li link
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Products } from "../pages/products/index";
import "./ProductLayout.css";
import { ProductsDetails } from "../pages/products-details";
import ClientAPI from "../api/clientAPI";
import MySecurity from "../api/mySecurity";


export const ProductLayout = () => {
  const [categoriesData, setCategoriesData] = useState(null);

  useEffect(() => {
    async function fetchData() {
    // let fetch data
    try {
      const data = {nothing:"nothing"};
      const respond = await ClientAPI.post("getCategories", data);
      //console.log("From ProductLayout.jsx: ", respond.data);
      setCategoriesData(MySecurity.decryptedData(respond.data));
    }
    catch (err) {
      //console.log("From ProductLayout.jsx: ", err);
    }
  }
  fetchData();  
  }, []);

  return (
    <>
      <div className="menu-products-container">
        <div className="menu-products-nav">
          <ul className="menu-products-list">
            <li>
              <Link to="/Styles">Best Seller</Link>
            </li>
            <li>
              <Link to="/products?page=1">Products</Link>
            </li>
            {
              categoriesData.map((row) => (
                <li>
                  <Link to={`/products?cat=${row.categoriesID}&page=1`}>{row.type}</Link>
                </li>
              ))
            }
          </ul>
        </div>

        <Products>
          <ProductsDetails />
        </Products>

      </div>
    </>
  );
};
