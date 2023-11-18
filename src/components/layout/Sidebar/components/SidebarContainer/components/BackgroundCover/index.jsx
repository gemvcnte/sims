import React from "react";
import { useSidebarContext } from "@contexts/SidebarContext.jsx";

export default function BackgroundCover() {
  const { toggleSidebar } = useSidebarContext();

  return (
    <div
      className="absolute z-10 h-[100vh] w-[100vw] bg-black-400 opacity-30 md:hidden"
      onClick={toggleSidebar}
    ></div>
  );
}
