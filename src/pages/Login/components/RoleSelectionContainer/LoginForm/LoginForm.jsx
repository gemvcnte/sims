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
  let apiUrl = `${baseUrl}/${role}/login`;

  const [loginData, setLoginData] = useState({
    role: role,
    username: "",
    password: "",
  });

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log(loginData);

    const isFormValid = FormValidator(loginData, 4);

    if (isFormValid) {
      try {
        const response = await axios.post(apiUrl, loginData);
        console.log(apiUrl);

        if (response.status === 200) {
          console.log(response);

          const token = response.data.token;
          localStorage.setItem("authToken", token);
          navigate("/");
          window.location.reload();
        } else {
          console.log("Login failed");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      notify();
    }
  };

  const handleInputChange = (field, value) => {
    setLoginData({
      ...loginData,
      [field]: value,
    });
  };

  return (
    <>
      <form onSubmit={handleLogin} className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-4">
          <span className="w-[10%]">
            {!loginData.username ? (
              <Icon
                icon="teenyicons:user-outline"
                width="20"
                className="text-blue-400"
              />
            ) : (
              <Icon
                icon="teenyicons:user-solid"
                width="20"
                className="text-blue-400"
              />
            )}
          </span>
          <input
            type="text"
            name="username"
            value={loginData.username}
            onChange={(e) => handleInputChange("username", e.target.value)}
            required
            placeholder={`${role} Username`}
            className="w-full rounded-md border-b border-white-700 p-3 placeholder-white-700 focus:border focus:border-blue-400 focus:outline-none"
          />
        </div>

        <div className="flex items-center justify-around gap-4">
          <span className="w-[10%]">
            {!loginData.password ? (
              <Icon
                icon="teenyicons:lock-outline"
                className="text-blue-400"
                width="20"
              />
            ) : (
              <Icon
                icon="teenyicons:lock-solid"
                className="text-blue-400"
                width="20"
              />
            )}
          </span>
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            required
            placeholder={`${role} Password`}
            className="w-full rounded-md border-b border-white-700 p-3 placeholder-white-700 focus:border focus:border-blue-400 focus:outline-none"
          />
        </div>

        <button
          className="mt-4 flex items-center justify-center gap-2 rounded-2xl bg-blue-400 px-10 py-3 text-white-400 transition-all duration-300 hover:gap-8"
          type="submit"
        >
          Login
          <Icon icon="ph:arrow-up-thin" width="20" color="white" rotate={1} />
        </button>
      </form>
    </>
  );
}

export default LoginForm;
