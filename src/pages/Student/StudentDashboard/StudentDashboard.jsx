import React from "react";
import Topbar from "@/components/layout/Topbar";
import DashboardAnnouncementCard from "./partials/DashboardAnnouncementCard";

export default function StudentDashboard() {
  return (
    <main className="w-full">
      <Topbar>DASHBOARD</Topbar>
      <DashboardAnnouncementCard />
    </main>
  );
}
