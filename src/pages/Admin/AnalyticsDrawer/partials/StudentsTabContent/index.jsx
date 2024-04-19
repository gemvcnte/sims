import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import StudentsStackedBarChart from "./StudentsStackedBarChart";
import StudentsGenderPieChart from "./StudentsGenderPieChart";
import StudentAnalyticsCards from "./StudentAnalyticsCards";
import { useAnalyticsContext } from "../../context/AnalyticsContext";

export function StudentsTabContent() {
  const { loading } = useAnalyticsContext();

  if (loading) {
    return <p>loading...</p>;
  }

  const componentsArray = [
    StudentAnalyticsCards,
    StudentsStackedBarChart,
    StudentsGenderPieChart,
  ];

  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {componentsArray.map((Component, index) => (
          <CarouselItem key={index}>
            <section className="flex w-full justify-center">
              <Component />
            </section>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
