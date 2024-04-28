import Topbar from "@/components/layout/Topbar";
import React from "react";
import { ClassDetailsProvider } from "./contexts/ClassDetailsContext";
import ClassName from "./partials/ClassName";
import ScheduleTable from "./partials/ScheduleTable";
import FilterSchedule from "./partials/FilterSchedule";

export default function StudentSchedule() {
  return (
    <ClassDetailsProvider>
      <main className="w-full">
        <Topbar>
          <ClassName />
        </Topbar>

        {/* <FilterSchedule /> */}
        <ScheduleTable />
      </main>
    </ClassDetailsProvider>
  );
}
