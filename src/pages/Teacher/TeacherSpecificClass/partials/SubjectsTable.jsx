import React, { useState, useEffect } from "react";
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
import { Button } from "@/components/ui/button";
import { useClassDetails } from "../contexts/ClassDetailsContext";
import { Icon } from "@iconify/react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import AddSubjectModal from "./AddSubjectModal";
import UpdateSubjectModal from "./UpdateSubjectModal";

export default function SubjectsTable() {
  const classDetailsContext = useClassDetails();
  const { classDetails, loading, fetchClassDetails } = classDetailsContext;

  const [rowCounter, setRowCounter] = useState(1);

  console.log(classDetails);

  return (
    <main className="p-4">
      <AddSubjectModal onSuccess={() => fetchClassDetails()} />

      <Table>
        {/* <TableCaption className="pb-4">No Subjects Found</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>
              Subject <span className="hidden sm:inline">Name</span>
            </TableHead>
            <TableHead>Teacher</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {classDetails.subjects.map((subject, index) => (
            <TableRow key={subject._id}>
              <TableCell className="text-muted-foreground">
                {index + rowCounter}
              </TableCell>
              <TableCell className="font-medium">
                {subject.subjectName}
              </TableCell>
              <TableCell>{subject.subjectTeacher}</TableCell>
              <UpdateSubjectModal
                onSuccess={() => fetchClassDetails()}
                subject={subject}
              />
            </TableRow>
          ))}
        </TableBody>
        <TableFooter></TableFooter>
      </Table>
    </main>
  );
}
