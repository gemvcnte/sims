import React from "react";
import TotalFacultyCard from "./TotalFacultyCard";
import TotalTeachersCard from "./TotalTeachersCard";
import TotalAdminsCard from "./TotalAdminsCard";
import { useAnalyticsContext } from "../../context/AnalyticsContext";

export default function FacultyTabContent() {
  const { loading } = useAnalyticsContext();

  if (loading) {
    return <p>loading...</p>;
  }

  return (
    <main className="flex w-full flex-col gap-2">
      <TotalFacultyCard />
      <TotalTeachersCard />
      <TotalAdminsCard />
    </main>
  );
}
