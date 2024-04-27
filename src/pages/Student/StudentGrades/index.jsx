import Topbar from "@/components/layout/Topbar";
import React, { useState } from "react";
import StudentGradesTable from "./partials/StudentGradesTable";
import { ClassDetailsProvider } from "./hooks/ClassDetailsContext";
import FilterGrades from "./partials/FilterGrades";
import { Skeleton } from "@/components/ui/skeleton";

export default function StudentGrades() {
  const [sectionName, setSectionName] = useState("");

  return (
    <ClassDetailsProvider>
      <main className="w-full pr-4">
        <Topbar>
          {sectionName ? (
            `GRADES - ${sectionName.toUpperCase()}`
          ) : (
            <Skeleton className="h-8 w-[30ch]"></Skeleton>
          )}
        </Topbar>

        <FilterGrades />
        <StudentGradesTable setSectionName={setSectionName} />
      </main>
    </ClassDetailsProvider>
  );
}
