"use client";

import * as React from "react";
import axios from "axios";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useFetchStudents } from "./useFetchStudents";

export default function SelectStudentCombobox({ onSelectTeacher }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const { students: StudentData, loading, error } = useFetchStudents();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="col-span-3 flex h-10  w-full justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {value
            ? StudentData.find((teacher) => teacher.username === value)
                ?.fullName
            : "Select teacher..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search teacher..." />
          <CommandEmpty>No teacher found.</CommandEmpty>
          <CommandGroup>
            {StudentData.map((teacher) => (
              <CommandItem
                key={teacher.username}
                value={teacher.username}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                  onSelectTeacher(teacher);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === teacher.username ? "opacity-100" : "opacity-0",
                  )}
                />
                {teacher.fullName}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
