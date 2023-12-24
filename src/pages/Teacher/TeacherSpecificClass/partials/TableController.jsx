import React from "react";
import { useClassNav } from "../contexts/ClassNavContext";
import StudentsTable from "./StudentsTable";

export default function TableController() {
  const { selectedTab, setTab } = useClassNav();

  if (selectedTab === "students") {
    return <StudentsTable />;
  }

  return <div className="p-4">table controller</div>;
}
