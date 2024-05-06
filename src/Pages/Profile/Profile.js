// Profile.js
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import Content from "../../Components/Content/Content";
import { fetchUserProfile } from '../../api/api';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
        try {
            const userToken = localStorage.getItem('token');
            const userData = await fetchUserProfile(userToken);
            console.log(userData);  // Hier die empfangenen Daten ausgeben
            setUser(userData);
            setLoading(false);
        } catch (error) {
            console.error('API Error:', error);
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
                <Card.Title className="mt-3">{user?.name}</Card.Title>
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
                <Card.Text>{user?.bio}</Card.Text>
                <Card.Title>Skills</Card.Title>
                <Card.Text>
                  {user?.skills && user.skills.map(skill => <div key={skill}>- {skill}<br /></div>)}
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
