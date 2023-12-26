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

export default function SubjectsTable() {
  const classDetailsContext = useClassDetails();
  const { classDetails, loading, fetchClassDetails } = classDetailsContext;

  const [rowCounter, setRowCounter] = useState(1);

  return (
    <main className="p-4">
      <AddSubjectModal onSuccess={() => fetchClassDetails()} />

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
              <UpdateSubjectModal
                onSuccess={() => fetchClassDetails()}
                subject={subject}
              />
              <TableCell className="hover:cursor-pointer">
                <span className="flex items-center gap-2">
                  Delete
                  <Icon
                    icon="ant-design:delete-outlined"
                    className="hidden sm:inline"
                  />
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter></TableFooter>
      </Table>
    </main>
  );
}
