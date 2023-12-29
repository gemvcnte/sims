import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "@pages/Admin/AdminDashboard";
import Admin from "@pages/Admin";
import AdminSidebar from "@components/layout/Sidebar/components/AdminSidebar";
import ApplicationMonitoring from "@pages/Admin/ApplicationMonitoring";
import CreateTeacherAccount from "@/pages/Admin/CreateTeacherAccount";
import AdminProfile from "@/pages/Admin/AdminProfile";
import CreateAdminAccount from "@/pages/Admin/CreateAdminAccount";
import Sections from "@/pages/Admin/Sections";
import AllClasses from "@/pages/Admin/AllClasses";
import AdminClasses from "@/pages/Admin/AdminClasses";
import AdminSpecificClass from "@/pages/Admin/AdminSpecificClass";

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

          <Route path="/classes" element={<AdminClasses />} />
          <Route path="/class/:id" element={<AdminSpecificClass />} />

          <Route path="/all-classes" element={<AllClasses />} />
        </Routes>
      </div>
    </>
  );
}
