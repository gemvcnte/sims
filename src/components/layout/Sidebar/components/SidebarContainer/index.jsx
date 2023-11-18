import React from "react";
import { useSidebarContext } from "@contexts/SidebarContext.jsx";
import {
  SidebarFooter,
  BackgroundCover,
  CloseButton,
  SidebarHeader,
} from "./components";

export default function SidebarContainer({ children }) {
  const { isSidebarOpen } = useSidebarContext();

  return (
    <>
      {isSidebarOpen && (
        <>
          <CloseButton />
          <BackgroundCover />
        </>
      )}

      <aside
        className={`fixed z-20 h-[100vh] w-[85vw] border-r border-white-700 bg-white-500 md:static md:max-w-[300px]  ${
          !isSidebarOpen && "hidden"
        } lg:block`}
      >
        <div className="flex h-[100vh] flex-col justify-between px-4">
          <div>
            <SidebarHeader />
            <main className="flex flex-col gap-4">{children}</main>
          </div>

          <SidebarFooter />
        </div>
      </aside>
    </>
  );
}
