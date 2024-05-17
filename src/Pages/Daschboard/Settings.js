// Settings.js
import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { updateUserPassword, updateUserEmailPreferences, deleteUserAccount } from '../../api/api';

const Settings = () => {
  const [password, setPassword] = useState('');
  const [emailPreferences, setEmailPreferences] = useState('');

  const handlePasswordChange = async () => {
    // API-Aufruf zur Änderung des Passworts
    await updateUserPassword(password);
  };

  const handleEmailPreferencesChange = async () => {
    // API-Aufruf zur Änderung der E-Mail-Präferenzen
    await updateUserEmailPreferences(emailPreferences);
  };

  const handleDeleteAccount = async () => {
    // API-Aufruf zur Löschung des Benutzerkontos
    await deleteUserAccount();
  };

  return (
    <Container>
      <h2>Einstellungen</h2>
      <Form>
        <Form.Group controlId="formPassword">
          <Form.Label>Passwort ändern</Form.Label>
          <Form.Control
            type="password"
            placeholder="Neues Passwort"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={handlePasswordChange}>Passwort ändern</Button>

        <Form.Group controlId="formEmailPreferences">
          <Form.Label>E-Mail-Präferenzen</Form.Label>
          <Form.Control
            type="text"
            placeholder="E-Mail-Präferenzen"
            value={emailPreferences}
            onChange={(e) => setEmailPreferences(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleEmailPreferencesChange}>E-Mail-Präferenzen speichern</Button>

        <Button variant="danger" onClick={handleDeleteAccount}>Benutzerkonto löschen</Button>
      </Form>
    </Container>
  );
};

export default Settings;
