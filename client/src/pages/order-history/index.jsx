import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./history.css";

export const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    // Fetch order history from localStorage or API
    const storedOrderHistory = JSON.parse(localStorage.getItem("orderHistory")) || [];
    setOrderHistory(storedOrderHistory);
  }, []);

  return (
    <div className="order-history-container">
      <h1 className="banner">Order History</h1>
      {orderHistory.length === 0 ? (
        <p>No orders yet. Start shopping now!</p>
      ) : (
        <table className="order-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Total Price</th>
              <th>Payment Method</th>
              <th>View Details</th>
            </tr>
          </thead>
          <tbody>
            {orderHistory.map((order, index) => (
              <tr key={index} className="order-item">
                <td>{order.id}</td>
                <td>{new Date(order.date).toLocaleDateString()}</td>
                <td>${order.totalPrice.toFixed(2)}</td>
                <td>{order.paymentMethod}</td>
                <td>
                  <Link to={`/order-details/${order.id}`}>View Details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

