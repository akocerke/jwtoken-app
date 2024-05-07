import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Image, Button } from "react-bootstrap";
import Content from "../../Components/Content/Content";
import { fetchUserProfile, getUserProfile } from "../../api/api";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [basicInfo, setBasicInfo] = useState(null);
  const [profileInfo, setProfileInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem("token");
    const loadBasicInfo = fetchUserProfile(userToken);
    const loadProfileInfo = getUserProfile(userToken);

    Promise.all([loadBasicInfo, loadProfileInfo])
      .then(([basicData, profileData]) => {
        setBasicInfo(basicData);
        setProfileInfo(profileData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Fehler beim Laden des Profils");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Lädt...</p>;
  if (error) return <p>Fehler: {error}</p>;

  return (
    <Content>
      <Container fluid className="col-8">
        <Row>
          <Col md={6} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Header className="bg-black text-white">
                {profileInfo?.first_name} {profileInfo?.last_name}
              </Card.Header>
              <Card.Body className="bg-dark text-white text-center">
                
                  <Image
                    src={
                      basicInfo?.profile_image_path ||
                      "https://via.placeholder.com/150"
                    }
                    roundedCircle
                    className="img-fluid mb-4"
                  />
                
                <hr />
                <Card.Text className="mb-1">
                  Email: {basicInfo?.email}
                </Card.Text>
                <Card.Text className="mb-1">
                  Ort: {profileInfo?.postal_code} {profileInfo?.city}
                </Card.Text>
                
                <div className="text-center">
                <Button
                  className="mt-4 mb-3 text-danger-emphasis"
                  variant="warning"
                  onClick={() => navigate("/profile-update")}
                >
                  Profil bearbeiten
                </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Header className="bg-black text-white">Skills</Card.Header>
              <Card.Body className="bg-dark text-white">
                {profileInfo?.skills && profileInfo.skills.length > 0 ? (
                  profileInfo.skills.map((skill, index) => (
                    <div key={index}>
                      {skill.name} ({skill.proficiency_level})<br />
                    </div>
                  ))
                ) : (
                  <p>Keine Skills verfügbar.</p>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Content>
  );
};

export default Profile;
