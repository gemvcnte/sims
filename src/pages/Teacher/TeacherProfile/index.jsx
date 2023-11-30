import React from "react";
import Topbar from "@/components/layout/Topbar";
import { TeacherProfileDisplayAndEditSection } from "./components";

const TeacherProfile = () => {
  return (
    <main className="w-full">
      <Topbar>TEACHER PROFILE</Topbar>

      <TeacherProfileDisplayAndEditSection />
    </main>
  );
};

export default TeacherProfile;
