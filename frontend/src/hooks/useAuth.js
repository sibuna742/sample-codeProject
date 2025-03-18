// src/hooks/useAuth.js
import { useState, useEffect } from 'react';

// Custom hook to manage authentication
export const useAuth = () => {
  const [token, setToken] = useState(null);

  // Check localStorage for the token when the component mounts
  useEffect(() => {
    const savedToken = localStorage.getItem('authToken');
    if (savedToken) {
      setToken(savedToken); // Set token from localStorage
    }
  }, []);

  // Save the token to localStorage and update state
  const saveToken = (newToken) => {
    localStorage.setItem('authToken', newToken);
    setToken(newToken);
  };

  // Logout function to clear the token
  const logout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
  };

  return { token, saveToken, logout };
};
