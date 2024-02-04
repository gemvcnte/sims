import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { useAnalyticsContext } from "../context/AnalyticsContext";
import StudentsTabContent from "./StudentsTabContent";
export function AnalyticsTabs({}) {
  const { analyticsData, loading, error } = useAnalyticsContext();

  return (
    <Tabs defaultValue="students" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger value="students" className="w-full">
          Students
        </TabsTrigger>
        <TabsTrigger value="faculty" className="w-full">
          Faculty
        </TabsTrigger>
      </TabsList>
      <TabsContent value="students">
        <StudentsTabContent />
      </TabsContent>
      <TabsContent value="faculty">faculty analytics</TabsContent>
    </Tabs>
  );
}
