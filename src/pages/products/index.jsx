import React from "react";
import "./products.css";
import { Col, Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { DUMMY_DATA } from "../dummyData/dummyData";

export const Products = () => {
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

