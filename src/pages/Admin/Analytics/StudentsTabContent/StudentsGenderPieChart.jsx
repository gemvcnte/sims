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

const StudentsGenderPieChart = () => {
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

  const maleFemaleData = [
    { name: "Total Male Students", value: studentData.totalMaleStudents },
    { name: "Total Female Students", value: studentData.totalFemaleStudents },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-sm font-bold">
          Students Gender Distribution
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
