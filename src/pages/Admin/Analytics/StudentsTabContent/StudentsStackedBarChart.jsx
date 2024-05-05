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

const StudentsStackedBarChart = () => {
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

  const maleFemalePerStrand = studentData.maleFemalePerStrand.map(
    ({ _id, MALE, FEMALE }) => ({
      strand: _id[0], // Assuming each entry contains only one strand, you might need to adjust this
      MALE,
      FEMALE,
    }),
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-sm font-bold">
          Students Distribution by Strand and Gender
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            width={500}
            height={300}
            data={maleFemalePerStrand}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="strand" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="MALE" stackId="a" fill="#82ca9d" />
            <Bar dataKey="FEMALE" stackId="a" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default StudentsStackedBarChart;
