import React, { useState } from "react";
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
import { useClassDetails } from "../contexts/ClassDetailsContext";
import AddSubjectModal from "./AddSubjectModal";
import UpdateSubjectModal from "./UpdateSubjectModal";
import { Icon } from "@iconify/react";
import { DeleteSubjectModal } from "./DeleteSubjectModal";
import { isClassAdviser } from "../helpers/isClassAdviser";

export default function SubjectsTable() {
  const classDetailsContext = useClassDetails();
  const { classDetails, loading, fetchClassDetails } = classDetailsContext;

  const [rowCounter, setRowCounter] = useState(1);

  const isAdviser = isClassAdviser(classDetails);

  return (
    <main className="p-4">
      <Table>
        {classDetails.subjects.length === 0 && (
          <TableCaption className="pb-4">No Subjects Found</TableCaption>
        )}
        <TableHeader>
          <TableRow>
            {classDetails.subjects.length !== 0 && <TableHead></TableHead>}
            <TableHead>
              Subject <span className="hidden sm:inline">Name</span>
            </TableHead>
            <TableHead>Teacher</TableHead>
            <TableHead></TableHead>
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
              {isAdviser ? (
                <UpdateSubjectModal
                  onSuccess={() => fetchClassDetails()}
                  subject={subject}
                />
              ) : (
                <TableCell></TableCell>
              )}
              {isAdviser ? (
                <DeleteSubjectModal
                  onSuccess={() => fetchClassDetails()}
                  subject={subject}
                />
              ) : (
                <TableCell></TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter></TableFooter>
      </Table>
    </main>
  );
}
