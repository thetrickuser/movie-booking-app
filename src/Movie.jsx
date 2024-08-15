import React from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Movie = () => {
  const movie = {
    id: 1,
    title: "Movie 1",
    image: "/movie posters/batman begins.jpg",
    runtime: "192",
    genres: ["Comedy", "Drama"],
    releaseDate: "2024-08-15",
  };

  return (
    <Container className="hero-container">
      <Row>
        <Col md={4} lg={3} className="mb-4">
          <Card>
            <Card.Img variant="top" src={movie.image} alt={movie.title} />
            <Card.Body>
              <Card.Title>{movie.title}</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8} lg={6} className="mb-4">
          <Card>
            <Card.Body>
              <h1>{movie.title}</h1>
              <p>
                <span>{movie.runtime}</span> | <span>{movie.genres}</span> | {" "}
                <span>{movie.releaseDate}</span>
              </p>
            </Card.Body>
            <Button variant="info" size="lg">Book Ticket</Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Movie;
