import React, { useState } from "react";
import FormValidator from "../../../../../utils/FormValidator";
import axios from "axios";
import notify from "../../../../../utils/BlankFieldNotification";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import showErrorNotification from "@/utils/ShowErrorNotification";
import { ToastContainer } from "react-toastify";
import { useAuth } from "@/contexts/AuthContext";

function LoginForm({ role, setSelectedRole }) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
  let apiUrl = `${baseUrl}/${role}/login`;

  const [loginData, setLoginData] = useState({
    role: role,
    username: "",
    password: "",
  });

  const handleLogin = async (event) => {
    event.preventDefault();

    const isFormValid = FormValidator(loginData, 4);

    if (isFormValid) {
      try {
        const response = await axios.post(apiUrl, loginData);

        if (response.status === 200) {
          const token = response.data.token;
          login(token);
          // localStorage.setItem("authToken", token);
          // navigate("/");
          // window.location.reload();
        } else {
          console.log("Login failed");
        }
      } catch (error) {
        showErrorNotification(error.response.data.message);
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
      <ToastContainer />
      <button
        onClick={() => setSelectedRole(null)}
        className="flex justify-end gap-2 rounded-lg text-sm text-[#9FA9B9]"
      >
        <Icon icon="majesticons:arrow-up" width="20" height="20" rotate={3} />
        <span>back</span>
      </button>
      <form onSubmit={handleLogin} className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-4">
          <span className="w-[10%]">
            {!loginData.username ? (
              <Icon
                icon="teenyicons:user-outline"
                width="20"
                className="text-primary"
              />
            ) : (
              <Icon
                icon="teenyicons:user-solid"
                width="20"
                className="text-primary"
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
            className="border-white-700 placeholder-white-700 w-full rounded-md border-b p-3 focus:border focus:border-primary focus:outline-none"
          />
        </div>

        <div className="flex items-center justify-around gap-4">
          <span className="w-[10%]">
            {!loginData.password ? (
              <Icon
                icon="teenyicons:lock-outline"
                className="text-primary"
                width="20"
              />
            ) : (
              <Icon
                icon="teenyicons:lock-solid"
                className="text-primary"
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
            className="border-white-700 placeholder-white-700 w-full rounded-md border-b p-3 focus:border focus:border-primary focus:outline-none"
          />
        </div>

        <button
          className="mt-4 flex items-center justify-center gap-2 rounded-2xl bg-primary px-10 py-3 text-white transition-all duration-300 hover:gap-8"
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
