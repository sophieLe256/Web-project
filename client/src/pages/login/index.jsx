import React, { useState } from "react";
import {
  Button,
  Container,
  Form,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import authService from "../../api/auth.service";
import "./login.css";

export const Login = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    Email: "",
    Password: "",
  });
  /*
    const [toast, setToast] = useState({
      show: false,
      bg: "success",
      message: "",
    });*/

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      /*
      if (!user.Email || !user.Password) {
        return setToast({
          bg: "info",
          message: "Please enter your email, password!",
          show: true,
        });
      }*/
      const resp = await authService.login(user);
      localStorage.setItem("user_info", JSON.stringify(resp.data));
      /*
      setToast({
        bg: "success",
        message: "Login success. Redirect to home page...",
        show: true,
      });*/
      const timeout = setTimeout(() => {
        navigate("/");
        clearTimeout(timeout);
      }, 500);
    } catch (error) {
      /*
      if (error && error.response?.status === 401) {
        setToast({
          bg: "warning",
          message: "Email or password is incorrect...",
          show: true,
        });
      } else {
        setToast({
          bg: "danger",
          message: "Something went wrong!",
          show: true,
        });
      }*/
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
                      Log in
                    </Button>
                  </div>
                  <div className="req_pass">
                    <span role="button" onClick={() => navigate("/auth/register")}>
                      Forgot password?
                    </span>
                    <br />
                    or{" "}
                    <span role="button" onClick={() => navigate("/auth/register")}>
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
