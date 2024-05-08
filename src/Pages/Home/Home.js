import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Content from "../../Components/Content/Content";
import "bootstrap-icons/font/bootstrap-icons.css";

const Home = () => {
  return (
    <Content>
      <Container>
        <Row className="justify-content-center mt-5">
          <Col md={8} className="text-center">
            <h1>Willkommen bei SkillShare Plattform</h1>
            <p>
              Entwickle, teile und zertifiziere deine Fähigkeiten in unserer
              umfassenden Skill-Community.
            </p>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col md={4} className="text-center">
            <Card className="bg-dark text-light border border-success custom-card-size">
              <Card.Body>
                <Card.Title>
                  <i className="bi bi-person-bounding-box"></i> Mein Profil
                </Card.Title>
                <Card.Text className="mt-4">
                  Erstelle und verwalte dein persönliches Profil, um deine
                  Fortschritte und Fähigkeiten zu dokumentieren. Nutze dein
                  Profil, um dein Lernengagement zu zeigen und deine Entwicklung
                  im Laufe der Zeit zu verfolgen.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="text-center">
            <Card className="bg-dark text-light border border-success custom-card-size">
              <Card.Body>
                <Card.Title>
                  <i className="bi bi-trophy-fill"></i> Bestätigungen
                </Card.Title>
                <Card.Text className="mt-4">
                  Erhalte Bestätigungen für erfolgreich abgeschlossene Quizzes,
                  die deine Fähigkeiten und dein Engagement belegen. Diese
                  können als Nachweis deiner kontinuierlichen Lernbemühungen
                  dienen und dein Profil stärken.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="text-center">
            <Card className="bg-dark text-light border border-success custom-card-size">
              <Card.Body>
                <Card.Title>
                  <i className="bi bi-graph-up"></i> Skill-Entwicklung
                </Card.Title>
                <Card.Text className="mt-4">
                  Erweitere dein Wissen und verbessere deine Fähigkeiten durch
                  unsere interaktiven Übungsquizzes. 
                  Nutze diese Tools, um deine berufliche und persönliche
                  Entwicklung gezielt zu fördern.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Content>
  );
};

export default Home;
