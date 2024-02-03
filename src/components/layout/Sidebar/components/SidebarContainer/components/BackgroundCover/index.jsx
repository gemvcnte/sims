import React from "react";
import { useSidebarContext } from "@contexts/SidebarContext";

export default function BackgroundCover() {
  const { toggleSidebar } = useSidebarContext();

  return (
    <div
      className="bg-black-400 absolute z-10 h-[100svh] w-[100vw] opacity-30 md:hidden"
      onClick={toggleSidebar}
    ></div>
  );
}
