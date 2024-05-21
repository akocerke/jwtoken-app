import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Image, Alert, Button } from "react-bootstrap";
import Content from "../../Components/Content/Content";
import { fetchUserProfile, updateUserProfileImage } from "../../api/api";

const ProfilemanageUpload = () => {
  const [profileImage, setProfileImage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); // Zustand für Erfolgsmeldungen
  const navigate = useNavigate();
  const getFullImagePath = (path) => {
    if (path.startsWith("http") || path.startsWith("https")) {
      return path; // Wenn der Pfad bereits eine vollständige URL ist
    } else {
      return `http://localhost:3030${path}`; // Basis-URL hinzufügen, wenn der Pfad relativ ist
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const loadProfileImage = async () => {
      try {
        const userProfile = await fetchUserProfile(token);
        if (userProfile && userProfile.profile_image_path) {
          const fullImagePath = getFullImagePath(
            userProfile.profile_image_path
          );
          setProfileImage(fullImagePath);
        }
      } catch (error) {
        setError("Fehler beim Laden des Profilbilds.");
      }
    };
    loadProfileImage();
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUploadClick = () => {
    const fileInput = document.getElementById("fileInput");
    fileInput.click();
  };

  const handleSaveImage = async () => {
    if (!selectedFile) {
      setError("Bitte wählen Sie zuerst ein Bild aus.");
      return;
    }
    const token = localStorage.getItem("token");
    setIsUploading(true);
    try {
      const responseString = await updateUserProfileImage(token, selectedFile);
      console.log("Response from updateUserProfileImage:", responseString); // Hier wird die Antwort als String geloggt

      setIsUploading(false);

      // Da die Antwort ein String ist, können wir sie direkt verarbeiten
      if (responseString.includes("Profilbild aktualisiert: ")) {
        const imagePath = responseString.split("Profilbild aktualisiert: ")[1];
        const newImageUrl = getFullImagePath(imagePath);
        setProfileImage(newImageUrl);
        setSuccessMessage("Das Profilbild wurde erfolgreich aktualisiert.");
        setTimeout(() => setSuccessMessage(""), 3000); // Erfolgsmeldung nach 3 Sekunden ausblenden
      } else {
        throw new Error("Unerwartete Antwortstruktur von der API");
      }
    } catch (error) {
      console.error("Fehler beim Hochladen des Profilbilds:", error);
      setError("Fehler beim Hochladen des Bildes.");
      setIsUploading(false);
    }
  };

  const handleBack = () => {
    navigate("/settings"); // Führt die Navigation zur Profilseite durch
  };

  return (
    <Content>
      <Container fluid className="p-3">
        <h2 className="text-center">Profilbild Verwalten</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        <Row className="justify-content-center col-12">
          <Col
            md={6}
            className="text-center border border-info-subtle border-1 rounded-1 mt-5"
          >
            <Image
              src={profileImage || "https://via.placeholder.com/150"}
              alt="Profilbild"
              className="img-fluid mb-4 mt-4 custom-image-size border border-info-subtle"
            />
            <input
              type="file"
              style={{ display: "none" }}
              id="fileInput"
              accept="image/*"
              onChange={handleFileChange}
            />
            <div className="xs-6 p-5 align-items-center">
            <Button variant="primary" onClick={handleUploadClick}>
              Profilbild auswählen
            </Button>
            </div>
            {previewUrl && (
              <div className="mt-3">
                <Image
                  src={previewUrl}
                  alt="Profil-Vorschau"
                  className="img-fluid mb-4 mt-4 custom-image-size border border-info-subtle"
                />
                <div className="xs-6 p-5 align-items-center">
                <Button
                  variant="success"
                  onClick={handleSaveImage}
                  disabled={isUploading}
                  >
                  Bild speichern
                </Button>
                </div>
              </div>
            )}
            <Button className="btn btn-secondary mb-4" onClick={handleBack}>
            Zurück zu Einstellungen
          </Button>
          </Col>
          
        </Row>
      </Container>
    </Content>
  );
};

export default ProfilemanageUpload;
