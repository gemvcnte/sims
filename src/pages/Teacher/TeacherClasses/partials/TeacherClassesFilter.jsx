import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

export default function TeacherClassesFilter() {
  return (
    <main className="p-4">
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Filter</SelectLabel>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="advisory">Advisory</SelectItem>
            <SelectItem value="subjectTeacher">Subject Teacher</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </main>
  );
}
