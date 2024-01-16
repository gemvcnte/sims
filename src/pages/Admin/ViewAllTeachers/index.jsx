import Topbar from "@/components/layout/Topbar";
import React from "react";
import AllTeachersTable from "./partials/AllTeachersTable";

export default function ViewAllTeachers() {
  return (
    <main className="w-full">
      <Topbar>ALL TEACHERS</Topbar>

      <AllTeachersTable />
    </main>
  );
}
