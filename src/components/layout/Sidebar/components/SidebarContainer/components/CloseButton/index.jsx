import React from "react";
import { useSidebarContext } from "@contexts/SidebarContext.jsx";

export default function CloseButton() {
  const { toggleSidebar } = useSidebarContext();

  return (
    <div className="absolute right-0 top-4 z-20 p-2 md:hidden">
      <button
        className="h-[2rem] w-[10vw] border border-white-400 text-white-400"
        onClick={toggleSidebar}
      >
        x
      </button>
    </div>
  );
}