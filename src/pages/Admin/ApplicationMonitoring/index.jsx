import React, { useEffect, useState } from "react";
import Topbar from "@/components/layout/Topbar";
import { PendingApplicationsProvider } from "./hooks/usePendingApplications";
import StudentApplicationsDataTable from "./components/StudentApplicationsDataTable";

export default function ApplicationMonitoring() {
  return (
    <>
      <PendingApplicationsProvider>
        <main className="w-full">
          <Topbar>STUDENT APPLICATION MONITORING</Topbar>

          <section>
            <StudentApplicationsDataTable />
          </section>
        </main>
      </PendingApplicationsProvider>
    </>
  );
}
