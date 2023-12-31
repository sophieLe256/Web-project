import React, { useState, useEffect } from "react";
import "./shopping-cart.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { endPoint } from "../../api/clientAPI";
import ClientAPI from "../../api/clientAPI";
import MySecurity from "../../api/mySecurity";

export const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0.0);
  const [refresh, setRefresh] = useState(0.0);

  //inital data
  useEffect(() => {
    async function fetchData() {
    try {
      const data = { nothing: "nothing" };
      const respond = await ClientAPI.post("getCartItem", data);
      //console.log("From ShoppingCart.jsx: ", respond.data);
      setCartItems(MySecurity.decryptedData(respond.data));
      // Calculate total price based on quantity
      const total = respond.data.items.reduce((acc, product) => acc + product.price * product.quantity, 0);
      setTotalPrice(total);
    }
    catch (err) {
      //console.log("From ShoppingCart.jsx: ", err);
    }
  }
  fetchData();
  }, [refresh]);
  
  // update item in shooping cart
  const handleOrderItemChange = async (orderItemID, quantity) => {
    try {
      const data = {
        orderID: cartItems.orderID,
        orderItemID: orderItemID,
        quantity: quantity
      };
      await ClientAPI.post("updateCartItem", data);
      //console.log(`From ${caller}.jsx: `, respond.data);
      window.dispatchEvent(new Event("cartUpdated"));
      setRefresh(Math.random());
    }
    catch (err) {
      //console.log(`From ${caller}.jsx: `, err);
    }
  }

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
                {cartItems!==null && cartItems.items.length > 0 ? (
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
                            {cartItems.items.map((product, index) => (
                              <tr className="product-quantity" key={index}>
                                <td className="media-title">
                                  <div className="item-img">
                                    <a title={product.name} href={"/product/"+product.productId}>
                                      <img src={endPoint+product.image} alt={product.name} />
                                    </a>
                                  </div>
                                  <div className="item-info">
                                    <h3 className="item--title">
                                      <a href={"/product/" + product.productId}>{product.name}</a>
                                    </h3>
                                    <div className="item--variant">
                                      <span>
                                        <strong>SIZE</strong> {product.selectedSize}
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
                                        onClick={() => handleOrderItemChange(product.orderItemID, (parseInt(product.quantity) + 1 > 10 ? 10 : parseInt(product.quantity) + 1))}
                                      >
                                        +
                                      </button>
                                      <input
                                        type="text"
                                        size="2"
                                        name="updates[]"
                                        max="10"
                                        value={product.quantity}
                                        className="tc line-item-qty item-quantity"
                                        onChange={(e) => handleOrderItemChange(product.orderItemID, (parseInt(e.target.value) < 1 && parseInt(e.target.value) > 10 ? parseInt(product.quantity) : parseInt(e.target.value,1)))}
                                      />
                                      <button
                                        type="button"
                                        className="minus qty-btn stop"
                                        onClick={() => handleOrderItemChange(product.orderItemID, (parseInt(product.quantity) - 1 < 1 ? 1 : parseInt(product.quantity) - 1))}
                                      >
                                        -
                                      </button>
                                    </div>
                                  </div>
                                </td>
                                <td className="item-total-price">
                                  <span>${(product.price * product.quantity).toFixed(2)}</span>
                                </td>
                                <td className="item-remove">
                                  <a
                                    href="#"
                                    onClick={() => handleOrderItemChange(product.orderItemID, 0)}
                                  >
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
                          <span>${totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="summary-action">
                          <div className="summary-button">
                            <Link to="/checkout">
                              <a
                                id="btnCart-checkout"
                                className="checkout-btn"                               
                              >
                                CHECK OUT
                              </a>
                            </Link>
                          </div>
                          <a className="button" href="/product?page=1">
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
                            htmlFor="note"
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
                ) : (
                  <div className="col-lg-12 col-md-12 col-sm-12 col-12 contentCart-detail">
                    <div className="mainCart-detail">
                      <div className="expanded-message text-center font-weight-bold">
                        <p>YOUR CART is empty</p>
                        <img
                          className="cart_icon"
                            src={endPoint +"default/cart_icon.jpg"}
                          alt="WebP rules."
                        ></img>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
