// StudentsTable.js
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Icon } from "@iconify/react";

export default function StudentsTable({ classDetails }) {
  return (
    <main className="p-4">
      <Table>
        <TableCaption>
          {classDetails.students.length == 0 && "No Students Found"}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Lastname</TableHead>
            <TableHead>Firstname</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {classDetails.students.map((student) => (
            <TableRow
              key={student._id}
              className="group transition-all duration-700 hover:cursor-pointer"
            >
              <TableCell className="uppercase">{student.lastName}</TableCell>
              <TableCell>{student.firstName}</TableCell>
              <TableCell className="inline-block">
                View <span className="hidden sm:inline">Student</span> Profile
                <Icon
                  icon="octicon:arrow-down-24"
                  rotate={3}
                  className="ml-2 inline-block -rotate-45 transform transition-all group-hover:rotate-45"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter></TableFooter>
      </Table>
    </main>
  );
}
