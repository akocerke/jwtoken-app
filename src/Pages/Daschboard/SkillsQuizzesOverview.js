import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, ProgressBar } from 'react-bootstrap';
import { getUserSkills, getUserQuizzes } from '../../api/api';

const SkillsQuizzesOverview = () => {
  const [skills, setSkills] = useState([]);
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userSkills = await getUserSkills();
      const userQuizzes = await getUserQuizzes();
      setSkills(userSkills);
      setQuizzes(userQuizzes);
    };

    fetchData();
  }, []);

  return (
    <Container>
      <h2>Übersicht</h2>
      <Row>
        <Col>
          <h3>Skills</h3>
          {skills.map(skill => (
            <Card key={skill.id} className="mb-3">
              <Card.Body>
                <Card.Title>{skill.name}</Card.Title>
                <ProgressBar now={skill.progress} label={`${skill.progress}%`} />
              </Card.Body>
            </Card>
          ))}
        </Col>
        <Col>
          <h3>Quizzes</h3>
          {quizzes.map(quiz => (
            <Card key={quiz.id} className="mb-3">
              <Card.Body>
                <Card.Title>{quiz.name}</Card.Title>
                <p>Score: {quiz.score}</p>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default SkillsQuizzesOverview;
