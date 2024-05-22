import React, { useEffect, useState } from "react";
import { Form, Button, Container, Alert, Row, Col } from "react-bootstrap";
import Content from "../../Components/Content/Content";
import { updateUserProfile, getUserProfile } from "../../api/api"; // Annahme: getUserProfile ist eine API-Funktion, die Benutzerdaten lädt
import { useNavigate } from "react-router-dom";
const ProfileUpdateForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    streetName: "",
    streetNumber: "",
    city: "",
    postalCode: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await getUserProfile(token);
        console.log(data);
        if (data) {
          setFormData({
            email: data.email || "", // Stelle sicher, dass auch das 'email'-Feld korrekt gehandhabt wird, falls es benötigt wird.
            firstName: data.first_name || "", // Ändere zu snake_case, entsprechend der Datenstruktur
            lastName: data.last_name || "",
            streetName: data.street_name || "",
            streetNumber: data.street_number || "",
            city: data.city || "",
            postalCode: data.postal_code || "",
          });
        } else {
          throw new Error("Hier kannst du deine Profildaten bearbeiten");
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await updateUserProfile(token, formData);
      console.log(response);
      setSuccessMessage("Profil erfolgreich aktualisiert!");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(
        "Fehler beim Aktualisieren des Profils. Bitte versuche es erneut."
      );
      setSuccessMessage("");
    }
  };
  const handleBack1 = () => {
    navigate("/dashboard");
  };
  const handleBack2 = () => {
    navigate("/settings");
  };
  return (
    <Content>
      <Container className="text-center">
        <h2 className="pb-4">Profil aktualisieren</h2>
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        {errorMessage && <Row className="justify-content-center"><Alert variant="warning" className="col-6">{errorMessage}</Alert></Row>}
      </Container>
      <Container className="mt-5 border border-warning p-5 rounded bg-gradient col-6">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Vorname</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Vorname"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Nachname</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Nachname"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Straßenname</Form.Label>
            <Form.Control
              type="text"
              name="streetName"
              value={formData.streetName}
              onChange={handleChange}
              placeholder="Strasse"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Hausnummer</Form.Label>
            <Form.Control
              type="text"
              name="streetNumber"
              value={formData.streetNumber}
              onChange={handleChange}
              placeholder="Hausnummer"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Stadt</Form.Label>
            <Form.Control
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Stadt"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Postleitzahl</Form.Label>
            <Form.Control
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              placeholder="Postleitzahl"
            />
          </Form.Group>
          <Row className="justify-content-between">
            <Col xs={4} className="mt-4" >
              <Button variant="success" type="submit" className="float-start" >
              <i class="bi bi-arrow-repeat"></i> Aktualisieren
              </Button>
            </Col>
            <Col xs={4} className="mt-4">
            <Button variant="info" onClick={handleBack1} className="float-center">
            <i className="bi bi-speedometer2"></i> Dashboard
              </Button>
              
            </Col>
            <Col xs={4} className="mt-4">
            <Button variant="info" onClick={handleBack2} className="float-end">
              <i className="bi bi-gear-fill"></i> Einstellungen
              </Button></Col>
          </Row>
        </Form>
      </Container>
    </Content>
  );
};

export default ProfileUpdateForm;
