import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Image, Button, Alert } from "react-bootstrap";
import Content from "../../Components/Content/Content";
import { fetchUserProfile, getUserProfile } from "../../api/api";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [basicInfo, setBasicInfo] = useState({});
  const [profileInfo, setProfileInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem("token");
    const loadBasicInfo = fetchUserProfile(userToken);
    const loadProfileInfo = getUserProfile(userToken);

    Promise.all([loadBasicInfo, loadProfileInfo])
      .then(([basicData, profileData]) => {
        const imagePath = basicData.profile_image_path.startsWith('http')
                         ? basicData.profile_image_path
                         : `http://localhost:3030${basicData.profile_image_path}`;
        setBasicInfo({...basicData, profile_image_path: imagePath});
        setProfileInfo(profileData || {});
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Fehler beim Laden des Profils");
        setLoading(false);
      });
  }, []);

  const handleUploadClick = () => {
    navigate("/profile/upload");
  };

  if (loading) return <p>Lädt...</p>;
  if (error) return <Alert variant="danger">Fehler: {error}</Alert>;

  return (
    <Content>
      <Container>
        <Row className="d-flex justify-content-center">
          <Col md={6} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Header className="bg-black text-white">
                {profileInfo?.first_name || "Kein Vorname"}{" "}
                {profileInfo?.last_name || "Kein Nachname"}
              </Card.Header>
              <Card.Body className="bg-dark text-white text-center">
                <Image
                  src={basicInfo?.profile_image_path || 'https://via.placeholder.com/150'}
                  roundedCircle
                  className="img-fluid mb-4 mt-4 custom-image-size border border-info-subtle"
                />
                <Col>
                  <Button onClick={handleUploadClick} variant="info" className="mt-4 mb-3 text-danger-emphasis">
                    Profilbild bearbeiten
                  </Button>
                </Col>
                <hr />
                <Card.Text>
                  Email: {basicInfo?.email || "Keine E-Mail"}
                </Card.Text>
                <Card.Text>
                  Ort: {profileInfo?.postal_code || "Keine PLZ"} {profileInfo?.city || "Keine Stadt"}
                </Card.Text>
                <Button onClick={() => navigate("/profile-update")} variant="warning" className="mt-4 mb-3 text-danger-emphasis">
                  Profil bearbeiten
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Header className="bg-black text-white">
                Skills
              </Card.Header>
              <Card.Body className="bg-dark text-white text-center">
                kommt noch
                
                <hr />
                <Card.Text>
                  kommt noch
                </Card.Text>
                <Card.Text>
                kommt noch
                </Card.Text>
                
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Content>
  );
};

export default Profile;
