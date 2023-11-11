import React from "react";
import "./products.css";
import { Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { DUMMY_DATA } from "../../dummyData/dummyData";

export const Products = () => {
  const productsPerRow = 3;

  const chunkArray = (array, size) => {
    return array.reduce((chunks, item, index) => {
      if (index % size === 0) {
        chunks.push([item]);
      } else {
        chunks[chunks.length - 1].push(item);
      }
      return chunks;
    }, []);
  };

  const chunkedData = chunkArray(DUMMY_DATA, productsPerRow);

  return (
    <>
      <div className="col-xl-10 col-lg-9 col-md-12 col-12 content-collection products-container">
        {chunkedData.map((row, rowIndex) => (
          <Row key={rowIndex}>
            {row.map((product) => (
              <ProductItem key={product.id} data={product} />
            ))}
          </Row>
        ))}
      </div>
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

