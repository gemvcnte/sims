import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectDemo() {
  return (
    <main className="flex gap-4 px-4">
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="School Year" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>School Year</SelectLabel>
            <SelectItem value="2023-2024">2023-2024</SelectItem>
            <SelectItem value="2024-2025">2024-2025</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Semester" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Semester</SelectLabel>
            <SelectItem value="First Semester">First Semester</SelectItem>
            <SelectItem value="Second Semester">Second Semester</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Strand" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Strand</SelectLabel>
            <SelectItem value="GAS">GAS</SelectItem>
            <SelectItem value="STEM">STEM</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </main>
  );
}
