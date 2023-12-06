import Topbar from "@/components/layout/Topbar";
import React from "react";
import { SectionAnalytics } from "./components";

export default function Sections() {
  return (
    <main className="w-full">
      <Topbar>SECTIONS</Topbar>

      <SectionAnalytics />
    </main>
  );
}
