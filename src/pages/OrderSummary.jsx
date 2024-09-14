import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

const OrderSummary = () => {
  const {currentMovie: movie, selectedSeats, bookingAmount} = useSelector(state => state.movie);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

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