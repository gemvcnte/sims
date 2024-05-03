import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

export default function Analytics() {
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
        {/* <StudentsTabContent /> */}
        <p>students tab content</p>
      </TabsContent>
      <TabsContent value="faculty">
        {/* <FacultyTabContent /> */}
        <p>faculty tab content</p>
      </TabsContent>
    </Tabs>
  );
}
