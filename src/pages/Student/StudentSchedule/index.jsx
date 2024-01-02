import Topbar from "@/components/layout/Topbar";
import React from "react";
import { ClassNavProvider } from "./contexts/ClassNavContext";
import TableController from "./partials/TableController";
import Header from "./partials/Header";
import { ClassDetailsProvider } from "./contexts/ClassDetailsContext";
import ClassName from "./partials/ClassName";
import ScheduleTable from "./partials/ScheduleTable";

export default function StudentSchedule() {
  return (
    <ClassDetailsProvider>
      <main className="w-full">
        <Topbar>
          <ClassName />
        </Topbar>

        <ScheduleTable />
      </main>
    </ClassDetailsProvider>
  );
}
