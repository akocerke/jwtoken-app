import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Header = () => {
  return (
    <header className="bg-dark py-4">
      <Container>
        <Row className="justify-content-center">
          <Col md={6} className="text-center">
            <h1> <i className="bi bi-shield-lock"></i> JWToken-APP  <i className="bi bi-shield-lock"></i></h1>
          </Col>
        </Row>
      </Container>
    </header>
  );
}

export default Header;
