import React from "react";
import TotalFacultyCard from "./TotalFacultyCard";
import TotalTeachersCard from "./TotalTeachersCard";
import TotalAdminsCard from "./TotalAdminsCard";
import useAnalytics from "../useAnalytics";
import { Skeleton } from "@/components/ui/skeleton";
import DesignationStackedBarChart from "./DesignationStackedBarChart";

export default function FacultyTabContent() {
  const { loading } = useAnalytics();

  if (loading) {
    return (
      <main className="flex w-full flex-col gap-4 sm:flex-row">
        <Skeleton className="h-[110px] w-full sm:w-[33%]"></Skeleton>
        <Skeleton className="h-[110px] w-full sm:w-[33%]"></Skeleton>
        <Skeleton className="h-[110px] w-full sm:w-[33%]"></Skeleton>
      </main>
    );
  }

  return (
    <>
      <section className="flex w-full flex-col gap-4 sm:flex-row">
        <TotalFacultyCard />
        <TotalTeachersCard />
        <TotalAdminsCard />
      </section>

      <main className="mt-4">
        <DesignationStackedBarChart />
      </main>
    </>
  );
}
