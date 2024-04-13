import React from "react";
import { useClassDetails } from "../contexts/ClassDetailsContext";
import { Skeleton } from "@/components/ui/skeleton";

export default function ClassName() {
  const { classDetails, loading } = useClassDetails();

  if (loading) {
    return <Skeleton className="h-8 w-[30ch]"></Skeleton>;
  }

  return (
    <span className="uppercase">SCHEDULE - {classDetails[0]?.sectionName}</span>
  );

  // return <span className="uppercase">SCHEDULE</span>;
}
