import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "@/utils/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (token) => {
    localStorage.setItem("authToken", token);

    const decodedToken = jwtDecode(token);
    setUser((prevUser) => {
      localStorage.setItem("lastUsedRole", decodedToken.role);
      console.log(decodedToken);
      return decodedToken;
    });
  };

  const logout = async () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("studentProfile");
    localStorage.removeItem("teacherProfile");
    localStorage.removeItem("adminProfile");
    setUser(null);
    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    const checkTokenExpiration = async () => {
      const storedToken = getCookie("token");

      if (storedToken && user === null) {
        try {
          const decodedToken = jwtDecode(storedToken);
          jwtDecode(storedToken);
          setUser(decodedToken);
        } catch (error) {
          console.error("Error decoding token:", error);
          logout();
        }
      }
    };

    checkTokenExpiration(); // Immediately check on component mount

    const intervalId = setInterval(checkTokenExpiration, 1000); // Check every second

    return () => {
      clearInterval(intervalId); // Cleanup on component unmount
    };
  }, [logout, user]);

  //   useEffect(() => {
  //     // Additional useEffect to check for existing cookie on component mount
  //     const storedToken = getCookie("token");

  //     if (storedToken && user === null) {
  //       jwtDecode(storedToken); // Check if the token is valid; you can use this line to log any issues during decoding
  //       const decodedToken = jwtDecode(storedToken);
  //       setUser(decodedToken);
  //     }
  //   }, [user]); // Make sure to include user as a dependency

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

const getCookie = (name) => {
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split("=");
    if (cookieName === name) {
      return cookieValue;
    }
  }
  return null;
};
