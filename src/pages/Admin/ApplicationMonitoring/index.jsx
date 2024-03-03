import React, { useEffect, useState } from "react";
import Topbar from "@/components/layout/Topbar";
import { PendingApplicationsProvider } from "./hooks/usePendingApplications";

export default function ApplicationMonitoring() {
  return (
    <>
      <PendingApplicationsProvider>
        <Topbar>STUDENT APPLICATION MONITORING</Topbar>
        <main className="flex flex-col gap-2 px-4 py-2">
          {/* <StudentApplicationsDataTable /> */}
        </main>
      </PendingApplicationsProvider>
    </>
  );
}
