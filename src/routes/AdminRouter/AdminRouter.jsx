import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "@pages/Admin/AdminDashboard";
import Admin from "@pages/Admin";
import AdminSidebar from "@components/layout/Sidebar/components/AdminSidebar";
import ApplicationMonitoring from "@pages/Admin/ApplicationMonitoring";
import CreateTeacherAccount from "@/pages/Admin/CreateTeacherAccount";
import AdminProfile from "@/pages/Admin/AdminProfile";
import CreateAdminAccount from "@/pages/Admin/CreateAdminAccount";
import AllClasses from "@/pages/Admin/AllClasses";
import TeacherClasses from "@/pages/Teacher/TeacherClasses";
import TeacherSpecificClass from "@/pages/Teacher/TeacherSpecificClass";
import ViewAllTeachers from "@/pages/Admin/ViewAllTeachers";
import ViewAllAdmins from "@/pages/Admin/ViewAllAdmins";
import Registration from "@/pages/Registration";
import ViewAllStudents from "@/pages/Admin/ViewAllStudents";
import RegistrationRoutes from "../RegistrationRoutes";

export default function AdminRouter() {
  return (
    <>
      <div className="md:flex">
        <AdminSidebar />

        <Routes>
          <Route path="/" element={<Admin />} />
          <Route path="/dashboard" element={<AdminDashboard />} />

          {/* <Route path="/registration" element={<Registration />} /> */}
          <Route
            path="/student-application-monitoring"
            element={<ApplicationMonitoring />}
          />
          <Route path="/students" element={<ViewAllStudents />} />

          <Route path="/profile" element={<AdminProfile />} />

          <Route
            path="/create-teacher-account"
            element={<CreateTeacherAccount />}
          />

          <Route path="/teachers" element={<ViewAllTeachers />} />

          <Route
            path="/create-admin-account"
            element={<CreateAdminAccount />}
          />

          <Route path="/admins" element={<ViewAllAdmins />} />

          <Route path="/classes" element={<TeacherClasses />} />
          <Route path="/class/:id" element={<TeacherSpecificClass />} />

          <Route path="/all-classes" element={<AllClasses />} />
        </Routes>
      </div>
    </>
  );
}
