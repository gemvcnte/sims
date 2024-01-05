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
  const { filter, setFilter } = useFilteredClassesContext();

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  return (
    <main className="p-4">
      <Select value={filter} onValueChange={handleFilterChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All Classes" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="all">All Classes</SelectItem>
            <SelectItem value="advisory">Advisory</SelectItem>
            <SelectItem value="subjectTeacher">Subject Teacher</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </main>
  );
}
