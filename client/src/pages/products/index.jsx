import React, { useState, useEffect } from "react";
import "./products.css";
import { Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate, useLocation } from "react-router-dom";

import ClientAPI, { endPoint } from "../../api/clientAPI";
import MySecurity from "../../api/mySecurity";


export const Products = () => {
  const productsPerPage = 12;
  const productsPerRow = 3;
  const maxVisibleButtons = 3;
  const location = useLocation();
  let searchParams = new URLSearchParams(location.search);
  const [currentPage, setCurrentPage] = useState(searchParams.get('page'));
  const [categoryID] = useState(searchParams.get('cat'));
  const [productData, setProductData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      try {
        const data = {
          page: currentPage,
          limit: productsPerPage,
          categoriesID: searchParams.get('cat')
        };
        const respond = await ClientAPI.post("getProduct", data);
        //console.log("From Product.jsx: ", respond.data.data);
        await setProductData(MySecurity.decryptedData(respond.data));
        if (respond.data.page !== currentPage)
          setCurrentPage(respond.data.page);
      }
      catch (err) {
        //console.log("From Product.jsx: ", err);
      }
    }
    fetchData();
  }, [location.search]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (categoryID === null)
      navigate(`/products?page=${page}`);
    else
      navigate(`/products?cat=${categoryID}&page=${page}`);
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const visiblePageNumbers = (() => {
    if (productData === null) return null;
    const halfMaxButtons = Math.floor(maxVisibleButtons / 2);
    let startPage = Math.max(1, currentPage - halfMaxButtons);
    let endPage = Math.min(productData.totalPage, startPage + maxVisibleButtons - 1);

    if (endPage - startPage + 1 < maxVisibleButtons) {
      startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
  })();

  return (
    <>
      {productData !== null && productData !== undefined ? (
        <div className="col-xl-10 col-lg-9 col-md-12 col-12 content-collection products-container">
          {
            productData.data.map((item, index) => (
              (index % productsPerRow === 0) ? (
                <Row key={index}>
                  {productData.data.slice(index, index + productsPerRow).map((product) => (
                    <ProductItem key={product.id} data={product} />
                  ))}
                </Row>
              ) : null
            ))
          }
          <div className="pagination">
            {visiblePageNumbers !== null && visiblePageNumbers.map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={currentPage === pageNumber ? "active" : ""}
              >
                {pageNumber}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="loading">
          <p>Loading...</p>
        </div>
      )}
    </>
  );
};

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