// StudentRouter.jsx
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import StudentDashboard from "@pages/Student/StudentDashboard";
import Student from "@pages/Student";
import StudentSidebar from "@src/components/layout/Sidebar/components/StudentSidebar";
import StudentProfile from "@/pages/Student/StudentProfile";
import StudentSchedule from "@/pages/Student/StudentSchedule";

export default function StudentRouter() {
  return (
    <>
      <div className="md:flex">
        <StudentSidebar />

        <Routes>
          <Route path="/" element={<Student />} />
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route path="/profile" element={<StudentProfile />} />
          <Route path="/schedule" element={<StudentSchedule />} />
        </Routes>
      </div>
    </>
  );
}
