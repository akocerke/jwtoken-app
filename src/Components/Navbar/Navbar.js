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
        console.log("Logout erfolgreich:", response.message);
        localStorage.removeItem('token');
        navigate('/');
      } catch (error) {
        console.error("Fehler beim Logout:", error);
      }
    }
  };

  return (
    <Navbar bg="black" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">SkillShare Plattform-APP</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          
          <Nav className="mx-auto">
            <Nav.Link className="text-info" href="/dashboard">Dashboard</Nav.Link>
            <Nav.Link className="text-info" href="/profile">Profil</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link className="text-success" href="/login">Login</Nav.Link>
            <Nav.Link className="text-warning" href="/signup">Registrieren</Nav.Link>
            <Nav.Link className="text-danger" onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
