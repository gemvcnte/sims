import React from "react";
import { Icon } from "@iconify/react";
import { useSidebarContext } from "@contexts/SidebarContext.jsx";

export default function TeacherDashboard() {
  const { toggleSidebar } = useSidebarContext();

  return (
    <main className="w-full">
      <header className="mx-4 flex justify-between border-b border-white-700 py-8 italic">
        <Icon
          icon="heroicons-outline:menu-alt-2"
          width="24"
          height="24"
          className="cursor-pointer lg:hidden"
          onClick={toggleSidebar}
        />
        <span>DASHBOARD</span>
        <span></span>
      </header>
    </main>
  );
}
