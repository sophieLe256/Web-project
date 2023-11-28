import React, { useEffect, useState } from 'react';
import Sidebar from '../adminLayout/SideBar';
import Navbar from '../adminLayout/NavBar';
import "./adminDashboard.css";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";


export const AdminDashboard = () => {   
    const [darkMode, setDarkMode] = useState(false);
    const handleDarkModeChange = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle('dark');
    };
    const navigate = useNavigate();
    useEffect(() => {
        if (Cookies.get("isAdmin") !== '1')
            navigate("/");
    });

    return (
        <section id="content" className='adminPage'>
            <Sidebar />
            <Navbar               
                onDarkModeChange={handleDarkModeChange}
            />
            <main>
                <div className="head-title">
                    <div className="adminLeft">
                        <h1>Dashboard</h1>
                        <ul className="breadcrumb">
                            <li>
                                <a href="#">Dashboard</a>
                            </li>
                            <li><i className='bx bx-chevron-right' ></i></li>
                            <li>
                                <a className="active" href="#">Home</a>
                            </li>
                        </ul>
                    </div>                    
                </div>

                <ul className="box-info">
                    <li>
                        <i className='bx bxs-calendar-check' ></i>
                        <span className="text">
                            <h3>5</h3>
                            <p>New Order</p>
                        </span>
                    </li>
                    <li>
                        <i className='bx bxs-group' ></i>
                        <span className="text">
                            <h3>30</h3>
                            <p>Visitors</p>
                        </span>
                    </li>
                    <li>
                        <i className='bx bxs-dollar-circle' ></i>
                        <span className="text">
                            <h3>$1000</h3>
                            <p>Total Sales</p>
                        </span>
                    </li>
                </ul>
                <div className="table-data">
                    <div className="order">
                        <div className="head">
                            <h3>Recent Orders</h3>
                            <i className='bx bx-search' ></i>
                            <i className='bx bx-filter' ></i>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Date Order</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <p>Sophie Le</p>
                                    </td>
                                    <td>04-03-2023</td>
                                    <td><span className="status completed">Completed</span></td>
                                </tr>
                                <tr>
                                    <td>
                                        <p>An Cao</p>
                                    </td>
                                    <td>01-10-2023</td>
                                    <td><span className="status pending">Pending</span></td>
                                </tr>
                                <tr>
                                    <td>
                                        <p>Nhon La</p>
                                    </td>
                                    <td>11-28-2023</td>
                                    <td><span className="status process">Process</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </section>
    );
}
