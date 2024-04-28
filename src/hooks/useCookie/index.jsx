import { useState, useEffect } from "react";

const useCookie = () => {
  const getCookie = (name) => {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split("=");
      if (cookieName === name) {
        if (cookieValue) {
          try {
            return atob(cookieValue);
          } catch (error) {
            console.error("Error decoding cookie value:", error);
            return null;
          }
        }
      }
    }
    return null;
  };

  return { getCookie };
};

export default useCookie;
