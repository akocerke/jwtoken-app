import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { logoutUser } from '../../api/api';
import { useAuth } from "../../auth/AuthContext";

const NavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const { isLoggedIn} = useAuth(); 

  const handleLogout = async () => {
    if (token) {
      try {
        const response = await logoutUser(token);
        console.log("Logout erfolgreich:", response.message);
        localStorage.removeItem('token');
        navigate('/');
        window.location.reload();
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
          <Nav className="ms-auto">
          {isLoggedIn &&  <Nav.Link className="text-info" href="/dashboard"><i className="bi bi-speedometer2"></i> Dashboard</Nav.Link>}
          </Nav>
          <Nav className="ms-auto">
          {!isLoggedIn && <Nav.Link className="text-success" href="/login"><i className="bi bi-box-arrow-in-right"></i> Login</Nav.Link>}
          {!isLoggedIn && <Nav.Link className="text-warning" href="/signup"><i className="bi bi-person-plus"></i> Signup</Nav.Link>}
          {isLoggedIn && <Nav.Link className="text-danger" onClick={handleLogout}><i className="bi bi-box-arrow-left"></i> Logout</Nav.Link>}
          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
