import { useEffect, useState } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useGetMovieByIdQuery } from "../store/movie";

const basicImagePath = import.meta.env.VITE_MOVIES_POSTER_IMAGE_BASIC_PATH

const Movie = () => {
  const {id} = useParams();
  const navigate = useNavigate()
  const [duration, setDuration] = useState({})

  const { data: movie, error, isLoading } = useGetMovieByIdQuery(id);

  const handleBookTicket = () => {
    navigate("/booking")
  }

  if (!movie) {
    return <p>Loading Movie..</p>
  }

  return (
    <Container className="hero-container">
      <Row>
        <Col md={4} lg={3} className="mb-4">
          <Card>
            <Card.Img src={`${basicImagePath}${movie.poster_path}`} alt={movie.title} />
            <Card.Body>
              <Card.Title>{movie.title}</Card.Title>
              <Card.Subtitle>{movie.tagline}</Card.Subtitle>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8} lg={6} className="mb-4">
          <Card>
            <Card.Body>
              <h1>{movie.title}</h1>
              <Card.Text>{movie.overview}</Card.Text>
              <p>
                <span>{duration.h} hour {duration.m} mins</span> | <>{movie.genres.map(genre => <span key={genre.id}>{genre.name} </span>)}</> | {" "}
                <span>{movie.release_date}</span>
              </p>
            </Card.Body>
            <Button variant="info" size="lg" onClick={handleBookTicket}>Book Ticket</Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Movie;
