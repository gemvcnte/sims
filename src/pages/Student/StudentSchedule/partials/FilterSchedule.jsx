import React from "react";
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
import ExportCsvButton from "@/components/export-csv-button";

export default function FilterSchedule() {
  const { schoolYearAndSemesterSelectOptions, filterClassDetails } =
    useClassDetails();

  const mostLatestSchoolYearAndSemester = schoolYearAndSemesterSelectOptions
    ? `${schoolYearAndSemesterSelectOptions[0]?.schoolYear}-${schoolYearAndSemesterSelectOptions[0]?.semester}`
    : "";

  const handleSelectChange = (value) => {
    if (!schoolYearAndSemesterSelectOptions) return;

    const selectedOption = schoolYearAndSemesterSelectOptions.find(
      (option) => `${option.schoolYear}-${option.semester}` === value,
    );

    if (selectedOption) {
      filterClassDetails(selectedOption);
    }
  };

  return (
    <header className="flex justify-between gap-2 px-4 pt-4">
      <Select
        defaultValue={mostLatestSchoolYearAndSemester}
        onValueChange={handleSelectChange}
      >
        <SelectTrigger className="w-fit gap-2">
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

      {/* <ExportCsvButton /> */}
    </header>
  );
}
