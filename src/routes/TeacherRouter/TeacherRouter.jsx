import React from "react";
import { Routes, Route } from "react-router-dom";
import TeacherDashboard from "@pages/Teacher/TeacherDashboard";
import Teacher from "@pages/Teacher";
import TeacherSidebar from "@components/layout/Sidebar/components/TeacherSidebar";
import TeacherProfile from "@/pages/Teacher/TeacherProfile";

export default function TeacherRouter() {
  return (
    <>
      <div className="md:flex">
        <TeacherSidebar />

        <Routes>
          <Route path="/" element={<Teacher />} />
          <Route path="/dashboard" element={<TeacherDashboard />} />
          <Route path="/profile" element={<TeacherProfile />} />
          <Route path="/classes" element={<TeacherProfile />} />
        </Routes>
      </div>
    </>
  );
}
