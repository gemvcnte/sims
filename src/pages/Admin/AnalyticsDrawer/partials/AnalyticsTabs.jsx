import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { StudentsTabContent } from "./StudentsTabContent";
import FacultyTabContent from "./FacultyTabContent";
export function AnalyticsTabs({}) {
  return (
    <Tabs defaultValue="students" className="w-full">
      <TabsList className="mb-2 w-full">
        <TabsTrigger value="students" className="w-full">
          Students
        </TabsTrigger>
        <TabsTrigger value="faculty" className="w-full">
          Faculty
        </TabsTrigger>
      </TabsList>
      <TabsContent value="students" className="pl-4">
        <StudentsTabContent />
      </TabsContent>
      <TabsContent value="faculty">
        <FacultyTabContent />
      </TabsContent>
    </Tabs>
  );
}
