// checkAuthStatus.js
export const checkAuthStatus = () => {
    const token = localStorage.getItem('token');
    if (token) {
      console.log('Benutzer ist angemeldet.');
    } else {
      console.log('Benutzer ist nicht angemeldet.');
    }
  };