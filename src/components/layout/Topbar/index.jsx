import React from "react";
import { Icon } from "@iconify/react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { useSidebarContext } from "@/contexts/SidebarContext.jsx";

export default function Topbar({ children }) {
  const { toggleSidebar } = useSidebarContext();

  return (
    <header className="border-white-700 mx-4 flex items-center justify-between border-b py-6 italic">
      <Icon
        icon="heroicons-outline:menu-alt-2"
        width="24"
        height="24"
        className="cursor-pointer lg:hidden"
        onClick={toggleSidebar}
      />
      <span>{children}</span>
      <span>
        <ModeToggle />
      </span>
    </header>
  );
}