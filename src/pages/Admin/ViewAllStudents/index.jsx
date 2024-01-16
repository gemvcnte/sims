import Topbar from "@/components/layout/Topbar";
import React from "react";
import AllStudentsTable from "./partials/AllStudentsTable";

export default function ViewAllStudents() {
  return (
    <main className="w-full">
      <Topbar>ALL STUDENTS</Topbar>

      <AllStudentsTable />
    </main>
  );
}
