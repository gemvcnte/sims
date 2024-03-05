import React from "react";
import { useClassNav } from "../contexts/ClassNavContext";
import SubjectsTable from "./SubjectsTable";
import ScheduleTable from "./ScheduleTable";
import GradesTable from "./GradesTable";
import StudentsTable from "./StudentsTable";

export default function TableController() {
  const { selectedTab, setTab } = useClassNav();

  if (selectedTab === "students") {
    return <StudentsTable />;
  }

  if (selectedTab === "grades") {
    return <GradesTable />;
  }

  if (selectedTab === "subjects") {
    return <SubjectsTable />;
  }

  if (selectedTab === "schedule") {
    return <ScheduleTable />;
  }

  return <div className="p-4">table controller</div>;
}
