import Topbar from "@/components/layout/Topbar";
import React, { useState } from "react";
import StudentGradesTable from "./partials/StudentGradesTable";
import { ClassDetailsProvider } from "./hooks/ClassDetailsContext";
import FilterGrades from "./partials/FilterGrades";

export default function StudentGrades() {
  const [sectionName, setSectionName] = useState("");
  return (
    <ClassDetailsProvider>
      <main className="w-full">
        <Topbar>GRADES - {sectionName.toUpperCase()}</Topbar>

        <FilterGrades />
        <StudentGradesTable setSectionName={setSectionName} />
      </main>
    </ClassDetailsProvider>
  );
}
