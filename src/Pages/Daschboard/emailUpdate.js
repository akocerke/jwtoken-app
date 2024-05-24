import React, { useState } from "react";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import { updateUserEmail } from "../../api/api";


const EmailUpdate = () => {
  const [emailAlt, setEmailAlt] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'


  const handleEmailPreferencesChange = async () => {
    try {
      await updateUserEmail(emailAlt, newEmail);
      setMessage("E-Mail-Adresse erfolgreich aktualisiert");
      setMessageType("success");
    } catch (error) {
      setMessage(error.message);
      setMessageType("error");
    }
  };

  return (
    
      <Container>

        {message && (
          <div
            className={`alert ${messageType === "success" ? "alert-success" : "alert-danger"} mt-4`}
            role="alert"
          >
            {message}
          </div>
        )}

        

        <Row className="justify-content-center">
          <Col md={6}>
            <Card className="shadow-sm mt-4">
              <Card.Header className="bg-black text-white text-center">
                E-Mail-Adresse ändern <i className="bi bi-gear-fill"></i>
              </Card.Header>
              <Card.Body className="bg-dark text-white">
                <Form>
                  <Form.Group controlId="formEmailAlt">
                    <Form.Label>Aktuelle E-Mail-Adresse</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Aktuelle E-Mail-Adresse"
                      value={emailAlt}
                      onChange={(e) => setEmailAlt(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formNewEmail">
                    <Form.Label>Neue E-Mail-Adresse</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Neue E-Mail-Adresse"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    className="mb-3 mt-3"
                    onClick={handleEmailPreferencesChange}
                  >
                    <i class="bi bi-arrow-repeat"></i> E-Mail-Adresse aktualisieren
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
  );
};

export default EmailUpdate;
