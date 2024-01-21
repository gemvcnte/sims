import React from "react";
import { Route, Routes } from "react-router-dom";
import Registration from "../pages/Registration";
import { useAuth } from "@/contexts/AuthContext";

const RegistrationRoutes = () => {
  const { user } = useAuth();
  if (user?.role === "admin") {
    return (
      <Routes>
        <Route path="/registration" element={<Registration />} />
      </Routes>
    );
  } else {
    return null;
  }
};

export default RegistrationRoutes;
