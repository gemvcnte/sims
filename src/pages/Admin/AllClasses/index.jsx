import Topbar from "@/components/layout/Topbar";
import React from "react";
import AllClassesDataTable from "./components/AllClassesDataTable";
import { SectionsProvider, useSections } from "./hooks/useSections";

export default function AllClasses() {
  return (
    <main className="w-full">
      <Topbar>ALL SECTIONS</Topbar>

      {/* <SectionAnalytics /> */}
      {/* <SectionFilter /> */}

      <SectionsProvider>
        <AllClassesDataTable />
      </SectionsProvider>
    </main>
  );
}
