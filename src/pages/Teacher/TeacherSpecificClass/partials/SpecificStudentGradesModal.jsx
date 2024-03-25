import { Button } from "@/components/ui/button";
import { DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

  // Calculate average grade
  const gradesWithValues = studentGrades.filter(
    (grade) =>
      !isNaN(parseFloat(grade.P1Grade)) && !isNaN(parseFloat(grade.P2Grade)),
  );
  const averageGrade =
    gradesWithValues.reduce(
      (total, grade) =>
        total + (parseFloat(grade.P1Grade) + parseFloat(grade.P2Grade)) / 2,
      0,
    ) / gradesWithValues.length;

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
      FINAL_GRADE:
        (parseFloat(grade.P2Grade) + parseFloat(grade.P1Grade)) / 2 || "",
      REMARKS:
        (parseFloat(grade.P2Grade) + parseFloat(grade.P1Grade)) / 2 >= 75
          ? "Passed"
          : "Failed",
    })),
  ];

  // Check if all subjects have final grades
  const allSubjectsHaveGrades = studentGrades.every(
    (grade) => grade.P1Grade && grade.P2Grade,
  );

  // Include average grade in CSV data only if all subjects have grades
  if (allSubjectsHaveGrades) {
    csvData.push({
      SUBJECT: "Average Grade",
      QTR1: "", // No quarters for average grade
      QTR2: "", // No quarters for average grade
      FINAL_GRADE: isNaN(averageGrade) ? "" : averageGrade.toFixed(1), // Limit to 1 decimal place
      REMARKS: isNaN(averageGrade) || averageGrade < 75 ? "" : "Passed",
    });
  }

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
    { label: "FINAL GRADE", key: "FINAL_GRADE" }, // Added FINAL GRADE header
    { label: "REMARKS", key: "REMARKS" }, // Added REMARKS header
  ];

  return (
    <DialogContent className="max-h-[90svh] max-w-[90vw] overflow-scroll md:max-w-[70vw]">
      <div className="">
        <h2 className="mb-4 text-lg font-semibold">
          {studentDetails.Firstname} {studentDetails.Lastname} - Grades
        </h2>

        <section className="flex flex-col justify-between py-2 md:flex-row md:items-end">
          <div className="">
            <div className="flex ">
              <p className="w-[13ch] text-right font-bold">LRN:</p>
              <p className="ml-2 text-left">{studentDetails.LRN}</p>
            </div>
            <div className="flex ">
              <p className="w-[13ch] text-right font-bold">Section Name:</p>
              <p className="ml-2 text-left">
                {studentDetails.SectionName.toUpperCase()}
              </p>
            </div>
            <div className="flex ">
              <p className="w-[13ch] text-right font-bold">School Year:</p>
              <p className="ml-2 text-left">{studentDetails.SchoolYear}</p>
            </div>
            <div className="flex ">
              <p className="w-[13ch] text-right font-bold">Semester:</p>
              <p className="ml-2 text-left">
                {studentDetails.Semester.toUpperCase()}
              </p>
            </div>
            <div className="flex ">
              <p className="w-[13ch] text-right font-bold">Grade Level:</p>
              <p className="ml-2 text-left">{studentDetails.GradeLevel}</p>
            </div>
            <div className="flex ">
              <p className="w-[13ch] text-right font-bold">Strand:</p>
              <p className="ml-2 text-left">
                {studentDetails.Strand.toUpperCase()}
              </p>
            </div>
          </div>

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
        </section>

        <Table>
          <TableHeader>
            <TableRow>
              {/* <TableHead>Lastname</TableHead>
              <TableHead>Firstname</TableHead>
              <TableHead>LRN</TableHead> */}

              <TableHead>SUBJECT</TableHead>
              <TableHead>QTR1</TableHead>
              <TableHead>QTR2</TableHead>
              <TableHead>FINAL GRADE</TableHead>
              <TableHead>REMARKS</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {studentDetails.studentGrades.map((grade, index) => (
              <TableRow key={index}>
                {/* <TableCell>{studentDetails.Lastname}</TableCell>
                <TableCell>{studentDetails.Firstname}</TableCell>
                <TableCell>{studentDetails.LRN}</TableCell> */}

                <TableCell>{grade.Subject}</TableCell>
                <TableCell>{grade.P1Grade || ""}</TableCell>
                <TableCell>{grade.P2Grade || ""}</TableCell>
                <TableCell
                  style={{
                    color:
                      (parseFloat(grade.P2Grade) + parseFloat(grade.P1Grade)) /
                        2 <
                      75
                        ? "red"
                        : "inherit",
                  }}
                >
                  {(parseFloat(grade.P2Grade) + parseFloat(grade.P1Grade)) /
                    2 || ""}
                </TableCell>
                <TableCell
                  style={{
                    color:
                      grade.P1Grade &&
                      grade.P2Grade &&
                      (parseFloat(grade.P2Grade) + parseFloat(grade.P1Grade)) /
                        2 <
                        75
                        ? "red"
                        : "inherit",
                  }}
                >
                  {grade.P1Grade && grade.P2Grade ? (
                    (parseFloat(grade.P2Grade) + parseFloat(grade.P1Grade)) /
                      2 >=
                    75 ? (
                      "Passed"
                    ) : (
                      <span style={{ color: "red" }}>Failed</span>
                    )
                  ) : (
                    ""
                  )}
                </TableCell>
              </TableRow>
            ))}

            {/* Calculate average grade */}
            <TableRow>
              <TableCell colSpan={3} className="font-semibold italic">
                Average Grade
              </TableCell>
              {allSubjectsHaveGrades && (
                <TableCell
                  className="italic"
                  style={{
                    fontWeight: "bold",
                    color:
                      !isNaN(averageGrade) && averageGrade < 75
                        ? "red"
                        : "inherit",
                  }}
                >
                  {isNaN(averageGrade) ? "" : averageGrade.toFixed(1)}
                </TableCell>
              )}
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* <DialogFooter>
        <Button type="submit">Save changes</Button>
      </DialogFooter> */}
    </DialogContent>
  );
}
