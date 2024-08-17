import React from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <Card style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
            <Card.Body>
                <Card.Title>Login</Card.Title>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email ID</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" required />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" required />
                    </Form.Group>

                    <Button variant="primary" type="submit" style={{ marginTop: '10px' }}>
                        Login
                    </Button>
                </Form>
                <p style={{ marginTop: '10px' }}>
                    Not registered? <Link to="/register">Register here</Link>
                </p>
            </Card.Body>
        </Card>
    );
};

export default Login;
