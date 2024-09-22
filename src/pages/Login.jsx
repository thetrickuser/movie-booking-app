import { Form, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { object, string } from "yup";
import { useLoginUserMutation } from "../api/authApi";
import React from "react";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/userDetailsSlice";

const loginSchema = object({
  email: string().required(),
  password: string().min(6, "Password must be atleast 6 letters").required(),
});

const Login = () => {
  const [loginUser, { isLoading, error, isError, isSuccess }] = useLoginUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async (email, password) => {
    const response = await loginUser({email, password});
    if (response.data.status === "SUCCESS") {
      console.log(response.data);
      dispatch(setUserDetails(response.data.userData));
    }
    navigate("/");
  }

  return (
    <React.Fragment>
    <Card style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <Card.Body>
        <Card.Title>Login</Card.Title>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={loginSchema}
          onSubmit={(values) => {
            handleLogin(values.email, values.password);
          }}
        >
          {({ values, handleChange, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="email">
                <Form.Label>Email ID</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                  placeholder="Enter email"
                  required
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  onChange={handleChange}
                  value={values.password}
                  placeholder="Password"
                  required
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                style={{ marginTop: "10px" }}
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
        <p style={{ marginTop: "10px" }}>
          Not registered? <Link to="/register">Register here</Link>
        </p>
      </Card.Body>
    </Card>
    {isLoading && <p>Loading...</p>}
    </React.Fragment>
  );
};

export default Login;
