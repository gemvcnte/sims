import React from "react";
import StudentAnalyticsCards from "./StudentAnalyticsCards";
import StudentsStackedBarChart from "./StudentsStackedBarChart";
import StudentsGenderPieChart from "./StudentsGenderPieChart";

export default function StudentsTabContent() {
  return (
    <header>
      <StudentAnalyticsCards />
      <main className="flex gap-2">
        <StudentsStackedBarChart />
        <StudentsGenderPieChart />
      </main>
    </header>
  );
}
