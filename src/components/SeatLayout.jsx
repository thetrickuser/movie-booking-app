import React, { useState } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SeatLayout.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setOrderSummary } from "../store/bookingSlice";

const generateSeats = () => {
  const rows = "ABCDEFGHIJK";
  const seats = [];
  let price = 0;
  for (let i = 0; i < rows.length; i++) {
    const row = [];
    if (i < 2) {
      price = 400;
    } else if (i >= 2 && i < 7) {
      price = 200;
    } else {
      price = 100;
    }
    for (let j = 1; j <= 15; j++) {
      const seatNumber = `${rows[i]}${j}`;
      row.push({ seatNumber, price });
    }
    seats.push(row);
  }
  return seats;
};

const SeatLayout = ({ movie }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookingAmount, setBookingAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const seats = generateSeats();

  const handleSeatClick = (seat) => {
    if (selectedSeats.includes(seat.seatNumber)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat.seatNumber));
      setBookingAmount(bookingAmount - seat.price);
    } else {
      setSelectedSeats([...selectedSeats, seat.seatNumber]);
      setBookingAmount(bookingAmount + seat.price);
    }
  };

  const handleBook = () => {
    setShowModal(true);
  };

  const handleProceed = () => {
    setShowModal(false);
    dispatch(setOrderSummary({
      seats: selectedSeats, amount: bookingAmount
    }))
    navigate("/order-summary")
  };

  const renderRow = (row, rowIndex) => (
    <Row key={rowIndex} className="justify-content-center mb-1 flex-nowrap">
      {row.map((seat, seatIndex) => (
        <React.Fragment key={seat.seatNumber}>
          {seatIndex === 5 && <Col xs="auto" className="mx-2"></Col>}
          <Col className="mx-1">
            <Button
              className="seat-button"
              variant={
                selectedSeats.includes(seat.seatNumber)
                  ? "success"
                  : "secondary"
              }
              onClick={() => handleSeatClick(seat)}
            >
              {seat.seatNumber}
            </Button>
          </Col>
        </React.Fragment>
      ))}
    </Row>
  );

  return (
    <React.Fragment>
      <h2>{movie.title}</h2>
      <Container>
        <h2>Total Amount: {bookingAmount}</h2>
        <h2 className="text-center my-4">Select Your Seats</h2>
        <div className="scrollable-container position-relative">
          <h4 className="text-center my-2">Premium Category</h4>
          {seats.slice(0, 2).map((row, rowIndex) => renderRow(row, rowIndex))}
          <div className="my-4"></div>
          <h4 className="text-center my-2">Special Category</h4>
          {seats
            .slice(2, 7)
            .map((row, rowIndex) => renderRow(row, rowIndex + 4))}
          <div className="my-4"></div>
          <h4 className="text-center my-2">General Category</h4>
          {seats.slice(7).map((row, rowIndex) => renderRow(row, rowIndex + 8))}
        </div>
        <div className="text-center mt-4">
          <Button variant="primary" onClick={handleBook}>
            Book Now
          </Button>
        </div>
      </Container>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Booking Summary</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Selected Seats: {selectedSeats.join(", ")}</p>
          <p>Total Booking Amount: {bookingAmount}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleProceed}>
            Proceed to Book
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default SeatLayout;
