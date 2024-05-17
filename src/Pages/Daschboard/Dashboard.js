// Dashboard.js
import React from 'react';
import { Container, Nav, Tab } from 'react-bootstrap';
import Profile from '../Profile/Profile';
import Settings from './Settings';
import SkillsQuizzesOverview from './SkillsQuizzesOverview';

const Dashboard = () => {
  return (
    <Container>
      <Tab.Container defaultActiveKey="overview">
        <Nav variant="pills" className="flex-row">
          <Nav.Item>
            <Nav.Link eventKey="overview">Übersicht</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="profile">Profil</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="settings">Einstellungen</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="overview">
            <SkillsQuizzesOverview />
          </Tab.Pane>
          <Tab.Pane eventKey="profile">
            <Profile />
          </Tab.Pane>
          <Tab.Pane eventKey="settings">
            <Settings />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </Container>
  );
};

export default Dashboard;
