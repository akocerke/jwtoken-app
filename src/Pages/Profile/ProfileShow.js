import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Image, Alert } from "react-bootstrap";
import Content from "../../Components/Content/Content";
import { getUserProfile, fetchUserProfile } from "../../api/api";
import { useNavigate } from "react-router-dom";

const ProfileShow = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [profileImagePath, setProfileImagePath] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const userData = await getUserProfile(token);
        const basicData = await fetchUserProfile(token);

        setUserProfile(userData);

        const imagePath = basicData.profile_image_path.startsWith('http')
          ? basicData.profile_image_path
          : `http://localhost:3030${basicData.profile_image_path}`;
        setProfileImagePath(imagePath);

        setLoading(false);
      } catch (error) {
        console.error("Fehler beim Abrufen des Benutzerprofils:", error);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) {
    return <div>Laden...</div>;
  }

  if (!userProfile) {
    return <Alert variant="danger">Benutzerprofil nicht gefunden.</Alert>;
  }

  return (
    <Content>
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <Card>
              <Card.Body className="bg-dark text-white text-center">
                <Image
                  src={profileImagePath}
                  alt="Profilbild"
                  className="img-fluid mb-4 mt-4 custom-image-size border border-info-subtle"
                />
                <h1>{`${userProfile.first_name} ${userProfile.last_name}`}</h1>
                <p>{`Straße: ${userProfile.street_name} ${userProfile.street_number}`}</p>
                <p>{`Stadt: ${userProfile.city}, PLZ: ${userProfile.postal_code}`}</p>
                {/* Weitere Informationen zum Benutzerprofil anzeigen */}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Content>
  );
};

export default ProfileShow;
