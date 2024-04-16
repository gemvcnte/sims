import React, { useState } from "react";
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
import { useClassDetails } from "../hooks/ClassDetailsContext";

export default function FilterGrades() {
  const { schoolYearAndSemesterSelectOptions, filterClassDetails } =
    useClassDetails();

  if (!schoolYearAndSemesterSelectOptions) return null;

  const mostLatestSchoolYearAndSemester = `${schoolYearAndSemesterSelectOptions[0].schoolYear}-${schoolYearAndSemesterSelectOptions[0].semester}`;

  const [selectedSchoolYearAndSemester, setSelectedSchoolYearAndSemester] =
    useState(mostLatestSchoolYearAndSemester);

  const handleSelectChange = (selectedOptionString) => {
    const selectedOptionConvertedToObject =
      schoolYearAndSemesterSelectOptions.find(
        (option) =>
          `${option.schoolYear}-${option.semester}` === selectedOptionString,
      );

    if (!selectedOptionConvertedToObject) {
      showErrorNotification("Invalid option selected");
      return;
    }

    filterClassDetails(selectedOptionConvertedToObject);
    setSelectedSchoolYearAndSemester(selectedOptionString);
  };

  return (
    <header className="flex justify-between gap-2 px-4 pt-4">
      <Select
        value={selectedSchoolYearAndSemester}
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
