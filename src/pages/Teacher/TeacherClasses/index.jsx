import React from "react";
import Topbar from "@/components/layout/Topbar";
import TeacherClassesSection from "./partials/TeacherClassesSection";
import TeacherClassesFilter from "./partials/TeacherClassesFilter";
import TeacherClassesTable from "./partials/TeacherClassesTable";

const TeacherClasses = () => {
  return (
    <main className="w-full">
      <Topbar>CLASSES</Topbar>

      <TeacherClassesFilter />
      <TeacherClassesSection />
      <TeacherClassesTable />
    </main>
  );
};

export default TeacherClasses;
