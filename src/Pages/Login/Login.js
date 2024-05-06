import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import Content from "../../Components/Content/Content";
import { loginUser } from '../../api/api';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate(); 

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const data = await loginUser(email, password);
      console.log(`Login erfolgreich:`, data); // Besser strukturierte Ausgabe
      localStorage.setItem('token', data.token);
      setSuccessMessage("Login erfolgreich!");
      setError(null);
      navigate('/profile');
    } catch (error) {
      let errorMsg = "Anmeldefehler"; // Standardfehlermeldung
      if (error.response && error.response.data && error.response.data.message) {
        errorMsg = error.response.data.message;
      } else if (error.message) {
        errorMsg = error.message;
      }
      console.error("Login fehlgeschlagen:", errorMsg); // Gibt detailliertere Fehlerinformationen aus
      setError(errorMsg);
      setSuccessMessage(null);
    }
  };
  
  return (
    <Content>
      <Container className="mt-5 border border-warning p-5 rounded bg-gradient col-6">
        <Row className="justify-content-center">
          <Col md={6}>
            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="E-Mail einegen"
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
                Log In
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

export default Login;
