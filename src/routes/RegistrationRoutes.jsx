import React from "react";
import { Route, Routes } from "react-router-dom";
import Registration from "../pages/Registration";

const RegistrationRoutes = () => {
  return (
    <Routes>
      <Route path="/registration" element={<Registration />} />
    </Routes>
  );
};

export default RegistrationRoutes;
