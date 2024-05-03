// Login.js
import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import Content from "../../Components/Content/Content";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault(); // Verhindert das Neuladen der Seite
    // Implementieren Sie hier Ihre Login-Logik, z.B. einen API-Aufruf
    console.log("Anmeldeversuch mit:", username, password);
  };

  return (
    <Content>
      <Container className="mt-5 border border-warning p-5 rounded bg-gradient col-6">
        <Row className="justify-content-center">
          <Col md={6}>
            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Benutzername</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Geben Sie Ihren Benutzernamen ein"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Passwort</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Passwort"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Button variant="success" type="submit" className="mt-5">
                Anmelden
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Content>
  );
};

export default Login;
