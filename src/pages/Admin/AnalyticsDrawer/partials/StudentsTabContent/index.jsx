import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import TotalStudentsCard from "./TotalStudentsCard";
import StudentsStackedBarChart from "./StudentsStackedBarChart";
import StudentsGenderPieChart from "./StudentsGenderPieChart";

export function StudentsTabContent() {
  const componentsArray = [
    TotalStudentsCard,
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
