import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Form,
} from "react-bootstrap";
//import authService from "../../api/auth.service";
import "./register.css";

export const Register = () => {
  const navigate = useNavigate();
  /*
  const [toast, setToast] = useState({
    show: false,
    bg: "success",
    message: "",
  });*/
  const [user, setUser] = useState({
    FullName: "",
    Email: "",
    Password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      /*
      if (!user.Email || !user.Password || !user.FullName) {
        return setToast({
          bg: "info",
          message: "Please enter your information!",
          show: true,
        });
      }

      await authService.register(user);

      setToast({
        bg: "success",
        message: "Register success. Redirect to login page...",
        show: true,
      });

      const timeout = setTimeout(() => {
        navigate("/auth/login");
        clearTimeout(timeout);
      }, 500);*/
    } catch (error) {
      /*
      if (error && error.response?.status === 409) {
        setToast({
          bg: "warning",
          message: "Account already exists, please try again",
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
    /*
      <div className="auth-form-container">
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
        <Container className="border-0">
          <Row className="vh-100 d-flex justify-content-center align-items-center">
            <Col xs={12} md={8} lg={5}>
              <Card className="shadow">
                <Card.Body>
                  <div className="mb-3 mt-md-4">
                    <h2 className="fw-bold mb-2 text-uppercase ">Register</h2>
                    <p className=" mb-4">Please enter your information!</p>
                    <div className="mb-3">
                      <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label className="text-center">
                            FullName
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={user.FullName}
                            onChange={(e) => handleInputChange(e, "FullName")}
                            placeholder="FullName"
                          />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label className="text-center">Email</Form.Label>
                          <Form.Control
                            type="email"
                            value={user.Email}
                            onChange={(e) => handleInputChange(e, "Email")}
                            placeholder="Enter email"
                          />
                        </Form.Group>
  
                        <Form.Group
                          className="mb-3"
                          controlId="formBasicPassword"
                        >
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            type="password"
                            value={user.Password}
                            onChange={(e) => handleInputChange(e, "Password")}
                            placeholder="Password"
                          />
                        </Form.Group>
                        <div className="d-flex justify-content-center">
                          <Button
                            onClick={handleSubmit}
                            className="w-50"
                            variant="primary"
                            type="submit"
                          >
                            Register
                          </Button>
                        </div>
                      </Form>
                      <div className="mt-3">
                        <p className="mb-0  text-center">
                          Already have an account?{" "}
                          <span
                            role="button"
                            onClick={() => navigate("/auth/login")}
                            className="text-primary fw-bold text-decoration-underline cursor-pointer"
                          >
                            Login
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>*/
  );
};
