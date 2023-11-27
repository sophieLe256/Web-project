import React, { useState, useEffect } from "react";
import "./body.css";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import ClientAPI, {endPoint} from "../../api/clientAPI";
import MySecurity from "../../api/mySecurity";


export const Body = () => {
  // Define the number of products per row

  const [categoriesData, setCategoriesData] = useState(null);
  const [newProductData, setNewProductData] = useState(null);  
  const productsPerRow = 3;  

  useEffect( () => {
    async function fetchData() {
      // let fetch data
      try {
        const data = { limit: 6 };
        let respond1 = await ClientAPI.post("getCategories", data);
        setCategoriesData(MySecurity.decryptedData(respond1.data));

        let respond2 = await ClientAPI.post("getNewestProduct", data);
        setNewProductData(MySecurity.decryptedData(respond2.data));
      }
      catch (err) {
        console.log("From ProductLayout.jsx: ", err);
      }
    }
    fetchData();
  }, []);
  
  if (categoriesData === null) {
    return (
      <div className="loading">
        <p>Loading...</p>
      </div>
    );
  }

  return <>
    <div className="body d-flex">
      <div className="header-menu">
        <div className="overlay-box">
          {/* Menu */}
          <ul className="menu-list">          
            <li>
              <Link to="/styles">Best Seller</Link>
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
        <img
          role="button"
          className="image-left w-100"
          src="background.webp"
          alt="WebP rules."
        ></img>
      </div>

      {/* Make your Style section */}
      <div className="make-style">
        <p><Link to="/styles">MAKE YOUR STYLE</Link></p>
      </div>
      <div className="banner w-80">
        <div className="row">
          <div class="col-12 col-sm-6 col-lg-6 col-xl-6">
            <div class="banner">
              <img
                className="aspect-ratio"
                src="style-6.webp"
                alt="WebP rules."
              ></img>
            </div>
          </div>
          <div class="col-12 col-sm-6 col-lg-6 col-xl-6">
            <div class="banner">
              <img
                className="aspect-ratio"
                src="style-7.webp"
                alt="WebP rules."
              ></img>
            </div>
          </div>
          <div class="col-12 col-sm-6 col-lg-6 col-xl-6">
            <div class="banner">
              <img
                className="aspect-ratio"
                src="style-8.webp"
                alt="WebP rules."
              ></img>
            </div>
          </div>
          <div class="col-12 col-sm-6 col-lg-6 col-xl-6">
            <div class="banner">
              <img
                className="aspect-ratio"
                src="style-9.webp"
                alt="WebP rules."
              ></img>
            </div>
          </div>

          {/* Best-Selling Products */}
          <div className="title-selling">
            <p><Link to="./styles">BEST-SELLING ITEMS</Link></p>
          </div>
          <div className="collections">
            <div className="container">
              <div className="list-items">
                <div className="image-container">
                  <img
                    className="aspect-ratio"
                    src="tee-1.webp"
                    alt="WebP rules."
                  ></img>
                  <h5 className="name">B-RABOT TEE</h5>
                  <h6 className="desc">$25.00</h6>
                </div>
                <div className="image-container">
                  <img
                    className="aspect-ratio"
                    src="tee-2.webp"
                    alt="WebP rules."
                  ></img>
                  <h5 className="name">B-RABOT TEE</h5>
                  <h6 className="desc">$25.00</h6>
                </div>
                <div className="image-container">
                  <img
                    className="aspect-ratio"
                    src="tee-3.webp"
                    alt="WebP rules."
                  ></img>
                  <h5 className="name">B-RABOT TEE</h5>
                  <h6 className="desc">$25.00</h6>
                </div>
              </div>
            </div>
          </div>

          {/* Banner */}
          <div className="scroll">
            <div className="container">
              <div className="list-banner w-80">
                <div className="scroll-banner-left">
                  <div className="banner">
                    <img
                      className="aspect-ratio"
                      src="style-10.webp"
                      alt="WebP rules."
                    ></img>
                  </div>
                </div>
                <div className="scroll-banner-right">
                  <div className="banner">
                    <img
                      className="aspect-ratio"
                      src="style-5.webp"
                      alt="WebP rules."
                    ></img>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* NEW ARRIVALS */}
          <div className="title-arrivals">
            <p><Link to="./styles">NEW ARRIVALS</Link></p>
          </div>
        </div>
      </div>

      <Container className="border-0 product-new-arival">
        {newProductData!== null &&
          newProductData.map((item, index) => (
            (index % productsPerRow === 0) ? (
              <Row key={index}>
                {newProductData.slice(index, productsPerRow).map((product) => (
                  <ProductItem key={product.id} data={product} />
                ))}
              </Row>
            ) : null
          ))}       
      </Container>

    </div>
  </>

}


const ProductItem = ({ data }) => {
  return (
    <Col className="d-flex product-item">
      <Link to={`/products-details/${data.productID}`}>
        <img
          role="button"
          className="w-100"
          src={endPoint + data.image}
          alt="WebP rules."
        ></img>
      </Link>

      <div className="body-name body-text">{data.name}</div>
      <div className="body-price body-text">${data.price}</div>
    </Col>
  );
};

