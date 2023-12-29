import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "@pages/Admin/AdminDashboard";
import Admin from "@pages/Admin";
import AdminSidebar from "@components/layout/Sidebar/components/AdminSidebar";
import ApplicationMonitoring from "@pages/Admin/ApplicationMonitoring";
import CreateTeacherAccount from "@/pages/Admin/CreateTeacherAccount";
import AdminProfile from "@/pages/Admin/AdminProfile";
import CreateAdminAccount from "@/pages/Admin/CreateAdminAccount";
import AllSections from "@/pages/Admin/AllSections";
import Sections from "@/pages/Admin/Sections";

export default function AdminRouter() {
  return (
    <>
      <div className="md:flex">
        <AdminSidebar />

        <Routes>
          <Route path="/" element={<Admin />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route
            path="/student-application-monitoring"
            element={<ApplicationMonitoring />}
          />

          <Route path="/profile" element={<AdminProfile />} />

          <Route
            path="/create-teacher-account"
            element={<CreateTeacherAccount />}
          />

          <Route
            path="/create-admin-account"
            element={<CreateAdminAccount />}
          />

          <Route path="/sections" element={<Sections />} />

          <Route path="/all-sections" element={<AllSections />} />
        </Routes>
      </div>
    </>
  );
}
