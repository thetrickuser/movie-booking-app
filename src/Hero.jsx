import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Hero.css'; // Import the CSS file for custom styles

const movies = [
  { id: 1, title: 'Movie 1', image: '/movie posters/batman begins.jpg' },
  { id: 2, title: 'Movie 2', image: '/movie posters/borderlands.jpg' },
  { id: 3, title: 'Movie 3', image: '/movie posters/wolverine.jpg' },
  { id: 4, title: 'Movie 4', image: '/movie posters/trap.jpg' },
  { id: 5, title: 'Movie 5', image: '/movie posters/interstellar.jpg' },
];

const Hero = () => {
  return (
    <Container className="hero-container">
      <Row>
        {movies.map(movie => (
          <Col key={movie.id} md={4} lg={3} className="mb-4">
            <Link to={`/movie/${movie.id}`} className="card-link">
              <Card>
                <Card.Img variant="top" src={movie.image} alt={movie.title} />
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Hero;
