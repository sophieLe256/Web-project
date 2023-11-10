import React from "react";
import "./shopping-cart.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const products = [
  {
    title: 'WHITE PINK RABBIT TEE',
    imageSrc: '//product.hstatic.net/1000351433/product/mt-trang_b3ca73489d2e49a1b5d676b6432cc372_medium.jpg',
    price: '400.000 VND',
    quantity: 1,
    total: '$30.00',
    variant: 'XS',
    productLink: '/products/white-pink-rabbit-tee',
    removeLink: '/cart/change?line=1&amp;quantity=0',
  },
  {
    title: 'BLACK YELLOW RABBIT TEE',
    imageSrc: 'product-1.webp',
    price: '400.000 VND',
    quantity: 1,
    total: '$20.00',
    variant: 'L',
    productLink: '/products/white-pink-rabbit-tee',
    removeLink: '/cart/change?line=1&amp;quantity=0',
  },
  {
    title: 'BLACK YELLOW RABBIT TEE',
    imageSrc: 'product-1.webp',
    price: '400.000 VND',
    quantity: 1,
    total: '$20.00',
    variant: 'L',
    productLink: '/products/white-pink-rabbit-tee',
    removeLink: '/cart/change?line=1&amp;quantity=0',
  },
];

const handleRemoveItem = (removeLink) => {
  console.log('Removing item with link:', removeLink);
};

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

                <div className="mainCart-detail">
                  <div className="list-pageform-cart">
                    <div className="cart-row">
                      <table className="table-cart">
                        <thead>
                          <tr className="content-cart">
                            <th className="media-title">PRODUCT</th>
                            <th className="item-qty">QUANTITY</th>
                            <th className="item-total-price">PRICE</th>
                            <th className="item-total-price">ACTION</th>
                          </tr>
                        </thead>
                        <tbody>
                          {products.map((product, index) => (
                            <tr className="product-quantity" key={index}>
                              <td className="media-title">
                                <div className="item-img">
                                  <a title={product.title} href={product.productLink}>
                                    <img src={product.imageSrc} alt={product.title} />
                                  </a>
                                </div>
                                <div className="item-info">
                                  <h3 className="item--title">
                                    <a href={product.productLink}>{product.title}</a>
                                  </h3>
                                  <div className="item--variant">
                                    <span>
                                      <strong>SIZE</strong> {product.variant}
                                    </span>
                                    <br />
                                  </div>
                                </div>
                              </td>
                              <td className="item-qty">
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
                                      max="5"
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
                                    {/*<span>{product.quantity}</span>*/}
                                  </div>
                                </div>
                              </td>
                              <td className="item-total-price">
                                <span>{product.total}</span>
                              </td>
                              <td className="item-remove">
                                <a href="#" onClick={() => handleRemoveItem(product.removeLink)}>
                                  <img src="//theme.hstatic.net/1000351433/1001138941/14/delete.png?v=243" />
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
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
                  <br /><br />
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
          </div>
        </div>
      </div>
    </main>
  );
};
