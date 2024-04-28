import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import showErrorNotification from "@/utils/ShowErrorNotification";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);

  const login = (token) => {
    const ONE_HOUR = 3600000;
    const expirationTime = new Date(Date.now() + ONE_HOUR);
    // Format expiration time to UTC string
    const expirationUTCString = expirationTime.toUTCString();

    document.cookie = `authToken=${token}; expires=${expirationUTCString}; path=/`;

    const decodedToken = jwtDecode(token);

    if (!rememberMe) {
      localStorage.removeItem("rememberMeUsername");
    }

    if (rememberMe) {
      setUser((prevUser) => {
        localStorage.setItem("rememberMeUsername", decodedToken.username);
        return decodedToken;
      });
    }

    window.location.reload();
  };

  const logout = async () => {
    // Remove authToken and user cookies
    document.cookie =
      "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    const checkTokenExpiration = async () => {
      const storedToken = getCookie("authToken");
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
    const storedToken = getCookie("authToken");

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
    <AuthContext.Provider
      value={{ user, login, logout, rememberMe, setRememberMe, getCookie }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

const getCookie = (name) => {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === name) {
      return cookieValue;
    }
  }
  return null;
};
