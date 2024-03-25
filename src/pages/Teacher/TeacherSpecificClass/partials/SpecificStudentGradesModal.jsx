import { Button } from "@/components/ui/button";
import { DialogContent, DialogFooter } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download } from "lucide-react";
import React from "react";
import { CSVLink } from "react-csv";

export default function SpecificStudentGradesModal({ studentDetails }) {
  if (!studentDetails) {
    return <p>loading..</p>; // or render a loading indicator or an error message
  }

  console.log("heelo");
  console.log(studentDetails);

  // Extract student details
  const {
    Firstname,
    Lastname,
    LRN,
    SchoolYear,
    Semester,
    SectionName,
    Strand,
    GradeLevel,
    studentGrades,
  } = studentDetails;

  // Prepare CSV data
  const csvData = [
    {
      FIRSTNAME: Firstname,
      LASTNAME: Lastname,
      LRN: LRN,
      SCHOOLYEAR: SchoolYear,
      SEMESTER: Semester,
      GRADELEVEL: GradeLevel,
      STRAND: Strand,
      SECTIONNAME: SectionName,
    },
    ...studentGrades.map((grade) => ({
      SUBJECT: grade.Subject,
      QTR1: grade.P1Grade || "",
      QTR2: grade.P2Grade || "",
    })),
  ];

  const headers = [
    { label: "FIRST NAME", key: "FIRSTNAME" },
    { label: "LAST NAME", key: "LASTNAME" },
    { label: "LRN", key: "LRN" },
    { label: "SCHOOLYEAR", key: "SCHOOLYEAR" },
    { label: "SEMESTER", key: "SEMESTER" },
    { label: "GRADE LEVEL", key: "GRADELEVEL" },
    { label: "STRAND", key: "STRAND" },
    { label: "SECTION NAME", key: "SECTIONNAME" },
    { label: "SUBJECT", key: "SUBJECT" },
    { label: "QTR1", key: "QTR1" },
    { label: "QTR2", key: "QTR2" },
  ];

  return (
    <DialogContent className="max-w-[70vw]">
      <div className="">
        <h2 className="mb-4 text-lg font-semibold">
          {studentDetails.Firstname} {studentDetails.Lastname} - Grades
        </h2>
        <p>School Year: {studentDetails.SchoolYear}</p>
        <p>Semester: {studentDetails.Semester}</p>
        <p>Section Name: {studentDetails.SectionName}</p>
        <p>Grade Level: {studentDetails.GradeLevel}</p>
        <p>Strand: {studentDetails.Strand}</p>

        {/* Export CSV Button */}

        <CSVLink
          data={csvData}
          headers={headers}
          filename={`${studentDetails.Lastname}_${studentDetails.Firstname}_Grades.csv`}
          target="_blank"
        >
          <Button
            className="border-none bg-green-400"
            variant="outline"
            type="button"
          >
            <Download className="mr-2 h-4 w-4" /> Export{" "}
            <span className="hidden sm:ml-[1ch] sm:inline-block"> CSV</span>
          </Button>
        </CSVLink>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Lastname</TableHead>
              <TableHead>Firstname</TableHead>
              <TableHead>LRN</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>QTR1</TableHead>
              <TableHead>QTR2</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {studentDetails.studentGrades.map((grade, index) => (
              <TableRow key={index}>
                <TableCell>{studentDetails.Lastname}</TableCell>
                <TableCell>{studentDetails.Firstname}</TableCell>
                <TableCell>{studentDetails.LRN}</TableCell>

                <TableCell>{grade.Subject}</TableCell>
                <TableCell>{grade.P1Grade || ""}</TableCell>
                <TableCell>{grade.P2Grade || ""}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* <DialogFooter>
        <Button type="submit">Save changes</Button>
      </DialogFooter> */}
    </DialogContent>
  );
}
