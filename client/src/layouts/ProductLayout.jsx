//ul li link
import React from "react";
import { Link } from "react-router-dom";
import { Products } from "../pages/products/index";
import "./ProductLayout.css";
import { ProductsDetails } from "../pages/products-details";

export const ProductLayout = () => {
  const [categoriesData, setCategoriesData] = useState(null);

  useEffect(async () => {
    // let fetch data
    try {
      const data = {nothing:"nothing"};
      const respond = await ClientAPI.post("getCategories", data);
      console.log("From ProductLayout.jsx: ", respond);
      setCategoriesData(MySecurity.decryptedData(respond));
    }
    catch (err) {
      console.log("From ProductLayout.jsx: ", err);
    }

  }, [categoriesData]);

  return (
    <>
      <div className="menu-products-container">
        <div className="menu-products-nav">
          <ul className="menu-products-list">
            <li>
              <Link to="/Styles">Best Sell</Link>
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
