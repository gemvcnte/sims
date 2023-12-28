import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import showErrorNotification from "@/utils/ShowErrorNotification";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = (token) => {
    localStorage.setItem("authToken", token);

    const decodedToken = jwtDecode(token);
    setUser((prevUser) => {
      localStorage.setItem("lastUsedRole", decodedToken.role);
      return decodedToken;
    });

    window.location.reload();
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
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        try {
          const decodedToken = jwtDecode(storedToken);
          const isTokenExpired = decodedToken.exp * 1000 < Date.now();

          if (isTokenExpired) {
            showErrorNotification("Your session has expired. Logging out...");
            setTimeout(() => {
              logout();
            }, 3000);
          }
        } catch (error) {
          console.error("Error decoding token:", error);
          logout();
        }
      }
    };
    checkTokenExpiration();

    const intervalId = setInterval(() => {
      checkTokenExpiration();
    }, 5000); // Check every 5 seconds

    return () => {
      clearInterval(intervalId);
    };
  }, [logout]);

  // useEffect for setting the user when refreshed
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    if (storedToken && user === null) {
      try {
        const decodedToken = jwtDecode(storedToken);

        setUser(decodedToken);
      } catch (error) {
        console.error("Error decoding token:", error);
        logout();
      }
    }
  }, [user, logout]);

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
