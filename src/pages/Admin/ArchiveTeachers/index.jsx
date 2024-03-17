import Topbar from "@/components/layout/Topbar";
import React from "react";
import AllTeachersTable from "./partials/AllTeachersTable";
import { AllTeachersProvider } from "./hooks/useAllTeachers";

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
