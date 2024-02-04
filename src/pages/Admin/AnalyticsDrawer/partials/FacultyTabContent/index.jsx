import React from "react";
import TotalFacultyCard from "./TotalFacultyCard";
import TotalTeachersCard from "./TotalTeachersCard";
import TotalAdminsCard from "./TotalAdminsCard";

export default function FacultyTabContent() {
  return (
    <main className="flex w-full flex-col gap-2">
      <TotalFacultyCard />
      <TotalTeachersCard />
      <TotalAdminsCard />
    </main>
  );
}
