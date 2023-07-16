import React from "react";
import "./body.css";
import { Col, Container, Row } from "react-bootstrap";

export const Body = () => {
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
    <div className="body d-flex">
      <img
        role="button"
        className="image-left w-100"
        src="section-1.webp"
        alt="WebP rules."
      ></img>
      <img
        role="button"
        className="image-left width-80"
        src="section-2.webp"
        alt="WebP rules."
      ></img>
      <Container className="mt-5">
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
    </div>
  );
};

const ProductItem = ({ data }) => {
  return (
    <Col className="d-flex product-item">
      <img
        role="button"
        className="w-100"
        src={data.image}
        alt="WebP rules."
      ></img>
      <div className="name text">{data.name}</div>
      <div className="price text">{data.price}</div>
    </Col>
  );
};
