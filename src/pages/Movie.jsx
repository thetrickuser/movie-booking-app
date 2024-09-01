import { useEffect, useState } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getMovieById } from "../logic/movieThunk";

const basicImagePath = import.meta.env.VITE_MOVIES_POSTER_IMAGE_BASIC_PATH

const Movie = () => {
  const {id} = useParams();
  const dispatch = useDispatch()
  const [movie, setMovie] = useState(null);

  console.log(movie)

  useEffect(() => {
    console.log("calling get movie")
    dispatch(getMovieById(id))
    .unwrap()
      .then(response => setMovie(response))
      .catch(error => console.error('Error fetching movie:', error));

  }, [dispatch, id]);

  console.log(movie)

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
                <span>{movie.runtime}</span> | <>{movie.genres.map(genre => <span key={genre.id}>{genre.name} </span>)}</> | {" "}
                <span>{movie.release_date}</span>
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
