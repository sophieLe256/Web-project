import React from "react";
import "./shopping-cart.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

export const ShoppingCart = () => {
  return (
    <main className="cart-rabbit-en py-5">
      <div id="layout-cart">
        <div className="wrapper-mainCart">
          <div className="content-bodyCart">
            <div className="container">
              <div className="row">
                <div className="header-page">
                  <h1>Cart</h1>
                </div>

                <div className="col-lg-8 col-md-12 col-sm-12 col-12 contentCart-detail">
                  <div className="mainCart-detail">
                    <div className="list-pageform-cart">
                      <div className="cart-row">
                        <div
                          className="table-cart"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div className="content-cart">
                            <div className="media-title">PRODUCT</div>
                            <div className="item-qty">QUANTITY</div>
                            <div className="item-total-price">PRICE</div>
                          </div>
                        </div>

                        <div className="product-quantity">
                          <div className="media-title">
                            <div className="item-img">
                              <a
                                title="WHITE PINK RABBIT TEE"
                                href="/products/white-pink-rabbit-tee"
                              >
                                <img
                                  src="//product.hstatic.net/1000351433/product/mt-trang_b3ca73489d2e49a1b5d676b6432cc372_medium.jpg"
                                  alt="WHITE PINK RABBIT TEE"
                                />
                              </a>
                            </div>
                            <div className="item-info">
                              <h3 className="item--title">
                                <a href="/products/white-pink-rabbit-tee">
                                  WHITE PINK RABBIT TEE
                                </a>
                              </h3>

                              <div className="item--variant">
                                <span>
                                  <strong>SIZE</strong>
                                  XS
                                </span>
                                <br />
                              </div>
                            </div>
                            <div className="item-price d-none">
                              <p>
                                <span>400.000 VND</span>
                              </p>
                            </div>

                            <div className="item-total-price">
                              <div className="item-qty">
                                <div className="qty">
                                  <div className="quantity-box">
                                    <button
                                      type="button"
                                      className="qty-btn plus"
                                    >
                                      +
                                    </button>
                                    <input
                                      type="text"
                                      size="4"
                                      name="updates[]"
                                      min="1"
                                      oriprice="40000000"
                                      line="1"
                                      productid="1051116453"
                                      variantid="1114988406"
                                      id="updates_1114988406"
                                      data-price="40000000"
                                      value="1"
                                      className="tc line-item-qty item-quantity"
                                    />
                                    <button
                                      type="button"
                                      className="minus qty-btn stop"
                                    >
                                      -
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <span className="line-item-total">$30.00</span>
                          </div>
                          <div className="item-remove">
                            <a
                              href="javascript:void(0)"
                              onClick="BH.Cart.removeItemCart(this,'/cart/change?line=1&amp;quantity=0')"
                            >
                              <img src="//theme.hstatic.net/1000351433/1001138941/14/delete.png?v=243" />
                            </a>
                          </div>
                        </div>
                        <hr />
                        <div className="product-quantity">
                          <div className="media-title">
                            <div className="item-img">
                              <a
                                title="WHITE PINK RABBIT TEE"
                                href="/products/white-pink-rabbit-tee"
                              >
                                <img
                                  src="//product.hstatic.net/1000351433/product/mt-trang_b3ca73489d2e49a1b5d676b6432cc372_medium.jpg"
                                  alt="WHITE PINK RABBIT TEE"
                                />
                              </a>
                            </div>
                            <div className="item-info">
                              <h3 className="item--title">
                                <a href="/products/white-pink-rabbit-tee">
                                  WHITE PINK RABBIT TEE
                                </a>
                              </h3>

                              <div className="item--variant">
                                <span>
                                  <strong>SIZE</strong>
                                  XS
                                </span>
                                <br />
                              </div>
                            </div>
                            <div className="item-price d-none">
                              <p>
                                <span>400.000 VND</span>
                              </p>
                            </div>

                            <div className="item-total-price">
                              <div className="item-qty">
                                <div className="qty">
                                  <div className="quantity-box">
                                    <button
                                      type="button"
                                      className="qty-btn plus"
                                    >
                                      +
                                    </button>
                                    <input
                                      type="text"
                                      size="4"
                                      name="updates[]"
                                      min="1"
                                      oriprice="40000000"
                                      line="1"
                                      productid="1051116453"
                                      variantid="1114988406"
                                      id="updates_1114988406"
                                      data-price="40000000"
                                      value="1"
                                      className="tc line-item-qty item-quantity"
                                    />
                                    <button
                                      type="button"
                                      className="minus qty-btn stop"
                                    >
                                      -
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <span className="line-item-total">$30.00</span>
                          </div>
                          <div className="item-remove">
                            <a
                              href="javascript:void(0)"
                              onClick="BH.Cart.removeItemCart(this,'/cart/change?line=1&amp;quantity=0')"
                            >
                              <img src="//theme.hstatic.net/1000351433/1001138941/14/delete.png?v=243" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-12 col-sm-12 col-12 order-summary-block">
                  <h4 className="summary-title">TOTAL BILLINGS</h4>
                  <div className="summary-total">
                    <span>$50.00</span>
                  </div>
                  <div className="summary-action">
                    <div className="summary-button">
                      <Link to="/checkout">
                        <a
                          id="btnCart-checkout"
                          className="checkout-btn"
                          href="#"
                        >
                          CHECK OUT
                        </a>
                      </Link>
                    </div>
                    <a className="button" href="/?view=rabbit.vn">
                      CONTINUE SHOPPING
                    </a>
                  </div>
                </div>
              </div>
              <div className="cart-row">
                <div className="order-noted-block">
                  <div className="checkout-buttons clearfix">
                    <label
                      for="note"
                      className="note-label h4 font-weight-bold"
                    >
                      ORDER NOTES
                    </label>
                    <textarea
                      className="form-control"
                      id="note"
                      name="note"
                      rows="5"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    id="update-cart"
                    className="btn-update button d-none"
                    name="update"
                    value=""
                  >
                    Cập nhật
                  </button>
                  <button
                    type="submit"
                    id="checkout"
                    className="btn-checkout button d-none "
                    name="checkout"
                    value=""
                  >
                    Check out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="cart-ajloading">
        <div>
          <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </main>
  );
};
