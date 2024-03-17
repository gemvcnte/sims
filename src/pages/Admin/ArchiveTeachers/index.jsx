import Topbar from "@/components/layout/Topbar";
import React from "react";
import AllTeachersTable from "./partials/AllTeachersTable";
import { AllTeachersProvider } from "./hooks/useAllArchivedTeachers";

export default function ArchiveTeachers() {
  return (
    <main className="w-full">
      <Topbar>ARCHIVED TEACHERS</Topbar>

      <AllTeachersProvider>
        <AllTeachersTable />
      </AllTeachersProvider>
    </main>
  );
}
