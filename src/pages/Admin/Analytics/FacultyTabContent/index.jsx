import React from "react";
import TotalFacultyCard from "./TotalFacultyCard";
import TotalTeachersCard from "./TotalTeachersCard";
import TotalAdminsCard from "./TotalAdminsCard";
import useAnalytics from "../useAnalytics";

export default function FacultyTabContent() {
  const { loading } = useAnalytics();

  if (loading) {
    return <p>loading...</p>;
  }

  return (
    <main className="flex w-full flex-col gap-2 sm:flex-row">
      <TotalFacultyCard />
      <TotalTeachersCard />
      <TotalAdminsCard />
    </main>
  );
}
