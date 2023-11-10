import React from "react";
import "./body.css";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { DUMMY_DATA } from "../../dummyData/dummyData";

export const Body = () => {
  return <>

    <div className="body d-flex">
      <div className="header-menu">
        <div className="overlay-box">
          {/* Menu */}
          <ul className="menu-list">
            <li><Link to="/best-seller">Best Seller</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/t-shirts">T-Shirts</Link></li>
            <li><Link to="/jackets">Jackets</Link></li>
            <li><Link to="/pants">Pants</Link></li>
            <li><Link to="/accessories">Accessories</Link></li>
            <li><Link to="/outlet-sale">Outlet Sale</Link></li>
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
            <p><Link to="./style">BEST-SELLING ITEMS</Link></p>
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
              <div className="list-banner w-85">
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
            <p><Link to="./style">NEW ARRIVALS</Link></p>
          </div>
        </div>
      </div>

      <Container className="border-0 product-new-arival">
        <Row>
          {DUMMY_DATA.slice(0, 3).reverse().map((p, i) => {
            return <ProductItem key={i} data={p} />;
          })}
        </Row>
        <Row>
          {DUMMY_DATA.slice(3, 6).reverse().map((p, i) => {
            return <ProductItem key={i} data={p} />;
          })}
        </Row>
      </Container>

    </div>
  </>

}


const ProductItem = ({ data }) => {
  return (
    <Col className="d-flex product-item">
      <Link to={`/products-details/${data.id}`}>
        <img
          role="button"
          className="w-100"
          src={data.image}
          alt="WebP rules."
        ></img>
      </Link>

      <div className="body-name body-text">{data.name}</div>
      <div className="body-price body-text">{data.price}</div>
    </Col>
  );
};

