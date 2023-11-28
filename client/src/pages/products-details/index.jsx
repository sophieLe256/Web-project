import React, { useState, useEffect } from "react";
import "./products-details.css";
import { useParams, useNavigate } from "react-router-dom";
import ClientAPI, { endPoint } from "../../api/clientAPI";
import MySecurity from "../../api/mySecurity";
import Cookies from "js-cookie";


export const ProductsDetails = () => {
  let { productID } = useParams();
  const [selectedSize, setSelectedSize] = useState("");  
  const [productData, setProductData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {    
    // let fetch data
    async function fetchData() {
    try {
      const data = {
        productID: productID,
      };
      const respond = await ClientAPI.post("getProductDetail", data);
      if(respond.data === null || respond.data === undefined)
      {
        alert("Not found Product Detail")
        navigate("/products?page=1")
      }

      //console.log("From ProductDetail.jsx: ", respond.data);
      setProductData(MySecurity.decryptedData(respond.data));     
    }
    catch (err) {
      //console.log("From ProductDetail.jsx: ", err);
    }
  }
    fetchData();
  }, []);

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = async (e) => {
    e.preventDefault(); 
    if(Cookies.get("userID") === undefined)
      navigate("/login");
    // let post data
    try {
      const data = {
        productID: productID,        
        selectedSize: (selectedSize===""?productData.size.split(",")[0]:selectedSize),
      };

      await ClientAPI.post("addCart", data);
      alert("Added item to cart");
      //console.log("From ProductDetail_AddCart.jsx: ", respond.data);
    }
    catch (err) {
      alert("Eorr in added item to cart");
      //console.log("From ProductDetail_AddCart.jsx: ", err);
    }
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <>
      <div id="product-template">
        <div className="product-detail">
          {productData !== null && productData !== undefined ? (
          <div className="product-info">
            <img src={endPoint+productData.image} alt={productData.name}></img>
            <div className="product-display">
              <h1 class="font-weight-bold">{productData.name}</h1>

              <div className="product-price-wrap">
                <span class="product-price font-weight-bold">${productData.price}</span>
              </div>

              <div className="product-desc">
                <p></p>
                <p>
                  <span style={{ fontSize: "15px" }}>
                    <strong>OVERSIZED FIT&nbsp;</strong>
                  </span>
                </p>
                <p>
                  <span style={{ fontSize: "14px" }}>
                    <strong>Features:</strong>
                  </span>
                </p>
                {productData.features.split("\n").map((feature, index) => (
                  <p key={index}>
                    <span style={{ fontSize: "14px" }}> • {feature}</span>
                  </p>
                ))}
                <p></p>
                <p></p>
              </div>

              <hr class="product-info-break" />

              <input
                type="hidden"
                id="selected-variant-1050687980"
                value="1113887328"
              />
              <div className="product-options product-options-1050687980">
                <div className="option option-size option-1 d-flex align-items-center">
                  <span
                    class="text-uppercase font-weight-bold"
                    style={{
                      paddingRight: "10px",
                      fontSize: "20px",
                      fontWeight: "600",
                      color: "var(--menu-color)",
                    }}
                  >
                    size:
                  </span>
                  <div className="product-options">
                    <div className="option-values">
                      {productData.size.split(",").map((size) => (
                        <label key={size} className={`size-label ${size === selectedSize ? 'active' : ''}`}>
                          <input
                            type="radio"
                            name="size"
                            value={size}
                            checked={size === selectedSize}
                            onChange={() => handleSizeChange(size)}
                          />
                          {size}
                        </label>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
              <div className="products-policy">
                <a
                  href="#"
                  data-toggle="modal"
                  data-target="#product-sizechart-modal"
                  class="product-size-chart text-uppercase font-weight-bold"
                >
                  Size guide
                </a>
                <div className="policy_pro">
                  <a
                    href="/pages/chinh-sach-doi-tra"
                    class="product-size-chart text-uppercase font-weight-bold"
                  >
                    RETURN POLICY
                  </a>
                </div>

                <a
                  href="#"
                  class="product-add-cart text-uppercase font-weight-bold"
                  onClick={(e) => handleAddToCart(e)}
                >
                  ADD TO CART{" "}
                  <img
                    src="https://file.hstatic.net/200000377411/file/bag_1be0c2089cc348b48ba2ce2672c0e056.png"
                    style={{
                      width: "20px",
                      height: "auto",
                      transform: "translateY(-3px)",
                    }}
                  />
                </a>

                <div className="bh-logo mt-4">
                  <img
                    width="150"
                    height="63"
                    src="/logo.webp"
                  />
                </div>
              </div>
            </div>
          </div>
          ):(
              <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
};
