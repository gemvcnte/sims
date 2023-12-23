import React from "react";
import { useClassNav } from "../contexts/ClassNavContext";
import StudentsTable from "./StudentsTable";

export default function TableController({ classDetails }) {
  const { selectedTab, setTab } = useClassNav();

  if (selectedTab === "students") {
    return <StudentsTable classDetails={classDetails} />;
  }

  return <div className="p-4">table controller</div>;
}
