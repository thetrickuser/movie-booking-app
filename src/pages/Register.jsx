import { Formik } from "formik";
import { useEffect, useState } from "react";
import { Form, Button, Card, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { registerUser } from "../logic/registerThunk";

const registerSchema = object({
  name: string().required(),
  email: string().required(),
  password: string().min(6, "Password must be atleast 6 letters").required(),
  phoneNumber: string().length(10, "Please enter a valid phone number"),
});

const Register = () => {
  const dispatch = useDispatch();
  const { userType, registrationSuccess, error } = useSelector((state) => state.auth);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (registrationSuccess) {
      setShowSuccessModal(true);
    }
  }, [registrationSuccess]);

  useEffect(() => {
    if (error) {
      setShowErrorModal(true);
    }
  }, [error]);

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    navigate("/");
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  return (
    <Card style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <Card.Body>
        <Card.Title>Register</Card.Title>
        <Formik
          initialValues={{
            name: "",
            phoneNumber: "",
            email: "",
            password: "",
          }}
          validationSchema={registerSchema}
          onSubmit={(values) => {
            console.log({ ...values, userType });
            dispatch(registerUser({ ...values, userType }));
          }}
        >
          {({ values, errors, handleChange, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Name"
                  onChange={handleChange}
                  value={values.name}
                />
              </Form.Group>

              <Form.Group controlId="phoneNumber">
                <Form.Label>Phone number</Form.Label>
                <Form.Control
                  type="number"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  value={values.phoneNumber}
                />
                <p>{errors.phoneNumber}</p>
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>Email ID</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="email"
                  onChange={handleChange}
                  value={values.email}
                />
                <p>{errors.email}</p>
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  value={values.password}
                />
                <p>{errors.password}</p>
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                style={{ marginTop: "10px" }}
              >
                Register
              </Button>
            </Form>
          )}
        </Formik>
        <p style={{ marginTop: "10px" }}>
          Already registered? <Link to="/login">Login here</Link>
        </p>
      </Card.Body>
      {/* Success Modal */}
      <Modal show={showSuccessModal} onHide={handleCloseSuccessModal}>
        <Modal.Header closeButton>
          <Modal.Title>Registration Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your account has been created successfully.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseSuccessModal}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Error Modal */}
      <Modal show={showErrorModal} onHide={handleCloseErrorModal}>
        <Modal.Header closeButton>
          <Modal.Title>Registration Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{error}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseErrorModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default Register;
