import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginRoutes from "./LoginRoutes";
import RegistrationRoutes from "./RegistrationRoutes";
import HomeRoutes from "./HomeRoutes";
import { SidebarProvider } from "@src/contexts/SidebarContext.jsx";
import { ThemeProvider } from "@/components/theme-provider";
import AutoLogout from "@/utils/AutoLogout";
import { AuthProvider } from "@/contexts/AuthContext";

const AppRouter = () => {
  return (
    <Router>
      <AuthProvider>
        <AutoLogout />
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <SidebarProvider>
            <RegistrationRoutes />
            <Routes>
              <Route path="*" element={<HomeRoutes />} />
            </Routes>
          </SidebarProvider>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
};

export default AppRouter;
