import Topbar from "@/components/layout/Topbar";
import React from "react";
import AllAdminsTable from "./partials/AllAdminsTable";
import { AllAdminsProvider } from "./hooks/useAllArchivedAdmins";

export default function ArchiveAdmins() {
  return (
    <main className="w-full">
      <Topbar>ARCHIVED ADMINS</Topbar>

      <AllAdminsProvider>
        <AllAdminsTable />
      </AllAdminsProvider>
    </main>
  );
}
