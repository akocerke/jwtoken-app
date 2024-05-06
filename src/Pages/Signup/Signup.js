import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import Content from "../../Components/Content/Content";
import { registerUser } from '../../api/api';

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const data = await registerUser(email, password);
      console.log("Registrierung erfolgreich:", data);
      setSuccessMessage("Registrierung erfolgreich! Du kannst dich jetzt einloggen.");
      setError(null);
      // Optional: Umleiten des Benutzers oder weitere Schritte
    } catch (error) {
      const errorMsg = error.response ? error.response.data.message : error.message;
      setError(errorMsg);
      setSuccessMessage(null);
    }
  };

  return (
    <Content>
      <Container className="mt-5 border border-warning p-5 rounded bg-gradient col-6">
        <Row className="justify-content-center">
          <Col md={6}>
            <Form onSubmit={handleRegister}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>E-Mail</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Geben Sie Ihren Benutzernamen ein"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                Registrieren
              </Button>
              {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
              {successMessage && <Alert variant="success" className="mt-3">{successMessage}</Alert>}
            </Form>
          </Col>
        </Row>
      </Container>
    </Content>
  );
};

export default Signup;
