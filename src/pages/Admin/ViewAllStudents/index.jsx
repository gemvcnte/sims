import Topbar from "@/components/layout/Topbar";
import React from "react";
import AllStudentsTable from "./partials/AllStudentsTable";
import { AllStudentsProvider } from "./hooks/useAllStudents";

export default function ViewAllStudents() {
  return (
    <main className="w-full">
      <Topbar>ALL STUDENTS</Topbar>

      <AllStudentsProvider>
        <AllStudentsTable />
      </AllStudentsProvider>
    </main>
  );
}
