import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { logoutUser } from '../../api/api';

const NavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = async () => {
    if (token) {
      try {
        const response = await logoutUser(token);
        console.log("Logout erfolgreich:", response.message); // Weiterhin Ausgabe im Konsolenlog
        localStorage.removeItem('token'); // Token aus dem lokalen Speicher entfernen
        navigate('/'); // Navigieren zur Startseite oder einem anderen Pfad nach dem Logout
      } catch (error) {
        console.error("Fehler beim Logout:", error);
      }
    }
  };

  return (
    <Navbar bg="black" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">JWToken-APP</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link className="text-success nav-link-hover" href="/login">Login</Nav.Link>
            <Nav.Link className="text-warning nav-link-hover" href="/signup">Registrieren</Nav.Link>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
