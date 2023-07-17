import React, { useState } from "react";
import {
  Col,
  Button,
  Row,
  Container,
  Card,
  Form,
  Toast,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import authService from "../../api/auth.service";

export const Login = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState({
    show: false,
    bg: "success",
    message: "",
  });
  const [user, setUser] = useState({
    Email: "",
    Password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!user.Email || !user.Password) {
        return setToast({
          bg: "info",
          message: "Please enter your email, password!",
          show: true,
        });
      }
      const resp = await authService.login(user);
      localStorage.setItem("user_info", JSON.stringify(resp.data));
      setToast({
        bg: "success",
        message: "Login success. Redirect to home page...",
        show: true,
      });
      const timeout = setTimeout(() => {
        navigate("/");
        clearTimeout(timeout);
      }, 500);
    } catch (error) {
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
      }
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
    <div className="auth-form-container w-100">
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
                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className=" mb-4">Please enter your email and password!</p>
                  <div className="mb-3">
                    <Form>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">Email</Form.Label>
                        <Form.Control
                          value={user.Email}
                          onChange={(e) => handleInputChange(e, "Email")}
                          type="email"
                          placeholder="Enter email"
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          value={user.Password}
                          onChange={(e) => handleInputChange(e, "Password")}
                          type="password"
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
                          Login
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Don't have an account?{" "}
                        <span
                          role="button"
                          onClick={() => navigate("/auth/register")}
                          className="text-primary fw-bold text-decoration-underline cursor-pointer"
                        >
                          Register
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
    </div>
  );
};
