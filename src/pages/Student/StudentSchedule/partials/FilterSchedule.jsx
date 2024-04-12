import React, { useEffect } from "react";
import { useClassDetails } from "../contexts/ClassDetailsContext";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";
import ExportCsvButton from "@/components/export-csv-button";

export default function FilterSchedule() {
  const { schoolYearAndSemesterSelectOptions } = useClassDetails();

  useEffect(() => {
    console.log(
      `schoolYearAndSemesterSelectOptions`,
      schoolYearAndSemesterSelectOptions,
    );
  }, [schoolYearAndSemesterSelectOptions]);

  const mostLatestSchoolYearAndSemester = schoolYearAndSemesterSelectOptions
    ? `${schoolYearAndSemesterSelectOptions[0]?.schoolYear}-${schoolYearAndSemesterSelectOptions[0]?.semester}`
    : "";

  console.log(mostLatestSchoolYearAndSemester);

  return (
    <header className="flex justify-between gap-2 px-4 pt-4">
      <Select value={mostLatestSchoolYearAndSemester}>
        <SelectTrigger className="w-fit">
          <SelectValue placeholder="Select School Year and Semester" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>School Year and Semester</SelectLabel>
            {schoolYearAndSemesterSelectOptions &&
              schoolYearAndSemesterSelectOptions.map((option, index) => (
                <SelectItem
                  key={index}
                  value={`${option.schoolYear}-${option.semester}`}
                >
                  {`${option.schoolYear} - ${option.semester}`}
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <ExportCsvButton />
    </header>
  );
}
