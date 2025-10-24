import { createContext, useState, useEffect } from 'react';
import apiClient from '../api/axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        const response = await apiClient.get('/auth/me/');
        setUser(response.data);
      } catch (error) {
        console.error('Auth check failed:', error.message);
        logout();
      }
    }
    setLoading(false);
  };

  const login = async (username, password) => {
    const response = await apiClient.post('/auth/login/', { username, password });
    localStorage.setItem('access_token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh);
    await checkAuth();
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
  };

  const register = async (userData) => {
    try {
      await apiClient.post('/auth/register/', userData);
    } catch (error) {
      console.error('Registration failed:', error.message);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
