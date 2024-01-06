import React from "react";
import Topbar from "@/components/layout/Topbar";
import AnnouncementCard from "./partials/AnnouncementCard";

export default function StudentDashboard() {
  return (
    <main className="w-full">
      <Topbar>DASHBOARD</Topbar>
      <AnnouncementCard />
    </main>
  );
}
