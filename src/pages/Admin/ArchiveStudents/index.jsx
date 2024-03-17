import Topbar from "@/components/layout/Topbar";
import React from "react";
import { AllStudentsProvider } from "./hooks/useAllStudents";
import AllStudentsTable from "./partials/AllStudentsTable";

export default function ArchiveStudents() {
  return (
    <main className="w-full">
      <Topbar>ARCHIVED STUDENTS</Topbar>

      <AllStudentsProvider>
        <AllStudentsTable />
      </AllStudentsProvider>
    </main>
  );
}
