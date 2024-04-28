import React, { useState } from "react";
import { useClassDetails } from "../contexts/ClassDetailsContext";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ExportCsvButton from "@/components/export-csv-button";
import showErrorNotification from "@/utils/ShowErrorNotification";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { BadgeInfo, InfoIcon } from "lucide-react";

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

  // Define a function to generate abbreviation
  const generateAbbreviation = (subjectName) => {
    const words = subjectName.split(" ");
    let abbreviation = "";
    words.forEach((word) => {
      abbreviation += word.charAt(0).toUpperCase() + ".";
    });
    return abbreviation;
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
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="icon" className="p-0">
            <BadgeInfo strokeWidth={1} className="sm:hidden " />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="grid gap-3 p-4">
            <div className="font-semibold">Section Details</div>
            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Subject Name</span>
                <span>{classDetails[0].sectionName}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Adviser</span>
                <span>{classDetails[0].adviser}</span>
              </li>
            </ul>

            <SelectSeparator className="my-2" />

            {/* <div className="font-semibold">Subjects</div> */}
            {classDetails.map((classDetail) => (
              <div key={classDetail._id}>
                <ul className="grid gap-3">
                  {classDetail.subjects.map((subject) => (
                    <li
                      key={subject._id}
                      className="flex items-center justify-between"
                    >
                      <span>{subject.subjectName}</span>
                      <span className="text-muted-foreground">
                        {generateAbbreviation(subject.subjectName)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </DrawerContent>
      </Drawer>
    </header>
  );
}
