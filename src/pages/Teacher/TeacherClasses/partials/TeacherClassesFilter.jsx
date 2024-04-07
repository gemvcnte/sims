// TeacherClassesFilter.js
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFilteredClassesContext } from "../contexts/FilteredClassesContext";

export default function TeacherClassesFilter() {
  const {
    filter,
    schoolYearFilter,
    setFilter,
    setSchoolYearFilter,
    semesterFilter,
    setSemesterFilter,
  } = useFilteredClassesContext();

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const handleSchoolYearFilterChange = (value) => {
    setSchoolYearFilter(value);
  };

  const handleSemesterFilterChange = (value) => {
    setSemesterFilter(value);
  };

  return (
    <main className="flex gap-2 p-4">
      <Select value={filter} onValueChange={handleFilterChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All Sections" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="all">All Sections</SelectItem>
            <SelectItem value="advisory">Advisory</SelectItem>
            <SelectItem value="subjectTeacher">Subject Teacher</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select
        value={schoolYearFilter}
        onValueChange={handleSchoolYearFilterChange}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All School Years" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="all">All School Years</SelectItem>
            <SelectItem value="2023-2024">2023-2024</SelectItem>
            <SelectItem value="2028-2029">2028-2029</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select value={semesterFilter} onValueChange={handleSemesterFilterChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All Semesters" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="all">All Semesters</SelectItem>
            <SelectItem value="first semester">1st semester</SelectItem>
            <SelectItem value="second semester">2nd semester</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </main>
  );
}
