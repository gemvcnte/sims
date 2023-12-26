import React from "react";
import { useClassNav } from "../contexts/ClassNavContext";
import StudentsTable from "./StudentsTable";
import SubjectsTable from "./SubjectsTable";

export default function TableController() {
  const { selectedTab, setTab } = useClassNav();

  if (selectedTab === "students") {
    return <StudentsTable />;
  }

  if (selectedTab === "subjects") {
    return <SubjectsTable />;
  }

  return <div className="p-4">table controller</div>;
}
