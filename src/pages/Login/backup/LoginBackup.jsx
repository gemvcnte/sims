import React, { useState } from "react";
import axios from "axios";
import { getBaseUrl } from "@src/utils/configUtils";
import FormValidator from "../../../utils/FormValidator";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import notify from "../../../utils/BlankFieldNotification";

/**
 * Login component for user authentication.
 *
 * @module Login
 * @src src/components/Login/Login.jsx
 */
export default function Login() {
  const baseUrl = getBaseUrl();
  const apiUrl = `${baseUrl}/login`;

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
    role: "student",
  });

  /**
   * Handles the login process when the "Login" button is clicked.
   *
   * @function
   * @async
   */
  const handleLogin = async () => {
    const isFormValid = FormValidator(loginData, 4);
    if (isFormValid) {
      try {
        const response = await axios.post(apiUrl, loginData);

        if (response.status === 200) {
        } else {
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      notify();
    }
  };

  /**
   * Handles input changes for the username and password fields.
   *
   * @function
   * @param {string} field - The name of the input field being changed (e.g., "username" or "password").
   * @param {string} value - The new value for the input field.
   */
  const handleInputChange = (field, value) => {
    setLoginData({
      ...loginData,
      [field]: value,
    });
  };

  return (
    <div>
      {/* <ToastContainer /> */}
      <input
        type="text"
        placeholder="username"
        value={loginData.username}
        onChange={(e) => handleInputChange("username", e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={loginData.password}
        onChange={(e) => handleInputChange("password", e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
