// TeacherClasses.js
import React from "react";
import Topbar from "@/components/layout/Topbar";
import TeacherClassesFilter from "./partials/TeacherClassesFilter";
import TeacherClassesTable from "./partials/TeacherClassesTable";
import { AssignedClassesProvider } from "./contexts/AssignedClassesContext";
import { FilteredClassesProvider } from "./contexts/FilteredClassesContext";

const TeacherClasses = () => {
  return (
    <AssignedClassesProvider>
      <FilteredClassesProvider>
        <main className="w-full">
          <Topbar>CLASSES</Topbar>
          <TeacherClassesFilter />
          <TeacherClassesTable />
        </main>
      </FilteredClassesProvider>
    </AssignedClassesProvider>
  );
};

export default TeacherClasses;