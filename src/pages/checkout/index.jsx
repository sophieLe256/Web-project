import React,{useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./checkout.css";
import { Link } from "react-router-dom";


export const CheckOut = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("credit");

  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };
  return (
    <div className="checkout-container">
      <div className="checkout-content">
        <div className="order-summary">
        <Link to="/"  className="tag">
          <h1 className="banner">Funny Bunny Official Store</h1>
        </Link>
        <div></div>
          <h2>Delivery Information</h2>
          <from>
            <input type="text" id="name" className="text_fill" placeholder="Name" required />
            <div className="container">
            <input type="text" id="email"  className="emai text_fill" placeholder="Email" required />
            <input type="text" id="phone_number" className="phone_number text_fill"  placeholder="Phone number" required />
            </div>
            <input type="text" id="address"  className="text_fill" placeholder="Address" required />
            <input type="text" id="city" className="text_fill" placeholder="City" required />
            <input type="text" id="zipcode" className="text_fill" placeholder="Zip Code" required />
            <input type="text" id="state" className="text_fill" placeholder="State" required></input>
            <label htmlFor="payment_methods">Payment methods:</label>
            {/* handleing the payment type when choosing one of them */}
            <div className="payment_methods">
            <label>
              <input
                type="radio"
                value="credit"
                checked={selectedPaymentMethod === "credit"}
                onChange={handlePaymentMethodChange}
              />
              Credit Card
            </label>

            <label>
              <input
                type="radio"
                value="debit"
                checked={selectedPaymentMethod === "debit"}
                onChange={handlePaymentMethodChange}
              />
              Debit Card
            </label>
            <div>
              <input type="text" id="name" name="name" className="text_fill" placeholder="Name on the card" required />
              <input type="text" id="card_num" name="card_num" className="text_fill" placeholder="Card Number" required />
              <input type="text" id="date" name="date" className="text_fill" placeholder="MM/YY" required />
              <input type="text" id="CVC" name="CVC" className="text_fill" placeholder="CVC" required />
            </div>
            </div>
            <div className="container payment">
            <Link to="/shopping-cart">
              <p className="cart">Cart</p>
              </Link>
            <button type="submit" className="place_order">Place Order</button>
            </div>
          </from>
        </div>
        {/* this is for the left side */}
        <div className="shipping-form">
          <h2>Shipping Information</h2>
          <form>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" className="text_fill" required />

            <label htmlFor="address">Address:</label>
            <input type="text" id="address" name="address" className="text_fill" required />

            <label htmlFor="city">City:</label>
            <input type="text" id="city" name="city" className="text_fill" required />

            <label htmlFor="zipcode">Zip Code:</label>
            <input type="text" id="zipcode" name="zipcode" className="text_fill" required />
          </form>
        </div>
      </div>
    </div>
  );
};
