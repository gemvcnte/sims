import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import useCookie from "@/hooks/useCookie";

const AutoLogout = () => {
  const navigate = useNavigate();
  const millisecondsPerMinute = 60 * 1000;
  const { getCookie } = useCookie();

  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = getCookie("authToken");

      if (token) {
        const tokenData = jwtDecode(token);
        const currentTimestamp = Math.floor(Date.now() / millisecondsPerMinute); // check every minute

        if (tokenData.exp < currentTimestamp) {
          localStorage.removeItem("authToken");
          navigate("/");
          window.location.reload();
        }
      }
    };

    const intervalId = setInterval(checkTokenExpiration, 1000);

    return () => clearInterval(intervalId);
  }, [navigate]);

  return null;
};

export default AutoLogout;
