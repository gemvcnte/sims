import Topbar from "@/components/layout/Topbar";
import React from "react";
import AllTeachersTable from "./partials/AllTeachersTable";
import { AllTeachersProvider } from "./hooks/useAllTeachers";

export default function ViewAllTeachers() {
  return (
    <main className="w-full">
      <Topbar>ALL TEACHERS</Topbar>

      <AllTeachersProvider>
        <AllTeachersTable />
      </AllTeachersProvider>
    </main>
  );
}
