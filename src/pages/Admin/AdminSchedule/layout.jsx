import Topbar from "@/components/layout/Topbar";
import React from "react";
import AdminSchedule from ".";
import { AdminScheduleProvider } from "./useAdminSchedule";

export default function AdminScheduleLayout() {
  return (
    <AdminScheduleProvider>
      <main className="w-full">
        <Topbar>SCHEDULE</Topbar>

        <AdminSchedule />
      </main>
    </AdminScheduleProvider>
  );
}
