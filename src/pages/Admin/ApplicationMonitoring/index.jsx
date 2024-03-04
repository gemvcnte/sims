import React, { useEffect, useState } from "react";
import Topbar from "@/components/layout/Topbar";
import { PendingApplicationsProvider } from "./hooks/usePendingApplications";
import PendingApplicationsDataTable from "./components/PendingApplicationsDataTable";

export default function ApplicationMonitoring() {
  return (
    <>
      <PendingApplicationsProvider>
        <main className="w-full">
          <Topbar>STUDENT APPLICATION MONITORING</Topbar>

          <section>
            <PendingApplicationsDataTable />
          </section>
        </main>
      </PendingApplicationsProvider>
    </>
  );
}
