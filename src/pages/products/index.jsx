import React from "react";
import "./products.css";
import { Col, Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

export const Products = () => {
  const DUMMY_DATA = [
    {
      image: "product-1.webp",
      name: "RABBIT POCKET SHIRT",
      price: "420 000 VND",
    },
    {
      image: "product-2.webp",
      name: "CREAM CARROT RABBIT SHORTS",
      price: "450 000 VND",
    },
    {
      image: "product-3.webp",
      name: "BLACK CARROT RABBIT SHORTS",
      price: "450 000 VND",
    },
    {
      image: "product-4.webp",
      name: "CREAM STRIPE RABBIT POLO",
      price: "450 000 VND",
    },
    {
      image: "product-5.webp",
      name: "RABBIT IN THE BOX TEE",
      price: "400 000 VND",
    },
    {
      image: "product-6.jpg",
      name: "HIDDEN RABBIT BACKPACK",
      price: "700 000 VND",
    },
  ];
  return (
    <>
      <Container className="mt-5 border-0">
        <Row>
          {DUMMY_DATA.slice(0, 3).map((p, i) => {
            return <ProductItem key={i} data={p} />;
          })}
        </Row>
        <Row>
          {DUMMY_DATA.slice(3, 6).map((p, i) => {
            return <ProductItem key={i} data={p} />;
          })}
        </Row>
      </Container>
    </>
  );
};

const ProductItem = ({ data }) => {
  return (
    <Col className="d-flex product-item">
      <Link to="/products-details">
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
