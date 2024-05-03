// Home.js
import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Content from "../../Components/Content/Content";
import 'bootstrap-icons/font/bootstrap-icons.css';

const Home = () => {
  return (
    <Content>
      <Container>
        <Row className="justify-content-center mt-5">
          <Col md={8} className="text-center">
            <h1>Willkommen bei JWToken-APP</h1>
            <p>
              Die sichere und effiziente Lösung für Ihre
              Authentifizierungsbedürfnisse.
            </p>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col md={4} className="text-center">
            <Card className="bg-dark text-light border border-success custom-card-size">
              <Card.Body>
                <Card.Title><i className="bi bi-shield-lock-fill"></i> Sicher</Card.Title>
                <Card.Text className="mt-4">
                  Wir verwenden die neuesten Sicherheitstechnologien, um Ihre
                  Daten sicher zu halten.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="text-center">
            <Card className="bg-dark text-light border border-success custom-card-size">
              <Card.Body>
                <Card.Title><i className="bi bi-lightning-fill"></i> Schnell</Card.Title>
                <Card.Text className="mt-4">
                  Schnelle und reibungslose Authentifizierung, egal wo Sie sind.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="text-center">
            <Card className="bg-dark text-light border border-success custom-card-size">
              <Card.Body>
                <Card.Title><i className="bi bi-shield-lock"></i> Zuverlässig</Card.Title>
                <Card.Text className="mt-4">
                  Vertrauen Sie auf eine Plattform, die weltweit von Millionen
                  genutzt wird.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Content>
  );
};

export default Home;
