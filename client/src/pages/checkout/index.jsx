import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./checkout.css";
import { Link, useNavigate } from "react-router-dom";
import { endPoint } from "../../api/clientAPI";
import ClientAPI from "../../api/clientAPI";
import MySecurity from "../../api/mySecurity";

export const CheckOut = () => {
  const [cartItems, setCartItems] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0.0);
  const [inputValues, setInputValues] = useState({ type: "credit" });
  const navigate = useNavigate();

  useEffect(() => {
    // get Cart Item and Total
    async function fetchData() {
      try {

        const data = { nothing: "nothing" };
        const respond = await ClientAPI.post("getCartItem", data);
        //console.log("From Checkout_getCart.jsx: ", respond.data);       
        if (respond.data === null || respond.data.orderID === undefined || respond.data.items.length === 0)
          return navigate("/products?page=1"); //not found order.

        setCartItems(MySecurity.decryptedData(respond.data));

        // Calculate total price based on quantity
        const total = respond.data.items.reduce((acc, product) => acc + product.price * product.quantity, 0);
        setTotalPrice(total);

        setInputValues((prevValues) => ({
          ...prevValues,
          orderID: respond.data.orderID,
        }));

      }
      catch (err) {
        //console.log("From Checkout_getCart.jsx: ", err);
      }
    }
    fetchData();
  }, []);


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    // check input data
    const requiredFields = ['name', 'email', 'phone', 'address', 'city', 'zipcode', 'state', 'acc_name', 'acc_number', 'expireDate', 'cvc', 'type'];
    let error = "Please fill in:\n";
    for (const field of requiredFields) {
      const fieldValue = inputValues[field];
      if (!fieldValue) {
        error = error + field + " ";
      }
    }
    if (error !== "Please fill in:\n")
      return alert(error);
    // data ready to send
    try {      
      await ClientAPI.post("checkOutCart", inputValues);
      //console.log("From CheckOutCart.jsx: ", respond.data);
      alert("Check Out sucessful.")
      navigate(`/order-details/${cartItems.orderID}`);
    }
    catch (err) {
      alert("Error in Check Out process: ",err)
      //console.log("From CheckOutCart.jsx: ", err);
      //console.log("From CheckOutCart.jsx: error ", err.respond.data);
    }
  };

  return (
    <div className="checkout-container">
      {cartItems !== null && cartItems !== undefined ? (
      <div className="checkout-content">
        <div className="order-summary">
          <Link to="/" className="tag">
            <h1 className="banner">Funny Bunny Official Store</h1>
          </Link>
          <div></div>
          
          <h2>Delivery Information</h2>          
          <form className="check-form">
            <input type="text" id="name" name="name" className="text_fill" placeholder="Name" required onChange={handleInputChange} />
            <div className="container">
              <input type="text" id="email" name="email" className="emai text_fill" placeholder="Email" required onChange={handleInputChange} />
              <input type="text" id="phone" name="phone" className="phone_number text_fill" placeholder="Phone number" required onChange={handleInputChange} />
            </div>
            <input type="text" id="address" name="address" className="text_fill" placeholder="Address" required onChange={handleInputChange} />
            <input type="text" id="city" name="city" className="text_fill" placeholder="City" required onChange={handleInputChange} />
            <input type="text" id="zipcode" name="zipcode" className="text_fill" placeholder="Zip Code" required onChange={handleInputChange} />
            <input type="text" id="state" name="state" className="text_fill" placeholder="State" required onChange={handleInputChange} />
            <h2>Payment methods</h2>
            {/* handleing the payment type when choosing one of them */}
            <div className="payment_methods">
              <label>
                <input
                  type="radio"
                  value="credit"
                  name="type"
                  checked={inputValues.type === "credit"}
                  onChange={handleInputChange}
                />
                <span className="custom-radio">
                  <img
                    role="button"
                    className="image-left"
                      src={endPoint +"default/credit.webp"}
                    alt="WebP rules."
                  />
                </span>
              </label>
              <label>
                <input
                  type="radio"
                  value="debit"
                  name="type"
                  checked={inputValues.type === "debit"}
                  onChange={handleInputChange}
                />
                <span className="custom-radio">
                  <img
                    role="button"
                    className="image-left"
                      src={endPoint +"default/debit.webp"}
                    alt="WebP rules."
                  />
                </span>
              </label>

              <div className="gap"></div>
              {inputValues.type === "credit" ? (
                <div className="credit-message">
                  <p>Enter your credit card information.</p>
                </div>
              ) : (
                <div className="debit-message">
                  <p>Enter your debit card information.</p>
                </div>
              )}
              <form className="check-form">
                <input type="text" id="acc_name" name="acc_name" className="text_fill" placeholder="Name on the card" required onChange={handleInputChange} />
                <input type="text" id="acc_number" name="acc_number" className="text_fill" placeholder="Card Number" required onChange={handleInputChange} />
                <input type="text" id="expireDate" name="expireDate" className="text_fill" placeholder="MM/YY" required onChange={handleInputChange} />
                <input type="text" id="cvc" name="cvc" className="text_fill" placeholder="CVC" required onChange={handleInputChange} />
              </form>
            </div>
            <div className="container payment">
              <Link to="/shopping-cart">
                <p className="cart">Cart</p>
              </Link>
              <button className="place_order" onClick={(e) => handlePlaceOrder(e)}>
                Place Order
              </button>
            </div>
          </form>
        </div>
        {/* this is for the left side */}
        <div className="shipping-form">
          <div className="order-summery-section">
            <table className="check-table-cart">
              <tbody>
                {
                  cartItems.items.map((product, index) => (
                    <tr className="product-quantity" key={index}>
                      <td className="media-title">
                        <div className="check-item-img">
                          <a title={product.name} href={`/products-details/${product.id}`}>
                            <span className="quantity-circle">{product.quantity}</span>
                            <img src={endPoint + product.image} alt={product.name} />
                          </a>
                        </div>
                        <div className="check-item-info">
                          <h3 className="check-item--title">
                            <a href={`/products-details/${product.id}`}>{product.name}</a>
                          </h3>
                          <div className="item--variant">
                            <span>
                              <strong>SIZE</strong> {product.selectedSize}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="item-total-price">
                        <span>${(product.price * product.quantity).toFixed(2)}</span>
                      </td>
                    </tr>
                  ))
                }
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
      ):(<div className="loading">
        <p>Loading...</p>
      </div>)}
    </div>
  );
};
