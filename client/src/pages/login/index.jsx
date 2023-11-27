import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
  Toast
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./login.css";
import ClientAPI from "../../api/clientAPI";
import Cookies from 'js-cookie';

export const Login = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState({
    show: false,
    bg: "success",
    message: "",
  });
  const [user, setUser] = useState({
    email: "",
    password: "",
  });  
  useEffect(()=>{
    if (Cookies.get("userID") !== undefined)
      navigate("/");
  })
 

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {    
      const respond = await ClientAPI.post("login",user);
      console.log("From Login.js: ",respond.data);
      if(respond.data.userID !==undefined){
        Cookies.set("userID", respond.data.userID);
        Cookies.set("isAdmin", respond.data.isAdmin); 
               
        setToast({
          bg: "success",
          message: "Login success. Redirect to home page...",
          show: true,
        });
        const timeout = setTimeout(() => {
          navigate("/");
          clearTimeout(timeout);
        }, 500);
      }
      else{
        setToast({
          bg: "Fail",
          message: "Login fail.",
          show: true,
        });
      }
    } catch (error) {   
      alert(error);
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
        <Toast
          className="position-fixed top-0 end-0"
          onClose={() => setToast((prev) => ({ ...prev, show: false }))}
          show={toast.show}
          delay={3000}
          bg={toast.bg}
          autohide
        >
          <Toast.Body className="text-light fs-6">{toast.message}</Toast.Body>
        </Toast>
        <Container>
          <div className="wrapbox-content-account">
            <div className="header-login-page"><h1>LOG IN</h1></div>
            <div id="customer_login">
              <Form className="login-form" id="login-form" onSubmit={handleSubmit}>
                <p className="errors" style={{ display: "none" }}>
                  <span className="text-error"></span>
                </p>
                <div className="clearfix large_form">
                  <label for="customer_email" className="icon-field"></label>
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
                  <label for="customer_password" className="icon-field"></label>
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
                      Log in
                    </Button>
                  </div>
                  <div className="req_pass">
                    <span role="button" onClick={() => navigate("/register")}>
                      Forgot password?
                    </span>
                    <br />
                    or{" "}
                    <span role="button" onClick={() => navigate("/register")}>
                      REGISTER
                    </span>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </Container>
      </div>
    </main>
  );
};
