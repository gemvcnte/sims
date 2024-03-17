import Topbar from "@/components/layout/Topbar";
import React from "react";
import AllAdminsTable from "./partials/AllAdminsTable";
import { AllAdminsProvider } from "./hooks/useAllAdmins";

export default function ViewAllAdmins() {
  return (
    <main className="w-full">
      <Topbar>ALL ADMINS</Topbar>

      <AllAdminsProvider>
        <AllAdminsTable />
      </AllAdminsProvider>
    </main>
  );
}
