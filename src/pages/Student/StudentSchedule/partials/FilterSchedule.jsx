import React, { useState } from "react";
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
import showErrorNotification from "@/utils/ShowErrorNotification";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export default function FilterSchedule() {
  const {
    schoolYearAndSemesterSelectOptions,
    filterClassDetails,
    classDetails,
  } = useClassDetails();

  if (
    !schoolYearAndSemesterSelectOptions ||
    schoolYearAndSemesterSelectOptions.length === 0
  ) {
    return null;
  }

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
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Display All Subjects</Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            {classDetails.map((classDetail) => (
              <div key={classDetail._id}>
                <ul>
                  {classDetail.subjects.map((subject) => (
                    <li key={subject._id}>{subject.subjectName}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </header>
  );
}
