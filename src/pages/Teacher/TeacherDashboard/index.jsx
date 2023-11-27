import React from "react";
import { Icon } from "@iconify/react";
import { useSidebarContext } from "@contexts/SidebarContext.jsx";
import Topbar from "@/components/layout/Topbar";

export default function TeacherDashboard() {
  const { toggleSidebar } = useSidebarContext();

  return (
    <main className="w-full">
      <Topbar>DASHBOARD</Topbar>
    </main>
  );
}
