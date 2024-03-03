import React from "react";
import { useSidebarContext } from "@contexts/SidebarContext";
import {
  SidebarFooter,
  BackgroundCover,
  CloseButton,
  SidebarHeader,
} from "./components";

export default function SidebarContainer({ children, overflow }) {
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
        className={`border-white-700 bg-white-500 sticky top-0 z-20 h-[100svh] w-[85vw] border-r md:sticky md:max-w-[300px]  ${
          !isSidebarOpen && "hidden"
        } lg:block`}
      >
        <div
          className={`flex h-[100svh] flex-col justify-between px-4 ${
            overflow ? "overflow-y-scroll" : ""
          }`}
        >
          <div>
            <SidebarHeader />
            <main className="flex flex-col gap-2 py-2">{children}</main>
          </div>

          <SidebarFooter />
        </div>
      </aside>
    </>
  );
}
