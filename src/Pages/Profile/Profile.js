// Profile.js
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Image, Button } from "react-bootstrap";
import Content from "../../Components/Content/Content";
import { fetchUserProfile } from '../../api/api';
import { useNavigate } from "react-router-dom";


const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Dies ersetzt useHistory

  useEffect(() => {
    const loadData = async () => {
        try {
            const userToken = localStorage.getItem('token');
            const userData = await fetchUserProfile(userToken);
            setUser(userData);
            setLoading(false);
        } catch (error) {
            setError(error.message || 'Fehler beim Laden des Profils');
            setLoading(false);
        }
    };

    loadData();
  }, []);

  if (loading) return <p>Lädt...</p>;
  if (error) return <p>Fehler: {error}</p>;

  return (
    <Content>
      <Container fluid>
        <Row>
          <Col md={4} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Body className="bg-dark text-white">
                <Image src={user?.profile_image_path || "https://via.placeholder.com/150"} roundedCircle className="img-fluid" />
                <Card.Title className="mt-3">{user?.first_name} {user?.last_name}</Card.Title>
                <Card.Text className="mb-0">
                  Email: {user?.email}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={8} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Header className="bg-black text-white">Details</Card.Header>
              <Card.Body className="bg-dark text-white">
                <Card.Title>Über mich</Card.Title>
                <Card.Text>{user?.bio || "Keine Bio verfügbar."}</Card.Text>
                <Card.Title>Skills</Card.Title>
                <Card.Text>
                  {user?.skills && user.skills.length > 0 ? user.skills.map((skill, index) => <div key={index}>- {skill.name} ({skill.proficiency_level})<br /></div>) : "Keine Skills verfügbar."}
                </Card.Text>
                <Button variant="primary" onClick={() => navigate('/profile-update')}>Profil bearbeiten</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Content>
  );
};

export default Profile;
