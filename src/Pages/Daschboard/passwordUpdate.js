import React, { useState } from "react";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import { updateUserPassword} from "../../api/api";

const PasswordUpdate = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'

  const handlePasswordChange = async () => {
    try {
      await updateUserPassword(oldPassword, newPassword);
      setMessage("Passwort erfolgreich geändert");
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
                Passwort ändern <i className="bi bi-gear-fill"></i>
              </Card.Header>
              <Card.Body className="bg-dark text-white">
                <Form>
                  <Form.Group controlId="formOldPassword">
                    <Form.Label>Altes Passwort</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Altes Passwort"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formNewPassword">
                    <Form.Label>Neues Passwort</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Neues Passwort"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    onClick={handlePasswordChange}
                    className="mb-3 mt-3"
                  >
                    <i class="bi bi-arrow-repeat"></i> Passwort ändern 
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
  );
};

export default PasswordUpdate;
