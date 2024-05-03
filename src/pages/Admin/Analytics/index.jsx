import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import StudentsTabContent from "./StudentsTabContent";

export default function Analytics() {
  return (
    <Tabs defaultValue="students" className="p-4">
      <TabsList className="mb-2 w-full sm:max-w-[300px]">
        <TabsTrigger value="students" className="w-full">
          Students
        </TabsTrigger>
        <TabsTrigger value="faculty" className="w-full">
          Faculty
        </TabsTrigger>
      </TabsList>
      <TabsContent value="students" className="p-0">
        <StudentsTabContent />
      </TabsContent>
      <TabsContent value="faculty">
        {/* <FacultyTabContent /> */}
        <p>faculty tab content</p>
      </TabsContent>
    </Tabs>
  );
}
