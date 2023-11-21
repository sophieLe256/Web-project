import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./orderdetail.css";

export const OrderDetail = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    // Fetch order details by orderId from localStorage or API
    const orderHistory = JSON.parse(localStorage.getItem("orderHistory")) || [];
    const selectedOrder = orderHistory.find(order => order.id === parseInt(orderId, 10));

    if (selectedOrder) {
      setOrderDetails(selectedOrder);
    }
  }, [orderId]);

  if (!orderDetails) {
    return (
      <div className="order-detail-container">
        <p>Loading...</p>
      </div>
    );
  }

  // Function to display only the last four digits of the card number
  const getLastFourDigits = (cardNumber) => {
    return cardNumber.slice(-4);
  };

  return (
    <div className="order-detail-container">
      <h1 className="banner">Order Receipt</h1>
      <div className="receipt">
        <div className="order-info">
          <h2>Thank You For Your Order!</h2>
          <p><strong>Order ID:</strong> {orderDetails.id}</p>
          <p><strong>Order Date:</strong> {new Date(orderDetails.date).toLocaleDateString()}</p>
          <p><strong>Total Price:</strong> ${orderDetails.totalPrice.toFixed(2)}</p>
        </div>
        <br/>
        <div className="custommer-information">
        <div className="delivery-info">
          <h2>Delivery Information</h2>
          <p><strong>Name:</strong> {orderDetails.user.name}</p>
          <p><strong>Email:</strong> {orderDetails.user.email}</p>
          <p><strong>Phone Number:</strong> {orderDetails.user.phone_number}</p>
          <p><strong>Address:</strong> {orderDetails.user.address}</p>
          <p><strong>City:</strong> {orderDetails.user.city}</p>
          <p><strong>Zip Code:</strong> {orderDetails.user.zipcode}</p>
          <p><strong>State:</strong> {orderDetails.user.state}</p>
        </div>
        <br/>
        <div className="payment-details">
          <h2>Payment Details</h2>
          <p><strong>Payment Method:</strong> {orderDetails.paymentMethod}</p>
          <p><strong>Name on the Card:</strong> {orderDetails.paymentDetails.card_name}</p>
          <p><strong>Card Number:</strong> **** **** **** {getLastFourDigits(orderDetails.paymentDetails.card_num)}</p>
          <p><strong>Expiration Date:</strong> {orderDetails.paymentDetails.date}</p>
        </div>
        </div>
        <br/>
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
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className="item-details">
                        <p><strong>{item.name}</strong></p>
                      </div>
                    </div>
                  </td>
                  <td>{item.quantity}</td>
                  <td>{item.size}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
