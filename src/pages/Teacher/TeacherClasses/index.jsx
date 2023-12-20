import React from "react";
import Topbar from "@/components/layout/Topbar";
import TeacherClassesSection from "./partials/TeacherClassesSection";

const TeacherClasses = () => {
  return (
    <main className="w-full">
      <Topbar>CLASSES</Topbar>

      <TeacherClassesSection />
    </main>
  );
};

export default TeacherClasses;
