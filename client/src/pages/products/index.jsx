import React, { useState } from "react";
import "./products.css";
import { Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import MySecurity from "../../api/mySecurity";
import { ClientAPI, endPoint } from "../../api/clientAPI";

export const Products = () => {
  const productsPerPage = 12;
  const productsPerRow = 3;
  const maxVisibleButtons = 3;
  const [currentPage, setCurrentPage] = useState(searchParams.get('page') ? 1 : searchParams.get('page'));
  const [categoryID, setCategoryID] = useState(null);
  const [productData, setProductData] = useState(null);
  

  const location = useLocation();

  useEffect(async () => {
    const searchParams = new URLSearchParams(location.search);
    setCategoryID(searchParams.get('cat'));    
    // let fetch data
    try {
      const data = {
        page: currentPage,
        limit: productsPerPage,
        categoriesID: categoryID
      };
      const respond = await ClientAPI.post("getProduct", data);
      console.log("From Product.jsx: ",respond);
      setProductData(MySecurity.decryptedData(respond));
      if(productData.page != currentPage)
        setCurrentPage = productData.page;
    }
    catch (err){
      console.log("From Product.jsx: ", err);
    }  

  }, [location.search]);
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (categoryID)
      history.push(`/products?page=${page}`);
    else
      history.push(`/products?cat=${categoryID}&page=${page}`);
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const visiblePageNumbers = (() => {
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
      <div className="col-xl-10 col-lg-9 col-md-12 col-12 content-collection products-container">
        {
        productData.data.map((item, index) => (
          (index % productsPerRow === 0)?(
            <Row key={index}>
            {productData.data.slice(index,productsPerRow).map((product) => (
              <ProductItem key={product.id} data={product} />
              ))}
            </Row>
          ):({})          
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
          src={endPoint+data.image}
          alt="WebP rules."
        ></img>
      </Link>

      <div className="body-name body-text">{data.name}</div>
      <div className="body-price body-text">${data.price}</div>
    </Col>
  );
};