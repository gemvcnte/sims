import Topbar from "@/components/layout/Topbar";
import React from "react";
import StudentGradesTable from "./partials/StudentGradesTable";
import { ClassDetailsProvider } from "./hooks/ClassDetailsContext";

export default function StudentGrades() {
  return (
    <ClassDetailsProvider>
      <main className="w-full">
        <Topbar>GRADES</Topbar>
        <StudentGradesTable />
      </main>
    </ClassDetailsProvider>
  );
}
