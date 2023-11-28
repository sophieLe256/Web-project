import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./history.css";
import ClientAPI from "../../api/clientAPI";
import MySecurity from "../../api/mySecurity";

export const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    async function fetchData() {
    // let fetch data
    try {
      const data = { nothing: "nothing" };
      const respond = await ClientAPI.post("getOrderHistory", data);
      //console.log("From OrderHistory.jsx: ", respond.data);
      setOrderHistory(MySecurity.decryptedData(respond.data));
    }
    catch (err) {
      //console.log("From OrderHistory.jsx: ", err);
    }
  }
  fetchData();
  }, []);

  

  return (
    <div className="order-history-container">
      <h1 className="banner">Order History</h1>
      {orderHistory === null || orderHistory === undefined || orderHistory.length === 0 ? (
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
                <td>${parseFloat(order.totalPrice).toFixed(2)}</td>
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

