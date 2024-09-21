import { useEffect } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Hero.css";
import { useGetAllMoviesQuery } from "../store/movie";

const basicImagePath = import.meta.env.VITE_MOVIES_POSTER_IMAGE_BASIC_PATH

const Hero = () => {
  const { data: moviesData, error, loading } = useGetAllMoviesQuery();
  return (
    <Container className="hero-container">
      <Row>
        {loading && <p>Loading Movies</p>}
        {error && <p>Error loading movies</p>}
        {moviesData?.map((movie) => (
          <Col key={movie.id} md={4} lg={3} className="mb-4">
            <Link to={`/movie/${movie.id}`} className="card-link">
              <Card>
                <Card.Img variant="top" src={`${basicImagePath}${movie.poster_path}`} alt={movie.title} />
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
