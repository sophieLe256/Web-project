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
                        <ul class="breadcrumb">
                            <li>
                                <a href="#">Dashboard</a>
                            </li>
                            <li><i class='bx bx-chevron-right' ></i></li>
                            <li>
                                <a class="active" href="#">Home</a>
                            </li>
                        </ul>
                    </div>
                    <a href="#" class="btn-download">
                        <i class='bx bxs-cloud-download' ></i>
                        <span class="text">Download PDF</span>
                    </a>
                </div>

                <ul class="box-info">
                    <li>
                        <i class='bx bxs-calendar-check' ></i>
                        <span class="text">
                            <h3>0</h3>
                            <p>New Order</p>
                        </span>
                    </li>
                    <li>
                        <i class='bx bxs-group' ></i>
                        <span class="text">
                            <h3>0</h3>
                            <p>Visitors</p>
                        </span>
                    </li>
                    <li>
                        <i class='bx bxs-dollar-circle' ></i>
                        <span class="text">
                            <h3>$0</h3>
                            <p>Total Sales</p>
                        </span>
                    </li>
                </ul>
                <div className="table-data">
                    <div className="order">
                        <div className="head">
                            <h3>Recent Orders</h3>
                            <i class='bx bx-search' ></i>
                            <i class='bx bx-filter' ></i>
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
                                    <td>01-10-2023</td>
                                    <td><span class="status completed">Completed</span></td>
                                </tr>
                                <tr>
                                    <td>
                                        <p>An Cao</p>
                                    </td>
                                    <td>01-10-2023</td>
                                    <td><span class="status pending">Pending</span></td>
                                </tr>
                                <tr>
                                    <td>
                                        <p>Nhon La</p>
                                    </td>
                                    <td>01-10-2023</td>
                                    <td><span class="status process">Process</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </section>
    );
}
