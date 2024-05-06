// api/api.js
import axios from 'axios';

const API_URL = 'http://localhost:3030/jwtoken/auth'; // Passen Sie die URL Ihrer API an
const API_URL_u = 'http://localhost:3030/jwtoken/users';
// Login
export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, {
            email: email, // Stellen Sie sicher, dass die Schlüssel den Anforderungen Ihrer API entsprechen
            password: password
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
            password: password
        });
        return response.data;
    } catch (error) {
        throw error.response.data; // Wirft eine Fehlermeldung zurück
    }
};

// Logout-Funktion, die die API-Antwort im Browser-Konsolenlog ausgibt
export const logoutUser = async (token) => {
    try {
        const response = await axios.post(`${API_URL}/logout`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log("Logout Response:", response.data); // Ausgabe der Serverantwort im Konsolenlog
        return response.data;
    } catch (error) {
        console.error("Logout Error:", error.response ? error.response.data : "Error during logout");
        throw error.response ? error.response.data : "Error during logout";
    }
};

// Profilabfrage
export const fetchUserProfile = async (token) => {
    try {
        const response = await axios.get(`${API_URL_u}/currentuser`, {
            headers: {
                'Authorization': `Bearer ${token}`  // Authentifizierung mit Bearer Token
            }
        });
        return response.data; // Gibt Benutzerprofilinformationen zurück
    } catch (error) {
        throw error.response.data; // Wirft eine Fehlermeldung zurück
    }
};

