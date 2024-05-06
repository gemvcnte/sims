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
import { Skeleton } from "@/components/ui/skeleton";

const DesignationStackedBarChart = () => {
  const { analyticsData, loading, error } = useAnalytics();

  if (loading) {
    return <Skeleton className="h-[400px] w-full"></Skeleton>;
  }

  if (error) {
    return <p>Error fetching analytics data</p>;
  }

  const facultyData = analyticsData?.faculty;

  if (!facultyData) {
    return <p>No faculty data available</p>;
  }

  const distributionData = facultyData.distribution;

  // Convert distribution data into array format for easier processing
  const distributionArray = Object.entries(distributionData).map(
    ([designation, { total, male, female }]) => ({
      designation: designation === "null" ? "No designation" : designation,
      total,
      male,
      female,
    }),
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-sm font-bold">
          Faculty Distribution by Designation and Gender
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={distributionArray}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="designation" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="male" stackId="a" fill="#8884d8" name="Male" />
            <Bar dataKey="female" stackId="a" fill="#82ca9d" name="Female" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default DesignationStackedBarChart;
