import Topbar from "@/components/layout/Topbar";
import React from "react";
import AllAdminsTable from "./partials/AllAdminsTable";

export default function ViewAllAdmins() {
  return (
    <main className="w-full">
      <Topbar>ALL TEACHERS</Topbar>

      <AllAdminsTable />
    </main>
  );
}
