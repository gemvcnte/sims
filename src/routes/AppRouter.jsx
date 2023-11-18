import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginRoutes from "./LoginRoutes";
import RegistrationRoutes from "./RegistrationRoutes";
import HomeRoutes from "./HomeRoutes";
import { SidebarProvider } from "@src/contexts/SidebarContext.jsx";

const AppRouter = () => {
  return (
    <Router>
      <SidebarProvider>
        <RegistrationRoutes />
        <Routes>
          <Route path="*" element={<HomeRoutes />} />
        </Routes>
      </SidebarProvider>
    </Router>
  );
};

export default AppRouter;
