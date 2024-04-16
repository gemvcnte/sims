import React from "react";
import { cn } from "@/lib/utils";
import { useClassNav } from "../contexts/ClassNavContext";
import { useClassDetails } from "../contexts/ClassDetailsContext";
import { isClassAdviser } from "../helpers/isClassAdviser";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

function ClassNav({ className, ...props }) {
  const classDetailsContext = useClassDetails();
  const { classDetails, loading, fetchClassDetails } = classDetailsContext;
  const isAdviser = isClassAdviser(classDetails);

  const { selectedTab, setTab } = useClassNav();

  const handleTabClick = (tab) => {
    setTab(tab);
  };

  return (
    <Tabs
      defaultValue="overview"
      value={selectedTab}
      className="sm:pr pl-4 pt-4"
    >
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger
          value="overview"
          onClick={() => handleTabClick("overview")}
        >
          Overview
        </TabsTrigger>
        <TabsTrigger
          value="students"
          onClick={() => handleTabClick("students")}
        >
          Students
        </TabsTrigger>
        <TabsTrigger value="grades" onClick={() => handleTabClick("grades")}>
          Grades
        </TabsTrigger>
        <TabsTrigger
          value="subjects"
          onClick={() => handleTabClick("subjects")}
        >
          Subjects
        </TabsTrigger>
        <TabsTrigger
          value="schedule"
          onClick={() => handleTabClick("schedule")}
        >
          Schedule
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

export default ClassNav;
