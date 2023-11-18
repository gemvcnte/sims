import React, { useState } from "react";
import FormValidator from "../../../../../utils/FormValidator";
import axios from "axios";
import notify from "../../../../../utils/BlankFieldNotification";
import config from "../../../../../config";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

function LoginForm({ role, setSelectedRole }) {
  const navigate = useNavigate();
  const baseUrl = config.development.baseUrl;
  const apiUrl = `${baseUrl}/login`;

  const [loginData, setLoginData] = useState({
    role: role,
    username: "",
    password: "",
  });

  const handleLogin = async (event) => {
    // event.preventDefault();
    // console.log(loginData);

    const isFormValid = FormValidator(loginData, 4);

    if (isFormValid) {
      localStorage.setItem("userRole", loginData.role);
      // setTimeout(() => {
      navigate("/");
      // }, 1000);
    }

    // if (isFormValid) {
    // try {
    //     const response = await axios.post(apiUrl, loginData);

    // if (response.status === 200) {
    //       console.log("Login successful");
    //     } else {
    //       console.log("Login failed");
    //     }
    // } catch (error) {
    //     console.error("Error:", error);
    //   }
    // } else {
    //   notify();
    // }
  };

  const handleInputChange = (field, value) => {
    setLoginData({
      ...loginData,
      [field]: value,
    });
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        {/* <button
          onClick={() => setSelectedRole(null)}
          className="mb-4 flex gap-2 rounded-lg p-2 "
        >
          <Icon icon="majesticons:arrow-up" width="24" height="24" rotate={3} />
        </button> */}

        <div className="mb-4 flex flex-col">
          {/* <label>Username</label> */}
          <input
            className={`rounded-lg border border-white-700 p-3 text-sm focus:border-blue-400 focus:outline-none focus:ring-2 
    focus:ring-blue-400`}
            type="text"
            placeholder={`Enter ${role} Username`}
            value={loginData.username}
            onChange={(e) => handleInputChange("username", e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          {/* <label>Password</label> */}
          <input
            className={`rounded-lg border border-white-700 p-3 text-sm focus:border-blue-400 focus:outline-none focus:ring-2 
    focus:ring-blue-400`}
            type="password"
            placeholder="Enter Password"
            value={loginData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="mt-6 w-full rounded-lg bg-blue-400 px-4 py-3 text-white-400 "
        >
          Login
        </button>
      </form>
    </>
  );
}

export default LoginForm;
