import React from "react";
import "./products-details.css";
import { useParams } from "react-router-dom";
import { DUMMY_DATA } from "../../dummyData/dummyData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";

export const ProductsDetails = () => {
  let { productId } = useParams();
  const selectedProduct = DUMMY_DATA.find(
    (product) => product.id.toString() === productId
  );

  if (!selectedProduct) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <div id="product-template">
        <div class="product-detail">
          <div class="product-info">
            <img src={selectedProduct.image} alt={selectedProduct.name}></img>
            <div className="product-display">
              <h1 class="font-weight-bold">{selectedProduct.name}</h1>

              <div class="product-price-wrap">
                <span class="product-price font-weight-bold">{selectedProduct.price}</span>
              </div>

              <div class="product-desc">
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
                {selectedProduct.features.map((feature, index) => (
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
              <div class="product-options product-options-1050687980">
                <div class="option option-size option-1 d-flex align-items-center">
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
                  <div class="option-values">
                    {selectedProduct.size.map((size) => (
                      <span
                        key={size}
                        data-option-value={size.toLowerCase()}
                        className={size === "XS" ? "active" : ""}
                      >
                        {size}
                      </span>
                    ))}
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
                <div class="policy_pro">
                  <a
                    href="/pages/chinh-sach-doi-tra"
                    class="product-size-chart text-uppercase font-weight-bold"
                  >
                    RETURN POLICY
                  </a>
                </div>

                <a
                  href="#"
                  class="product-add-cart text-uppercase font-weight-bold "
                  data-prid="1050687980"
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

                <div class="bh-logo mt-4">
                  <img
                    width="150"
                    height="63"
                    src="/logo.webp"
                  />
                </div>
              </div>
            </div>
            <div class="d-none separate-mb promo-xy">
              <div class="promotions-app">
                <div class="selector-buyxgety d-none">
                  <div id="buyxgety-program">
                    <div class="buyxgety-heading">
                      <h3>Promotions</h3>
                      <p>Choose one of the promotions</p>
                    </div>
                    <div
                      id="buyxgety-product-list"
                      data-id="1050687980"
                      data-title="SPECIAL RABBIT TEE"
                    >
                      <div class="buyxgety_content">
                        <div class="buyxgety_lists"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div class="slider-right">
					<div class="swiper-container swiper-styled swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events">
						<div class="swiper-wrapper" id="swiper-wrapper-65fd51065dc7b1c2c" aria-live="polite" style="transition-duration: 0ms; transform: translate3d(-373px, 0px, 0px);"><div class="swiper-slide swiper-slide-duplicate swiper-slide-prev swiper-slide-duplicate-next" data-swiper-slide-index="1" role="group" aria-label="2 / 2" style="width: 373px;">
								<div data-zoom-url="//product.hstatic.net/1000351433/product/tho_7ae399bb4eaf48ce881bfac6e7f18091_master.jpg" class="product-image " style="position: relative; overflow: hidden;">
									<img src="//product.hstatic.net/1000351433/product/tho_7ae399bb4eaf48ce881bfac6e7f18091_master.jpg" class=" lazyloaded" data-src="//product.hstatic.net/1000351433/product/tho_7ae399bb4eaf48ce881bfac6e7f18091_master.jpg" alt=" SPECIAL RABBIT TEE ">
								<img role="presentation" alt="" src="//product.hstatic.net/1000351433/product/tho_7ae399bb4eaf48ce881bfac6e7f18091_master.jpg" class="zoomImg" style="position: absolute; top: 0px; left: 0px; opacity: 0; width: 2048px; height: 2048px; border: none; max-width: none; max-height: none;"></div>
							</div>
														<div class="swiper-slide swiper-slide-active" data-swiper-slide-index="0" role="group" aria-label="1 / 2" style="width: 373px;">
								<div data-zoom-url="//product.hstatic.net/1000351433/product/hto2_841aca6c38b6473cac252986a8df8571_master.jpg" class="product-image " style="position: relative; overflow: hidden;">
									<img src="//product.hstatic.net/1000351433/product/hto2_841aca6c38b6473cac252986a8df8571_master.jpg" class=" lazyloaded" data-src="//product.hstatic.net/1000351433/product/hto2_841aca6c38b6473cac252986a8df8571_master.jpg" alt=" SPECIAL RABBIT TEE ">
								<img role="presentation" alt="" src="//product.hstatic.net/1000351433/product/hto2_841aca6c38b6473cac252986a8df8571_master.jpg" class="zoomImg" style="position: absolute; top: 0px; left: 0px; opacity: 0; width: 2048px; height: 2048px; border: none; max-width: none; max-height: none;"></div>
							</div>
							<div class="swiper-slide swiper-slide-next swiper-slide-duplicate-prev" data-swiper-slide-index="1" role="group" aria-label="2 / 2" style="width: 373px;">
								<div data-zoom-url="//product.hstatic.net/1000351433/product/tho_7ae399bb4eaf48ce881bfac6e7f18091_master.jpg" class="product-image " style="position: relative; overflow: hidden;">
									<img src="//product.hstatic.net/1000351433/product/tho_7ae399bb4eaf48ce881bfac6e7f18091_master.jpg" class=" lazyloaded" data-src="//product.hstatic.net/1000351433/product/tho_7ae399bb4eaf48ce881bfac6e7f18091_master.jpg" alt=" SPECIAL RABBIT TEE ">
								<img role="presentation" alt="" src="//product.hstatic.net/1000351433/product/tho_7ae399bb4eaf48ce881bfac6e7f18091_master.jpg" class="zoomImg" style="position: absolute; top: 0px; left: 0px; opacity: 0; width: 2048px; height: 2048px; border: none; max-width: none; max-height: none;"></div>
							</div>

						<div class="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-active" data-swiper-slide-index="0" role="group" aria-label="1 / 2" style="width: 373px;">
								<div data-zoom-url="//product.hstatic.net/1000351433/product/hto2_841aca6c38b6473cac252986a8df8571_master.jpg" class="product-image " style="position: relative; overflow: hidden;">
									<img src="//product.hstatic.net/1000351433/product/hto2_841aca6c38b6473cac252986a8df8571_master.jpg" class=" lazyloading" data-src="//product.hstatic.net/1000351433/product/hto2_841aca6c38b6473cac252986a8df8571_master.jpg" alt=" SPECIAL RABBIT TEE ">
								<img role="presentation" alt="" src="//product.hstatic.net/1000351433/product/hto2_841aca6c38b6473cac252986a8df8571_master.jpg" class="zoomImg" style="position: absolute; top: 0px; left: 0px; opacity: 0; width: 2048px; height: 2048px; border: none; max-width: none; max-height: none;"></div>
							</div></div>
						<div class="swiper-button-next swiper-button" tabindex="0" role="button" aria-label="Next slide" aria-controls="swiper-wrapper-65fd51065dc7b1c2c"></div>
					<span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span></div>
				</div>
			</div> 

		</div>*/}

          <div class="container">
            <div
              class="bluecore-reviews-wrapper"
              id="bluecore-reviews"
              data-id="1050687980"
              data-reviews-title="SPECIAL RABBIT TEE"
            >
              <h3 class="bluecore-reviews-title">
                Customer reviews{" "}
                <span class="bluecore-reviews-number">(0)</span>
              </h3>
              <div class="bluecore-reviews-head">
                <div class="bluecore-reviews-stats reviews-col-50">
                  <div class="bluecore-reviews-ratings-avg">
                    <span class="bluecore-ratings-display">0</span>
                  </div>
                  <div class="bluecore-reviews-ratings-star">
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                  </div>
                </div>
                <div class="bluecore-histogram reviews-col-50">
                  <div class="bluecore-histogram-content">
                    <h4 class="bluecore-histogram-title" style={{ color: "#969897", fontSize: "15px", display: "flex" }}>
                      Product available in the right size?
                    </h4>
                    <div class="bluecore-histogram-block" style={{ color: "var(--menu-color)" }}>
                      <div class="bluecore-histogram-row" data-key="Nhỏ">
                        <div class="bluecore-histogram-t" >Small</div>
                        <div class="bluecore-histogram-bar" style={{ position: "relative", backdgroundColor: "var(--menu-color)", left: 0, top: 0 }}>
                          <div
                            class="bluecore-histogram-bar-content"
                            style={{ width: "100%" }}
                          ></div>
                        </div>
                        <div class="bluecore-histogram-percent" >0%</div>
                      </div>
                      <div
                        class="bluecore-histogram-row"
                        data-key="Đúng với kích thước"

                      >
                        <div class="bluecore-histogram-t">
                          Fits the size correctly
                        </div>
                        <div class="bluecore-histogram-bar">
                          <div
                            class="bluecore-histogram-bar-content"
                            style={{ width: "0%" }}
                          ></div>
                        </div>
                        <div class="bluecore-histogram-percent">0%</div>
                      </div>
                      <div class="bluecore-histogram-row" data-key="Lớn">
                        <div class="bluecore-histogram-t">Large</div>
                        <div class="bluecore-histogram-bar">
                          <div
                            class="bluecore-histogram-bar-content"
                            style={{ width: "0%" }}
                          ></div>
                        </div>
                        <div class="bluecore-histogram-percent">0%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bluecore-reviews-tabs">
                <div class="bluecore-reviews-actions">
                  <ul class="reviews-actions-list">
                    <li class="reviews-actions-btn active" data-tab="all">
                      All reviews<span class="reviews-all-num">(0)</span>
                    </li>
                    <li class="reviews-actions-btn" data-tab="reviews-img">
                      Image <span class="reviews-image-num">(0)</span>
                    </li>
                  </ul>
                </div>
                <div class="bluecore-reviews-sort" >
                  <div class="bluecore-sort-item">
                    <label>Rank</label>
                    <select
                      class="bluecore-sort-select sort-rank"
                      name="sort_rank"
                    >
                      <option value="all">All</option>
                      <option value="5">5 stars</option>
                      <option value="4">4 stars</option>
                      <option value="3">3 stars</option>
                      <option value="2">2 stars</option>
                      <option value="1">1 star</option>
                    </select>
                  </div>
                  <div class="bluecore-sort-item">
                    <label>Sortby</label>
                    <select class="bluecore-sort-select sortby" name="sort_by">
                      <option value="created_desc" selected="">
                        Newest to oldest
                      </option>
                      <option value="created_asc">Oldest to newest</option>
                      <option value="star_desc">From high to low</option>
                      <option value="star_asc">From low to high</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="bluecore-reviews-body">
                <div class="bluecore-rev-list active" id="rev-all">
                  <p class="text-center result-reviews">
                    This product has no reviews yet
                  </p>
                </div>
              </div>
              <div class="bluecore-reviews-pagination pagi-mb d-none">
                <span>Total number of pages</span>
                <ul class="reviews-pagi-list"></ul>
              </div>
              <div class="bluecore-reviews-pagination-mb d-block d-sm-none d-md-none">
                <a
                  href="javascript:void(0)"
                  class="bluecore-rev-load btn-more-modal"
                  data-key="review-bc"
                >
                  View all <i class="fa fa-angle-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
