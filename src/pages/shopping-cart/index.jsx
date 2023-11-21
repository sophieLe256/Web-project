import React, { useState, useEffect } from "react";
import "./shopping-cart.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";


export const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0.0);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);

    // Calculate total price based on quantity
    const total = storedCart.reduce((acc, product) => acc + product.price * product.quantity, 0);
    setTotalPrice(total);
  }, []);

  const handleRemoveItem = (productId, size, e) => {
    e.preventDefault();
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = existingCart.filter(
      (item) => item.productId !== productId || item.size !== size
    );

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);

    // Calculate total price based on quantity
    const total = updatedCart.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );
    setTotalPrice(total);

    window.dispatchEvent(new Event("cartUpdated"));
  };


  const handleQuantityChange = (productId, newQuantity) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = existingCart.map((item) => {
      if (item.productId === productId) {
        item.quantity = newQuantity;
      }
      return item;
    });

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);

    // Calculate total price based on quantity
    const total = updatedCart.reduce((acc, product) => acc + product.price * product.quantity, 0);
    setTotalPrice(total);

    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleIncrease = (productId) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = existingCart.map((item) => {
      if (item.productId === productId) {
        if (item.quantity < 10) {
          item.quantity += 1;
        }
      }
      return item;
    });

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);

    // Calculate total price based on quantity
    const total = updatedCart.reduce((acc, product) => acc + product.price * product.quantity, 0);
    setTotalPrice(total);

    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleDecrease = (productId) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = existingCart.map((item) => {
      if (item.productId === productId) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        }
      }
      return item;
    });

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);

    // Calculate total price based on quantity
    const total = updatedCart.reduce((acc, product) => acc + product.price * product.quantity, 0);
    setTotalPrice(total);

    window.dispatchEvent(new Event("cartUpdated"));
  };

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
                {cartItems.length > 0 ? (
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
                            {cartItems.map((product, index) => (
                              <tr className="product-quantity" key={index}>
                                <td className="media-title">
                                  <div className="item-img">
                                    <a title={product.name} href={product.productLink}>
                                      <img src={product.image} alt={product.name} />
                                    </a>
                                  </div>
                                  <div className="item-info">
                                    <h3 className="item--title">
                                      <a href={product.productLink}>{product.name}</a>
                                    </h3>
                                    <div className="item--variant">
                                      <span>
                                        <strong>SIZE</strong> {product.size}
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
                                        onClick={() => handleIncrease(product.productId)}
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
                                        onChange={(e) => handleQuantityChange(product.productId, parseInt(e.target.value, 10))}
                                      />
                                      <button
                                        type="button"
                                        className="minus qty-btn stop"
                                        onClick={() => handleDecrease(product.productId)}
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
                                    onClick={(e) =>
                                      handleRemoveItem(product.productId, product.size, e)
                                    }
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
                ) : (
                  <div class="col-lg-12 col-md-12 col-sm-12 col-12 contentCart-detail">
                    <div class="mainCart-detail">
                      <div class="expanded-message text-center font-weight-bold">
                        <p>YOUR CART is empty</p>
                        <img
                          className="cart_icon"
                          src="cart_icon.jpg"
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
