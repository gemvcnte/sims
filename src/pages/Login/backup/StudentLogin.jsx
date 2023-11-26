import React, { useState } from "react";
import axios from "axios";
import FormValidator from "../../../utils/FormValidator";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import notify from "../../../utils/BlankFieldNotification";
import { getBaseUrl } from "@src/utils/configUtils";

function StudentLogin() {
  const baseUrl = getBaseUrl();
  const apiUrl = `${baseUrl}/login`;

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
    role: "student",
  });

  const handleStudentLogin = async () => {
    const isFormValid = FormValidator(loginData, 4);
    if (isFormValid) {
      try {
        console.log(loginData);
        const response = await axios.post(apiUrl, loginData);

        if (response.status === 200) {
          console.log("Student login successful");
        } else {
          console.log("Student login failed");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      notify();
    }
  };

  const handleStudentInputChange = (field, value) => {
    setLoginData({
      ...loginData,
      [field]: value,
    });
  };

  return (
    <div>
      <ToastContainer />
      <input
        type="text"
        placeholder="Student Username"
        value={loginData.username}
        onChange={(e) => handleStudentInputChange("username", e.target.value)}
      />
      <input
        type="password"
        placeholder="Student Password"
        value={loginData.password}
        onChange={(e) => handleStudentInputChange("password", e.target.value)}
      />
      <button onClick={handleStudentLogin}>Login</button>
    </div>
  );
}

export default StudentLogin;
