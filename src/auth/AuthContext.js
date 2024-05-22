import React, { createContext, useContext, useState } from 'react';

// 1. Definiere den Authentifizierungskontext
const AuthContext = createContext();

// 2. Definiere einen Authentifizierungsanbieter, der den Kontext bereitstellt
export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') ? true : false);

  const login = () => {
    // Hier könntest du die Authentifizierung durchführen
    setIsLoggedIn(true);
  };

  const logout = () => {
    // Hier könntest du die Logout-Logik einfügen
    setIsLoggedIn(false);
    reloadPage(); // Seite neu laden
  };

  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 3. Verwende ein benutzerdefiniertes Hook, um den Kontext zu nutzen
export function useAuth() {
  return useContext(AuthContext);
}
