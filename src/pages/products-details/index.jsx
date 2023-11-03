import React from "react";
import "./products-details.css";

export const ProductsDetails = () => {
  return (
    <>
      <div className="products-item">
        <div className="products-details">
            <div className="image-container">
              <img
                className="aspect-ratio"
                src="tee-1.webp"
                alt="WebP rules."
              ></img>
              <h5 className="name">B-RABOT TEE</h5>
              <h6 className="desc">$25.00</h6>
            </div>
          </div>

      </div>
    </>
  );
};
