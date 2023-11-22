import React, { useState } from "react";
import "./pants.css";
import { Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { DUMMY_DATA } from "../../dummyData/dummyData";

export const Pants = () => {
  const productsPerPage = 12;
  const maxVisibleButtons = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  // Filter data based on category
  const pantsData = DUMMY_DATA.filter((product) => product.categories === "Pants");

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const paginatedData = pantsData.slice(startIndex, endIndex);

  const totalPages = Math.ceil(pantsData.length / productsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    navigate(`/products?page=${page}`);
    
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

  const chunkedData = chunkArray(paginatedData, 3);

  const visiblePageNumbers = (() => {
    const halfMaxButtons = Math.floor(maxVisibleButtons / 2);
    let startPage = Math.max(1, currentPage - halfMaxButtons);
    let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

    if (endPage - startPage + 1 < maxVisibleButtons) {
      startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
  })();

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

        <div className="pagination">
          {visiblePageNumbers.map((pageNumber) => (
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
      <div className="body-price body-text">${data.price}</div>
    </Col>
  );
};