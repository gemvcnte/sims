import React from "react";
import { cn } from "@/lib/utils";
import { useClassNav } from "../contexts/ClassNavContext";

function ClassNav({ className, ...props }) {
  const { selectedTab, setTab } = useClassNav();

  console.log(selectedTab);

  const handleTabClick = (tab) => {
    setTab(tab);
  };

  return (
    <nav
      className={cn("flex items-center space-x-4 px-4 lg:space-x-6", className)}
      {...props}
    >
      <p
        className={`py-4 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground ${
          selectedTab === "students" &&
          "border-b-2 border-foreground !text-foreground"
        }`}
        onClick={() => handleTabClick("students")}
      >
        Students
      </p>
      <p
        className={`py-4 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground ${
          selectedTab === "subjects" &&
          "border-b-2 border-foreground !text-foreground"
        }`}
        onClick={() => handleTabClick("subjects")}
      >
        Subjects
      </p>
      <p
        className={`py-4 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground ${
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
