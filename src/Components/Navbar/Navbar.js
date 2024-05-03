import React from 'react';
import { Container} from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom'; 

const NavBar = () => {
  return (
    <Navbar bg="black" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">JWToken-APP</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
          <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link as={Link} to="/signup">Registrieren</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
