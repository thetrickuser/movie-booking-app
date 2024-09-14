import { Form, Button, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import { loginUser } from "../logic/loginThunk";
import { object, string } from "yup";

const loginSchema = object({
  email: string().required(),
  password: string().min(6, "Password must be atleast 6 letters").required(),
});

const Login = () => {
  const dispatch = useDispatch();
  return (
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
            dispatch(loginUser({ ...values }));
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
  );
};

export default Login;
