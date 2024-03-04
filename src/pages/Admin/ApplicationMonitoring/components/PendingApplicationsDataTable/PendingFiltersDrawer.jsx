import React, { useState } from "react";
import { usePendingApplications } from "../../hooks/usePendingApplications";
import { DrawerContent } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

export default function PendingFiltersDrawer() {
  const { filterApplications } = usePendingApplications();

  const [filters, setFilters] = useState({
    schoolYear: "all",
    semester: "all",
    gradeLevel: "",
    strand: "all",
  });

  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const handleFilterClick = () => {
    filterApplications(filters);
  };

  return (
    <DrawerContent>
      <select
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
      </select>
      <select
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
      <div className="grid grid-cols-4 items-center gap-4">
        <Button onClick={handleFilterClick}>filter</Button>
      </div>
    </DrawerContent>
  );
}
