import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
} from "react-bootstrap";

import "./register.css";
import ClientAPI from "../../api/clientAPI";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export const Register = () => {
 
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  
  const navigate = useNavigate();
  useEffect(() => {
    if (Cookies.get("userID") !== undefined)
      navigate("/");
  })

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      
      if (!user.email || !user.password || !user.fullName) {
        return alert("Please enter your information!")
      }
      await ClientAPI.post("register", user);
      //console.log("From register.jsx: ",respond);      
      alert("Register success. Redirect to login page...")      
      const timeout = setTimeout(() => {
        navigate("/login");
        clearTimeout(timeout);
      }, 500);

    } catch (error) {
      //console.log(error);
      alert("Register Fail") 
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
    <div className="layout-account">      
      <Container>
        <div className="wrapbox-content-account">
          <div className="header-register-page"><h1>CREATE ACCOUNT</h1></div>
          <div id="register">
            <Form className="register-form" id="register-form" onSubmit={handleSubmit}>
              <p className="errors" style={{ display: "none" }}>
                <span className="text-error"></span>
              </p>              
              <div className="clearfix large_form">
                <label htmlFor="customer_email" className="icon-field"></label>
                <input
                  required
                  type="name"
                  value={user.fullName}
                  onChange={(e) => handleInputChange(e, "fullName")}
                  id="customer_name"
                  placeholder="Full Name"
                  className="text"
                />
              </div>                      
              <div className="clearfix large_form">
                <label htmlFor="customer_email" className="icon-field"></label>
                <input
                  required
                  type="email"
                  value={user.email}
                  onChange={(e) => handleInputChange(e, "email")}
                  id="customer_email"
                  placeholder="Email"
                  className="text"
                />
              </div>

              <div className="clearfix large_form">
                <label htmlFor="customer_password" className="icon-field"></label>
                <input
                  required
                  type="password"
                  value={user.password}
                  onChange={(e) => handleInputChange(e, "password")}
                  id="customer_password"
                  placeholder="Password"
                  className="text"
                  size="16"
                />
              </div>

              <div className="clearfix large_form sitebox-recaptcha">
                This site is protected by reCAPTCHA and the Google{" "}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer">
                  Terms of Service
                </a>{" "}
                apply.
              </div>
              <div className="clearfix custommer_account_action">
                <div className="action_bottom">
                  <Button className="btn btn-signin button" type="submit">
                    REGISTER
                  </Button>
                </div>
              </div>
              <div className="req_pass">
                <a href="/" rel="noreferrer">
                  Go back to the main page
                </a>
                <br />
              </div>
            </Form>
          </div>
        </div>
      </Container>
    </div>
  );
};
