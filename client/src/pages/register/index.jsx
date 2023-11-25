import React, { useState } from "react";
import {
  Button,
  Container,
  Form,
} from "react-bootstrap";

import "./register.css";
export const Register = () => {
 
  const [user, setUser] = useState({
    FullName: "",
    Email: "",
    Password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      
      if (!user.Email || !user.Password || !user.FullName) {
        return setToast({
          bg: "info",
          message: "Please enter your information!",
          show: true,
        });
      }
      const respond = await ClientAPI.post("register", user);
      console.log("From register.jsx: ",respond);      
      setToast({
        bg: "success",
        message: "Register success. Redirect to login page...",
        show: true,
      });
      const timeout = setTimeout(() => {
        navigate("/auth/login");
        clearTimeout(timeout);
      }, 500);

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
                <label for="customer_email" className="icon-field"></label>
                <input
                  required
                  type="surname"
                  value={user.Surname}
                  onChange={(e) => handleInputChange(e, "Surname")}
                  id="customer_surname"
                  placeholder="Surname"
                  className="text"
                />
              </div>
              <div className="clearfix large_form">
                <label for="customer_email" className="icon-field"></label>
                <input
                  required
                  type="name"
                  value={user.Name}
                  onChange={(e) => handleInputChange(e, "Name")}
                  id="customer_name"
                  placeholder="Name"
                  className="text"
                />
              </div>
              <div className="radio-buttons">
                <input type="radio" value="Male" name="gender" /> Male
                <input type="radio" value="Female" name="gender" /> Female
              </div>
              <div className="clearfix large_form">
                <label for="customer_email" className="icon-field"></label>
                <input
                  required
                  type="date"
                  value={user.dateofbirth}
                  onChange={(e) => handleInputChange(e, "mm/dd/yy")}
                  id="customer_dateofbirth"
                  placeholder="mm/dd/yy"
                  className="text"
                  size="8"
                />
              </div>
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
