import React, { useState } from "react";
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useSections } from "../../hooks/useSections";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function AllClassesFiltersDrawer() {
  const { filterApplications } = useSections();

  const [filters, setFilters] = useState({
    schoolYear: "all",
    semester: "all",
    gradeLevel: "",
    strand: "all",
  });

  const initialFilters = {
    schoolYear: "all",
    semester: "all",
    gradeLevel: "",
    strand: "all",
  };

  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const handleFilterClick = () => {
    filterApplications(filters);
  };

  const handleClearFilters = () => {
    setFilters(initialFilters);
    filterApplications(initialFilters);
  };

  return (
    <DrawerContent>
      <main className="mx-auto w-full max-w-sm">
        <DrawerHeader>
          <DrawerTitle>Filter Sections</DrawerTitle>
          <DrawerDescription className="">
            Select filters to narrow down the list of sections
          </DrawerDescription>
        </DrawerHeader>
        <section className="mb-4 flex flex-col gap-4 px-4">
          {/* <TooltipProvider>
            <Tooltip>
              <button onClick={handleClearFilters} className="flex justify-end">
                <TooltipTrigger asChild>
                  <span className="rounded-sm border border-muted-foreground p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-rotate-ccw"
                    >
                      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                      <path d="M3 3v5h5" />
                    </svg>
                  </span>
                </TooltipTrigger>
              </button>
              <TooltipContent>
                <p>Clear Filters</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider> */}

          <select
            data-vaul-no-drag
            className=" col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            id="schoolYear"
            value={filters.schoolYear}
            onChange={(e) => handleFilterChange("schoolYear", e.target.value)}
          >
            <option value="all">All School Years</option>
            <option value="2023-2024">2023-2024</option>
            <option value="2024-2025">2024-2025</option>
            <option value="2025-2026">2025-2026</option>
            <option value="2026-2027">2026-2027</option>
            <option value="2027-2028">2027-2028</option>
            <option value="2028-2029">2028-2029</option>
            <option value="2029-2030">2029-2030</option>
          </select>
          <select
            data-vaul-no-drag
            className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            id="semester"
            value={filters.semester}
            onChange={(e) => handleFilterChange("semester", e.target.value)}
          >
            <option value="all">All Semesters</option>
            <option value="first semester">1st Semester</option>
            <option value="second semester">2nd Semester</option>
          </select>
          <select
            data-vaul-no-drag
            className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            id="gradeLevel"
            value={filters.gradeLevel}
            onChange={(e) => handleFilterChange("gradeLevel", e.target.value)}
          >
            <option value="">All Grade Levels</option>
            <option value="11">Grade 11</option>
            <option value="12">Grade 12</option>
          </select>
          <select
            data-vaul-no-drag
            className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            id="strand"
            value={filters.strand}
            onChange={(e) => handleFilterChange("strand", e.target.value)}
          >
            <option value="all">All Strands</option>
            <option value="gas">GAS</option>
            <option value="abm">ABM</option>
            <option value="humss">HUMSS</option>
            <option value="stem">STEM</option>
            <option value="ict">ICT</option>
          </select>

          <Button
            onClick={handleClearFilters}
            className=" w-full"
            variant="outline"
          >
            Clear Filters
          </Button>

          <DrawerClose asChild>
            <Button onClick={handleFilterClick} className="mb-4 w-full">
              Apply Filters
            </Button>
          </DrawerClose>
        </section>
      </main>
    </DrawerContent>
  );
}
