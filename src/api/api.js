// api/api.js
import axios from "axios";

const API_URL = "http://localhost:3030/jwtoken/auth";
const API_URL_u = "http://localhost:3030/jwtoken/users";
const API_URL_s = "http://localhost:3030/jwtoken/skills";
// Login
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email: email, // Stellen Sie sicher, dass die Schlüssel den Anforderungen Ihrer API entsprechen
      password: password,
    });
    return response.data; // Dies könnte das Token und andere Benutzerdaten enthalten
  } catch (error) {
    throw error.response.data; // Fehlerbehandlung: Gibt Fehlermeldung zurück
  }
};

// Signup
export const registerUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      email: username,
      password: password,
    });
    return response.data;
  } catch (error) {
    throw error.response.data; // Wirft eine Fehlermeldung zurück
  }
};

// Logout-Funktion, die die API-Antwort im Browser-Konsolenlog ausgibt
export const logoutUser = async (token) => {
  try {
    const response = await axios.post(
      `${API_URL}/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Logout Response:", response.data); // Ausgabe der Serverantwort im Konsolenlog
    return response.data;
  } catch (error) {
    console.error(
      "Logout Error:",
      error.response ? error.response.data : "Error during logout"
    );
    throw error.response ? error.response.data : "Error during logout";
  }
};

// GET currentUser
export const fetchUserProfile = async (token) => {
  try {
    const response = await axios.get(`${API_URL_u}/currentuser`, {
      headers: {
        Authorization: `Bearer ${token}`, // Authentifizierung mit Bearer Token
      },
    });
    return response.data; // Gibt Benutzerprofilinformationen zurück
  } catch (error) {
    throw error.response.data; // Wirft eine Fehlermeldung zurück
  }
};

// GET UserProfile
export const getUserProfile = async (token) => {
  try {
    const response = await axios.get(`${API_URL_u}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`, // Authentifizierung mit Bearer Token
      },
    });
    // Überprüfe, ob die Daten komplett leer sind und gebe ggf. null zurück
    const isEmpty = Object.values(response.data).every(
      (x) => x === null || x === ""
    );
    return isEmpty ? null : response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null;
    } else {
      throw error.response.data;
    }
  }
};

// PUT Aktualisiert Benutzerdaten
export const updateUserProfile = async (token, userData) => {
  try {
    const response = await axios.put(`${API_URL_u}/updateprofile`, userData, {
      headers: {
        Authorization: `Bearer ${token}`, // Authentifizierung mit Bearer Token
      },
    });
    return response.data; // Gibt die aktualisierten Benutzerdaten zurück
  } catch (error) {
    throw error.response.data; // Wirft eine Fehlermeldung zurück
  }
};

// PUT - Aktualisiert das Profilbild des Benutzers
export const updateUserProfileImage = async (token, file) => {
  const formData = new FormData();
  formData.append("profile_image", file); // Der Name 'profile_image' muss exakt dem im Backend erwarteten Feldnamen entsprechen

  try {
    const response = await axios.put(`${API_URL_u}/profile/upload`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        // 'Content-Type': NICHT setzen, da Axios das selbst handhabt
      },
    });
    return response.data;
  } catch (error) {
    console.error("Fehler beim Hochladen des Profilbilds:", error);
    throw error;
  }
};

// Alle Skills abrufen
export const getAllSkills = async () => {
  try {
    const response = await axios.get(`${API_URL_s}/all`);
    return response.data;
  } catch (error) {
    console.error("Fehler beim Abrufen aller Skills:", error);
    throw error;
  }
};

export const getUserSkills = async (token) => {
    try {
      const response = await axios.get(`${API_URL_s}/byUserId`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Fehler beim Abrufen der Benutzerfähigkeiten:", error);
      throw error;
    }
  };
  


// PUT Anfrage Update Passwort
export const updateUserPassword = async (oldPassword, newPassword) => {
  try {
    const response = await axios.put(`${API_URL_u}/updatePassword`, {
      oldPassword,
      newPassword,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      `Fehler beim Ändern des Passworts: ${
        error.response ? error.response.data.error : error.message
      }`
    );
  }
};

// PUT Anfrage zum Update der Emailadresse
export const updateUserEmail = async (emailAlt, newEmail) => {
  try {
    const response = await axios.put(`${API_URL_u}/updateEmail`, {
      emailAlt,
      newEmail,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      `Fehler beim Aktualisieren der E-Mail-Adresse: ${
        error.response ? error.response.data.error : error.message
      }`
    );
  }
};

// PUT zum Löschen eines Benutzerkontos
export const deleteUserAccount = () => {};
