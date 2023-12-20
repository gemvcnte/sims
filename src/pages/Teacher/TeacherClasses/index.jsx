import React from "react";
import Topbar from "@/components/layout/Topbar";
import TeacherClassesSection from "./partials/TeacherClassesSection";
import TeacherClassesFilter from "./partials/TeacherClassesFilter";

const TeacherClasses = () => {
  return (
    <main className="w-full">
      <Topbar>CLASSES</Topbar>

      <TeacherClassesFilter />
      <TeacherClassesSection />
    </main>
  );
};

export default TeacherClasses;
