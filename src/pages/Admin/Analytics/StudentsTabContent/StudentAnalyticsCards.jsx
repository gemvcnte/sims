import React from "react";
import TotalStudentsCard from "./TotalStudentsCard";
import TotalAcademicStudents from "./TotalAcademicStudents";
import TotalTvlStudents from "./TotalTvlStudents";

export default function StudentAnalyticsCards() {
  return (
    <main className="flex w-full flex-col gap-2 sm:flex-row">
      <TotalStudentsCard />
      <TotalAcademicStudents />
      <TotalTvlStudents />
    </main>
  );
}
