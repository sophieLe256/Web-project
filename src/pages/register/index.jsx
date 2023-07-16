import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import authService from "../../api/auth.service";

export const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    FullName: "Nguyen Quang",
    Email: "quang.nv212@gmail.com",
    Password: "1234",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const resp = await authService.register(user);
      console.log(resp);
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
  console.log(user);
  return (
    <div className="auth-form-container">
      <Container>
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
    </div>
  );
};
