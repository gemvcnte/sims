import React from "react";
import StudentAnalyticsCards from "./StudentAnalyticsCards";
import StudentsStackedBarChart from "./StudentsStackedBarChart";
import StudentsGenderPieChart from "./StudentsGenderPieChart";

export default function StudentsTabContent() {
  return (
    <>
      <header>
        <StudentAnalyticsCards />
      </header>
      <main className="mt-4 flex flex-col gap-4 sm:flex-row">
        <StudentsStackedBarChart />
        <StudentsGenderPieChart />
      </main>
    </>
  );
}
