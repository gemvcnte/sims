import React from "react";
import Topbar from "@/components/layout/Topbar";
import { StudentProfileDisplayAndEditSection } from "./components";

const StudentProfile = () => {
  return (
    <main className="w-full">
      <Topbar>STUDENT PROFILE</Topbar>

      <StudentProfileDisplayAndEditSection />
    </main>
  );
};

export default StudentProfile;
