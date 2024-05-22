import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  ProgressBar,
} from "react-bootstrap";
import { getUserSkills, getAllSkills } from "../../api/api";
import Content from "../../Components/Content/Content";

const Dashboard = () => {
  const [userSkills, setUserSkills] = useState([]);
  const [allSkills, setAllSkills] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Benutzerfähigkeiten abrufen
        const userSkillsData = await getUserSkills();
        setUserSkills(userSkillsData);

        // Alle Skills abrufen
        const allSkillsData = await getAllSkills();
        setAllSkills(allSkillsData);
      } catch (error) {
        console.error("Fehler beim Abrufen der Daten:", error);
        // Behandle den Fehler entsprechend
      }
    };

    fetchData();
  }, []);

  const getSkillNameById = (skillId) => {
    const skill = allSkills.find((skill) => skill.skill_id === skillId);
    return skill ? skill.skill_name : "";
  };

  const getProgressVariant = (proficiencyLevel) => {
    switch (proficiencyLevel.toLowerCase()) {
      case "beginner":
        return "info";
      case "intermediate":
        return "warning";
      case "expert":
        return "success";
      default:
        return "primary";
    }
  };

  const getVerificationIcon = (verified) => {
    return verified ? (
      <i className="bi bi-check-circle-fill text-success"></i>
    ) : (
      <i className="bi bi-x-circle-fill text-danger"></i>
    );
  };

  return (
    <Content>
      <Container>
        <Row className="justify-content-center">
          <Col md={6} className="bg-dark text-center mb-5">
           hallo
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={6}>
            <Card className="shadow-sm">
              <Card.Header className="bg-black text-white text-center">
                Deine Skills
              </Card.Header>
              <Card.Body className="bg-dark text-white">
                {userSkills.length === 0 ? (
                  <p>Keine Skills verfügbar</p>
                ) : (
                  userSkills.map((userSkill, index) => (
                    <div key={index}>
                      <p className="text-center mb-2">
                        {getSkillNameById(userSkill.skill_id)}
                      </p>
                      <ProgressBar
                        className="mb-4"
                        animated
                        now={100}
                        label={userSkill.proficiency_level}
                        variant={getProgressVariant(
                          userSkill.proficiency_level
                        )}
                      />
                      <div className="text-center mt-2">
                        <p>verifiziert {getVerificationIcon(userSkill.verified)}</p>
                      </div>
                      <hr className="border"></hr>
                    </div>
                  ))
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Content>
  );
};

export default Dashboard;
