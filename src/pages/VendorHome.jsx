import { Container, Button, Card, Row, Col } from 'react-bootstrap';
import Header from '../components/Header';
import { useSelector } from 'react-redux';

const basicImagePath = import.meta.env.VITE_MOVIES_POSTER_IMAGE_BASIC_PATH

const VendorHome = () => {
  // const events = [
  //   { id: 1, title: 'React Workshop', date: '2024-09-15', description: 'Learn the basics of React.' },
  //   { id: 2, title: 'Spring Boot Seminar', date: '2024-09-20', description: 'Deep dive into Spring Boot.' },
  //   { id: 3, title: 'JavaScript Conference', date: '2024-10-05', description: 'Explore the latest in JavaScript.' },
  // ];

  const allMovies = useSelector(state => state.movie.moviesData)
  const events = allMovies.slice(0,5)

  return (
    <>
      <Header/>

      <Container fluid className="bg-light p-5 text-center">
        <h1>Welcome to Event Manager</h1>
        <p>Manage and organize your events seamlessly.</p>
        <Button variant="primary" href="#events">View Events</Button>
      </Container>

      <Container>
        <h2 className="my-4">Upcoming Events</h2>
        <Row>
          {events.map(event => (
            <Col key={event.id} md={4} className="mb-4">
              <Card>
                <Card.Img variant="top" src={`${basicImagePath}${event.poster_path}`} alt={event.title} />
                <Card.Body>
                  <Card.Title>{event.title}</Card.Title>
                </Card.Body>
                <Card.Footer>
                  <Button>Create Shows</Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default VendorHome;
