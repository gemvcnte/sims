import React from "react";
import { useSidebarContext } from "@contexts/SidebarContext.jsx";
import Topbar from "@/components/layout/Topbar";

export default function AdminDashboard() {
  return (
    <main className="w-full">
      <Topbar>DASHBOARD</Topbar>
    </main>
  );
}
