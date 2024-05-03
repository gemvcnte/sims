import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useAnalytics from "../useAnalytics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const StudentsStackedBarChart = () => {
  const { analyticsData, loading, error } = useAnalytics();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching analytics data</p>;
  }

  const studentData = analyticsData?.students;

  if (!studentData) {
    return <p>No student data available</p>;
  }

  const excludedKeys = [
    "totalStudents",
    "totalStudentsPercentage",
    "totalMaleStudents",
    "totalMaleStudentsPercentage",
    "totalFemaleStudents",
    "totalFemaleStudentsPercentage",
    "totalAcadStudents",
    "totalAcadStudentsPercentage",
    "totalTVLStudents",
    "totalTVLStudentsPercentage",
  ];
  const filteredData = Object.entries(studentData)
    .filter(([category]) => !excludedKeys.includes(category))
    .map(([category, count]) => ({
      category,
      count,
    }));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-sm font-bold">
          Students Distribution by Strand
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            width={500}
            height={300}
            data={filteredData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" stackId="a" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default StudentsStackedBarChart;
