import React, { useState } from "react";
import {
    Button,
    Container,
    Form,
} from "react-bootstrap";
import authService from "../../api/auth.service";
import { useNavigate } from "react-router-dom";
import "./adminLogin.css";

export const AdminLogin = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        Email: "",
        Password: "",
    });


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const resp = await authService.login(user);
            localStorage.setItem("user_info", JSON.stringify(resp.data));

            // Check user ID to determine role
            const userId = resp.data.id; // Modify this line based on your response structure

            if (userId === 1) {
                // Admin
                navigate("/adminDashboard");
            } else {
                // Customer
                navigate("/products");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleInputChange = (event, key) => {
        setUser((prev) => {
            return {
                ...prev,
                [key]: event.target.value,
            };
        });
    };
    return (
        <main className="customers-login-rabbit-en py-5">
            <div className="layout-account">
                <Container>
                    <div className="wrapbox-content-account">
                        <div className="header-login-page"><h1>ADMIN LOG IN</h1></div>
                        <div id="admin_login">
                            <Form className="login-form" id="login-form" onSubmit={handleSubmit}>
                                <p className="errors" style={{ display: "none" }}>
                                    <span className="text-error"></span>
                                </p>
                                <div className="clearfix large_form">
                                    <label for="customer_email" className="icon-field"></label>
                                    <input
                                        required
                                        type="email"
                                        value={user.Email}
                                        onChange={(e) => handleInputChange(e, "Email")}
                                        id="customer_email"
                                        placeholder="Email"
                                        className="text"
                                    />
                                </div>

                                <div className="clearfix large_form">
                                    <label for="customer_password" className="icon-field"></label>
                                    <input
                                        required
                                        type="password"
                                        value={user.Password}
                                        onChange={(e) => handleInputChange(e, "Password")}
                                        id="customer_password"
                                        placeholder="Password"
                                        className="text"
                                        size="16"
                                    />
                                </div>

                                <div className="action_bottom">
                                    <Button className="btn btn-signin button" type="submit">
                                        Log in
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </Container>
            </div>
        </main>
    );
};
