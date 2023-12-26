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

export default function SubjectsTable() {
  const classDetailsContext = useClassDetails();
  const { classDetails, loading, fetchClassDetails } = classDetailsContext;

  const [rowCounter, setRowCounter] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  console.log(classDetails);

  return (
    <main className="p-4">
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <div className="mb-4 flex gap-4">
          <DialogTrigger asChild>
            <Button variant="outline">Add Subject</Button>
          </DialogTrigger>
        </div>
        <AddSubjectModal
          onSuccess={() => fetchClassDetails()}
          closeModal={closeModal}
        />
      </Dialog>

      <Table>
        {/* <TableCaption className="pb-4">No Subjects Found</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Subject Name</TableHead>
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
              <TableCell className="inline-block">
                Update <span className="hidden sm:inline">Subject</span>
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
