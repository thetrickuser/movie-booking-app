import { Form, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { object, string } from "yup";
import { useLoginUserMutation } from "../store/auth";

const loginSchema = object({
  email: string().required(),
  password: string().min(6, "Password must be atleast 6 letters").required(),
});

const Login = () => {
  const [loginUser, { isLoading, error }] = useLoginUserMutation();
  const navigate = useNavigate();
  const handleLogin = async (email, password) => {
    const user = await loginUser({email, password});
    console.log(user);
    navigate("/");
  }

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
  );
};

export default Login;
