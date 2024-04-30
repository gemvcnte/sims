import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginRoutes from "./LoginRoutes";
import RegistrationRoutes from "./RegistrationRoutes";
import HomeRoutes from "./HomeRoutes";
import { SidebarProvider } from "@src/contexts/SidebarContext";
import { ThemeProvider } from "@/components/theme-provider";
import AutoLogout from "@/utils/AutoLogout";
import { AuthProvider } from "@/contexts/AuthContext";
import { TeacherAdminModeProvider } from "@/hooks/useTeacherAdminMode";
import { AnnouncementsProvider } from "@/pages/Admin/AdminDashboard/hooks/useAnnouncements";

const AppRouter = () => {
  return (
    <Router>
      <AuthProvider>
        <TeacherAdminModeProvider>
          <AutoLogout />

          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <SidebarProvider>
              <AnnouncementsProvider>
                <RegistrationRoutes />
                <Routes>
                  <Route path="*" element={<HomeRoutes />} />
                </Routes>
              </AnnouncementsProvider>
            </SidebarProvider>
          </ThemeProvider>
        </TeacherAdminModeProvider>
      </AuthProvider>
    </Router>
  );
};

export default AppRouter;
