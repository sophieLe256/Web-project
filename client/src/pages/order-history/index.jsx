import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./history.css";

export const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(async () => {
    // let fetch data
    try {
      const data = { nothing: "nothing" };
      const respond = await ClientAPI.post("getOrderHistory", data);
      console.log("From OrderHistory.jsx: ", respond);
      setOrderHistory(MySecurity.decryptedData(respond));
    }
    catch (err) {
      console.log("From OrderHistory.jsx: ", err);
    }

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
                <td>{order.orderID}</td>
                <td>{new Date(order.transactionDate).toLocaleDateString()}</td>
                <td>${order.totalPrice.toFixed(2)}</td>
                <td>{order.type}</td>
                <td>
                  <Link to={`/order-details/${order.orderID}`}>View Details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

