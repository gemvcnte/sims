import React from "react";
import { useClassNav } from "../contexts/ClassNavContext";
import StudentsTable from "./StudentsTable";
import SubjectsTable from "./SubjectsTable";
import ScheduleTable from "./ScheduleTable";
import GradesTable from "./GradesTable";
import OverviewTable from "./OverviewTable";

export default function TableController() {
  const { selectedTab, setTab } = useClassNav();

  if (selectedTab === "overview") {
    return <OverviewTable />;
  }

  if (selectedTab === "students") {
    return <StudentsTable />;
  }

  // if (selectedTab === "grades") {
  //   return <GradesTable />;
  // }

  if (selectedTab === "subjects") {
    return <SubjectsTable />;
  }

  if (selectedTab === "schedule") {
    return <ScheduleTable />;
  }

  return <div className="p-4">table controller</div>;
}
