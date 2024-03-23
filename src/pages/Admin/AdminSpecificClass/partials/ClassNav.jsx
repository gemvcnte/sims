import React from "react";
import { cn } from "@/lib/utils";
import { useClassNav } from "../contexts/ClassNavContext";
import { useClassDetails } from "../contexts/ClassDetailsContext";
import { isClassAdviser } from "../helpers/isClassAdviser";

function ClassNav({ className, ...props }) {
  const classDetailsContext = useClassDetails();
  const { classDetails, loading, fetchClassDetails } = classDetailsContext;
  const isAdviser = isClassAdviser(classDetails);

  const { selectedTab, setTab } = useClassNav();

  const handleTabClick = (tab) => {
    setTab(tab);
  };

  return (
    <nav
      className={cn("flex items-center space-x-4 px-4 lg:space-x-6", className)}
      {...props}
    >
      <p
        className={`py-4 text-sm font-medium text-muted-foreground transition-colors hover:cursor-pointer hover:text-foreground ${
          selectedTab === "overview" &&
          "border-b-2 border-foreground !text-foreground"
        }`}
        onClick={() => handleTabClick("overview")}
      >
        Overview
      </p>

      <p
        className={`py-4 text-sm font-medium text-muted-foreground transition-colors hover:cursor-pointer hover:text-foreground ${
          selectedTab === "students" &&
          "border-b-2 border-foreground !text-foreground"
        }`}
        onClick={() => handleTabClick("students")}
      >
        Students
      </p>

      {/* <p
        className={`py-4 text-sm font-medium text-muted-foreground transition-colors hover:cursor-pointer hover:text-foreground ${
          selectedTab === "grades" &&
          "border-b-2 border-foreground !text-foreground"
        }`}
        onClick={() => handleTabClick("grades")}
      >
        Grades
      </p> */}

      {/* {isAdviser && ( */}
      <p
        className={`py-4 text-sm font-medium text-muted-foreground transition-colors hover:cursor-pointer hover:text-foreground ${
          selectedTab === "subjects" &&
          "border-b-2 border-foreground !text-foreground"
        }`}
        onClick={() => handleTabClick("subjects")}
      >
        Subjects
      </p>
      {/* )} */}

      <p
        className={`py-4 text-sm font-medium text-muted-foreground transition-colors hover:cursor-pointer hover:text-foreground ${
          selectedTab === "schedule" &&
          "border-b-2 border-foreground !text-foreground"
        }`}
        onClick={() => handleTabClick("schedule")}
      >
        Schedule
      </p>
    </nav>
  );
}

export default ClassNav;
