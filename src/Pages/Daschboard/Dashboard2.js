// src/Dashboard2.js

import React, { useState, useEffect } from "react";
import { Row, Col, ListGroup } from "react-bootstrap";
import ProfileUpdateForm from "../Profile/ProfilUpdate";
import ProfilemanageUpload from "../Profile/ProfilemanageUpload";
import Content from "../../Components/Content/Content";
import ProfileShow from "../Profile/ProfileShow";
import SkillsShow from "../Skills/SkillsShow";
import PasswordUpdate from "./passwordUpdate";
import EmailUpdate from "./emailUpdate";

const Sidebar = ({ setActiveTab }) => {
  return (
    <div className="bg-dark text-white">
      <h5 className="pt-1 px-2">
      <i className="bi bi-speedometer2"></i> Dashboard 
      </h5>
      
      <ListGroup variant="flush">
      <ListGroup.Item
          action
          onClick={() => setActiveTab("profile-show")}
          className="bg-dark text-white"
        >
          <i class="bi bi-person-fill-check"></i> Profil
        </ListGroup.Item>
        <ListGroup.Item
          action
          onClick={() => setActiveTab("skills-show")}
          className="bg-dark text-white"
        >
          <i class="bi bi-bar-chart-fill"></i> Skills
        </ListGroup.Item>
        
      </ListGroup>
      <ListGroup variant="flush">
        <h5 className="pt-3 px-2">
        <i className="bi bi-gear-fill"></i>  Einstellungen 
        </h5>
        <ListGroup.Item
          action
          onClick={() => setActiveTab("profile-update")}
          className="bg-dark text-white"
        >
          <i class="bi bi-person-fill-gear"></i> Profil bearbeiten
        </ListGroup.Item>
        
        <ListGroup.Item
          action
          onClick={() => setActiveTab("profile-upload")}
          className="bg-dark text-white"
        >
          <i class="bi bi-person-fill-gear"></i> Profilbild bearbeiten
        </ListGroup.Item>
        <ListGroup.Item
          action
          onClick={() => setActiveTab("password-update")}
          className="bg-dark text-white"
        >
          <i class="bi bi-person-fill-gear"></i> Passwort ändern
        </ListGroup.Item>
        <ListGroup.Item
          action
          onClick={() => setActiveTab("email-update")}
          className="bg-dark text-white"
        >
          <i class="bi bi-person-fill-gear"></i> E-Mail ändern
        </ListGroup.Item>
        
      </ListGroup>
    </div>
  );
};

const Dashboard2 = () => {
    const [activeTab, setActiveTab] = useState("");

    useEffect(() => {
      // Setze den Standard-Tab, wenn der Benutzer auf das Dashboard kommt
      setActiveTab("profile-show");
    }, []);

  return (
    <Content>
      <Row>
        <Col md={2} className="bg-black vh-100">
          <Sidebar setActiveTab={setActiveTab} />
        </Col>
        <Col md={10}>
          {activeTab === "profile-update" && <ProfileUpdateForm />}
          {activeTab === "profile-upload" && <ProfilemanageUpload />}
          {activeTab === "profile-show" && <ProfileShow/>}
          {activeTab === "skills-show" && <SkillsShow/>}
          {activeTab === "password-update" && <PasswordUpdate/>}
          {activeTab === "email-update" && <EmailUpdate/>}
          {/* Weitere Tabs hier */}
        </Col>
      </Row>
    </Content>
  );
};

export default Dashboard2;
