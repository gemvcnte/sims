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
import { Icon } from "@iconify/react";
import { DeleteSubjectModal } from "./DeleteSubjectModal";
import { isClassAdviser } from "../helpers/isClassAdviser";
import { ModalProvider } from "./AddSubjectModal/AddSubjectModal.hooks";
import UpdateSubjectModal from "./UpdateSubjectModal";
import { UpdateModalProvider } from "./UpdateSubjectModal/AddSubjectModal.hooks";
import RemoveScheduleModal from "./RemoveScheduleModal";
import { RemoveScheduleModalProvider } from "./RemoveScheduleModal/AddSubjectModal.hooks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

export default function SubjectsTable() {
  const classDetailsContext = useClassDetails();
  const { classDetails, loading, fetchClassDetails } = classDetailsContext;

  const [rowCounter, setRowCounter] = useState(1);

  const isAdviser = isClassAdviser(classDetails);

  return (
    <main className="p-4">
      {isAdviser && (
        <ModalProvider>
          <AddSubjectModal />
        </ModalProvider>
      )}

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
            {!isAdviser && <TableHead></TableHead>}
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

              {/* {isAdviser ? (
                <UpdateModalProvider>
                  <UpdateSubjectModal
                    onSuccess={() => fetchClassDetails()}
                    subject={subject}
                  />
                </UpdateModalProvider>
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

              {isAdviser ? (
                <RemoveScheduleModalProvider>
                  <RemoveScheduleModal
                    onSuccess={() => fetchClassDetails()}
                    subject={subject}
                  />
                </RemoveScheduleModalProvider>
              ) : (
                <TableCell></TableCell>
              )} */}

              {isAdviser ? (
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="flex flex-col ">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>

                      <UpdateModalProvider>
                        <UpdateSubjectModal
                          onSuccess={() => fetchClassDetails()}
                          subject={subject}
                        />
                      </UpdateModalProvider>

                      <DeleteSubjectModal
                        onSuccess={() => fetchClassDetails()}
                        subject={subject}
                      />

                      <DropdownMenuSeparator className="mx-2" />

                      <RemoveScheduleModalProvider>
                        <RemoveScheduleModal
                          onSuccess={() => fetchClassDetails()}
                          subject={subject}
                        />
                      </RemoveScheduleModalProvider>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              ) : (
                <TableCell></TableCell>
              )}

              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter></TableFooter>
      </Table>
    </main>
  );
}
