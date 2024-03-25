import { Button } from "@/components/ui/button";
import { DialogContent, DialogFooter } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import React from "react";

export default function SpecificStudentGradesModal({ studentDetails }) {
  if (!studentDetails) {
    return <p>loading..</p>; // or render a loading indicator or an error message
  }

  console.log("heelo");
  console.log(studentDetails);

  return (
    <DialogContent>
      <div>
        <h2 className="mb-4 text-lg font-semibold">
          {studentDetails.Firstname} {studentDetails.Lastname} - Grades
        </h2>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Subject</TableCell>
              <TableCell>QTR1 Grade</TableCell>
              <TableCell>QTR2 Grade</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentDetails.studentGrades.map((grade, index) => (
              <TableRow key={index}>
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
