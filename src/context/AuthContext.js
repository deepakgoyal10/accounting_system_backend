import React, { createContext, useState, useContext, useEffect } from "react";
import { axiosInstance } from "../utils/axiosConfig";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setAccessToken(token);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axiosInstance.post("auth/login", {
        email,
        password,
      });
      const token = response.data.data;
      localStorage.setItem("access_token", token);
      setAccessToken(token);
      return token;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await axiosInstance.post("auth/register", {
        username,
        email,
        password,
      });
      const token = response.data.data;
      localStorage.setItem("access_token", token);
      setAccessToken(token);
      return token;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setAccessToken(null);
  };

  const isAuthenticated = () => !!accessToken;

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        login,
        register,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
