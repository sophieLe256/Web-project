import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./orderdetail.css";
import { endPoint } from "../../api/clientAPI";
import ClientAPI from "../../api/clientAPI";
import MySecurity from "../../api/mySecurity";

export const OrderDetail = () => {
  const { orderID } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    async function fetchData() {
      // let fetch data
      try {
        if(orderID === null || orderID === undefined)
        {
          alert("Not found Order Detail yet.")
          navigator("/products?page=1")
        }
        const data = { orderID: orderID };
        const respond = await ClientAPI.post("getOrderHistoryDeatail", data);
        //console.log("From OrderDetail.jsx: ", respond.data);
        setOrderDetails(MySecurity.decryptedData(respond.data));
      }
      catch (err) {
        //console.log("From OrderDetail.jsx: ", err);
      }
    }
    fetchData();

  }, [orderDetails]);

  // Function to display only the last four digits of the card number
  const getLastFourDigits = (cardNumber) => {
    return cardNumber.slice(-4);
  };

  return (
    <div className="order-detail-container">
      <h1 className="banner">Order Receipt</h1>
      {orderDetails !== null && orderDetails !== undefined ? (
        <div className="receipt">
          <div className="order-info">
            <h2>Thank You For Your Order!</h2>
            <p><strong>Order ID:</strong> {orderDetails.order.orderID}</p>
            <p><strong>Order Date:</strong> {new Date(orderDetails.order.transactionDate).toLocaleDateString()}</p>
            <p><strong>Total Price:</strong> ${parseFloat(orderDetails.order.totalPrice).toFixed(2)}</p>
          </div>
          <br />
          <div className="custommer-information">
            <div className="delivery-info">
              <h2>Delivery Information</h2>
              <p><strong>Name:</strong> {orderDetails.contact.name}</p>
              <p><strong>Email:</strong> {orderDetails.contact.email}</p>
              <p><strong>Phone Number:</strong> {orderDetails.contact.phone}</p>
              <p><strong>Address:</strong> {orderDetails.contact.address}</p>
              <p><strong>City:</strong> {orderDetails.contact.city}</p>
              <p><strong>Zip Code:</strong> {orderDetails.contact.zipcode}</p>
              <p><strong>State:</strong> {orderDetails.contact.state}</p>
            </div>
            <br />
            <div className="payment-details">
              <h2>Payment Details</h2>
              <p><strong>Payment Method:</strong> {orderDetails.card.type}</p>
              <p><strong>Name on the Card:</strong> {orderDetails.card.acc_name}</p>
              <p><strong>Card Number:</strong> **** **** **** {getLastFourDigits(orderDetails.card.acc_number)}</p>
              <p><strong>Expiration Date:</strong> {orderDetails.card.expireDate}</p>
            </div>
          </div>
          <br />
          <div className="items">
            <h2>Order Items</h2>
            <table className="order-items-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Size</th>
                  <th>Price per unit</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.items.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <div className="list-order-item">
                        <div className="item-image">
                          <img src={endPoint + item.image} alt={endPoint + item.name} />
                        </div>
                        <div className="item-details">
                          <p><strong>{item.name}</strong></p>
                        </div>
                      </div>
                    </td>
                    <td>{item.quantity}</td>
                    <td>{item.selectedSize}</td>
                    <td>${parseFloat(item.price).toFixed(2)}</td>
                    <td>${(parseFloat(item.price) * parseFloat(item.quantity)).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
