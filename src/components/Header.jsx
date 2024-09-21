import React from "react";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Dropdown,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import "./Header.css"; // Import the CSS file for custom styles
import { Link } from "react-router-dom";
import { auth } from "../../firebaseConfig";
import { useLogoutUserMutation } from "../store/auth";

const Header = () => {
  const [logoutUser] = useLogoutUserMutation();

  const user = auth.currentUser;

  const handleLogout = async () => {
    await logoutUser();
  }

  const handleVendorLogin = () => {
    console.log("Vendor login clicked");
  }
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">MoviesMagic</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Row className="w-100 align-items-center">
            <Col md={3}>
              <Nav>
                <Dropdown>
                  <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    Select City
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">New York</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Los Angeles</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Chicago</Dropdown.Item>
                    {/* Add more cities as needed */}
                  </Dropdown.Menu>
                </Dropdown>
              </Nav>
            </Col>
            <Col md={6}>
              <Form className="w-100 d-flex">
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2 flex-grow-1"
                />
                <Button variant="outline-success">
                  <FaSearch />
                </Button>
              </Form>
            </Col>
            <Col md={2} className="text-right">
              {user ? (
                <Dropdown>
                  <Dropdown.Toggle variant="secondary" id="dropdown-profile">
                    <FaUserCircle size={30} />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#/profile">Profile</Dropdown.Item>
                    <Dropdown.Item href="#/settings">Settings</Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Link to={"/login"}>Login</Link>
              )}
            </Col>
            <Col md={1} className="text-right">
            <Link to={"/login"} onClick={handleVendorLogin}>List Your Show</Link>
            </Col>
          </Row>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
