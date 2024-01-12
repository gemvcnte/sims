import Topbar from "@/components/layout/Topbar";
import React from "react";
import StudentGradesTable from "./partials/StudentGradesTable";

export default function StudentGrades() {
  return (
    <>
      <main className="w-full">
        <Topbar>GRADES</Topbar>
        <StudentGradesTable />
      </main>
    </>
  );
}
