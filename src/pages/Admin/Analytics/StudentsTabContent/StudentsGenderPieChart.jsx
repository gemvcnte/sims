import React from "react";
import {
  PieChart,
  Pie,
  Legend,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import useAnalytics from "../useAnalytics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const StudentsGenderPieChart = () => {
  const { analyticsData, loading, error } = useAnalytics();

  if (loading) {
    return <Skeleton className="h-[400px] w-full"></Skeleton>;
  }

  if (error) {
    return <p>Error fetching analytics data</p>;
  }

  const studentData = analyticsData?.students;

  if (!studentData) {
    return <p>No student data available</p>;
  }

  const maleFemaleData = [
    {
      name: "Total Grade 11 Students",
      value: studentData.totalGrade11Students,
    },
    {
      name: "Total Grade 12 Students",
      value: studentData.totalGrade12Students,
    },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-sm font-bold">
          Students Distribution by Grade Level
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart width={400} height={400}>
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={maleFemaleData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {maleFemaleData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill || "#8884d8"} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default StudentsGenderPieChart;
