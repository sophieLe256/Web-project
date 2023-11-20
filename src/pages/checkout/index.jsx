import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./checkout.css";
import { Link } from "react-router-dom";



export const CheckOut = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0.0);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);

    // Calculate total price based on quantity
    const total = storedCart.reduce((acc, product) => acc + product.price * product.quantity, 0);
    setTotalPrice(total);
  }, []);

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("credit");

  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };


  return (
    <div className="checkout-container">
      <div className="checkout-content">
        <div className="order-summary">
          <Link to="/" className="tag">
            <h1 className="banner">Funny Bunny Official Store</h1>
          </Link>
          <div></div>
          <h2>Delivery Information</h2>
          <form className="check-form">
            <input type="text" id="name" className="text_fill" placeholder="Name" required />
            <div className="container">
              <input type="text" id="email" className="emai text_fill" placeholder="Email" required />
              <input type="text" id="phone_number" className="phone_number text_fill" placeholder="Phone number" required />
            </div>
            <input type="text" id="address" className="text_fill" placeholder="Address" required />
            <input type="text" id="city" className="text_fill" placeholder="City" required />
            <input type="text" id="zipcode" className="text_fill" placeholder="Zip Code" required />
            <input type="text" id="state" className="text_fill" placeholder="State" required></input>
            <h2>Payment methods</h2>
            {/* handleing the payment type when choosing one of them */}
            <div className="payment_methods">
              <label>
                <input
                  type="radio"
                  value="credit"
                  checked={selectedPaymentMethod === "credit"}
                  onChange={handlePaymentMethodChange}
                />
                <span className="custom-radio">
                  <img
                    role="button"
                    className="image-left"
                    src="credit.webp"
                    alt="WebP rules."
                  />
                </span>
              </label>
              <label>
                <input
                  type="radio"
                  value="debit"
                  checked={selectedPaymentMethod === "debit"}
                  onChange={handlePaymentMethodChange}
                />
                <span className="custom-radio">
                  <img
                    role="button"
                    className="image-left"
                    src="debit.webp"
                    alt="WebP rules."
                  />
                </span>
              </label>

              <div className="gap"></div>
              {selectedPaymentMethod === "credit" ? (
                <div className="credit-message">
                  <p>Enter your credit card information.</p>
                </div>
              ) : (
                <div className="debit-message">
                  <p>Enter your debit card information.</p>
                </div>
              )}
              <form className="check-form">
                <input type="text" id="name" name="name" className="text_fill" placeholder="Name on the card" required />
                <input type="text" id="card_num" name="card_num" className="text_fill" placeholder="Card Number" required />
                <input type="text" id="date" name="date" className="text_fill" placeholder="MM/YY" required />
                <input type="text" id="CVC" name="CVC" className="text_fill" placeholder="CVC" required />
              </form>
            </div>
            <div className="container payment">
              <Link to="/shopping-cart">
                <p className="cart">Cart</p>
              </Link>
              <button type="submit" className="place_order">Place Order</button>
            </div>
          </form>
        </div>
        {/* this is for the left side */}
        <div className="shipping-form">
          <div className="order-summery-section">
            <table className="check-table-cart">
              <tbody>
                {cartItems.map((product, index) => (
                  <tr className="product-quantity" key={index}>
                    <td className="media-title">
                      <div className="check-item-img">
                        <a title={product.name} href={`/products-details/${product.id}`}>
                          <span className="quantity-circle">{product.quantity}</span>
                          <img src={product.image} alt={product.name} />
                        </a>
                      </div>
                      <div className="check-item-info">
                        <h3 className="check-item--title">
                          <a href={`/products-details/${product.id}`}>{product.name}</a>
                        </h3>
                      </div>
                    </td>

                    <td className="item-total-price">
                      <span>${(product.price * product.quantity).toFixed(2)}</span>
                    </td>
                  </tr>
                ))}
                <tr>
                  <div className="total-title">
                    <p>Total:</p>
                  </div>
                  <div className="total-price">
                    <p>${totalPrice.toFixed(2)}</p>
                  </div>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
};
