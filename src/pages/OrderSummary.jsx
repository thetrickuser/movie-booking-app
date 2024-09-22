import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { auth } from "../../firebaseConfig";

const OrderSummary = () => {
  const { movie, seats: selectedSeats, amount: bookingAmount } = useSelector(state => state.booking);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const user = useSelector(state => state.userDetails);
  console.log(user);

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
    console.log("Phone Number:", phoneNumber);
    console.log("Email:", email);
  };

  return (
    <div>
      <h2>Order Summary</h2>
      <Form onSubmit={handleSubmit}>
        {user ?
          <>
            <Form.Label>Your Details</Form.Label>
            <Form.Label>Name: {user.name}</Form.Label>
            <Form.Label>Email: {user.email}</Form.Label>
            <Form.Label>Phone Number: {user.phoneNumber}</Form.Label>
          </> :
          <>
            <Form.Group controlId="phoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={handleEmailChange}
              />
            </Form.Group>
          </>
        }
        <Button variant="primary" type="submit">
          Proceed to Book
        </Button>
      </Form>
      <div className="mt-4">
        <h3>Booking Summary</h3>
        <p>Movie: {movie.title}</p>
        <p>Selected Seats: {selectedSeats.join(", ")}</p>
        <p>Total Amount: {bookingAmount}</p>
      </div>
    </div>
  );
};

export default OrderSummary;