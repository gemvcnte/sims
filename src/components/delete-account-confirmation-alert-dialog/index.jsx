import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteArchivedStudent } from "@/services/api/admin/deleteArchivedStudent";
import { useAllStudents } from "@/pages/Admin/ArchiveStudents/hooks/useAllStudents";
import { useAllArchivedTeachers } from "@/pages/Admin/ArchiveTeachers/hooks/useAllArchivedTeachers";
import { deleteArchivedTeacher } from "@/services/api/admin/deleteArchivedTeacher";
import { useAllArchivedAdmins } from "@/pages/Admin/ArchiveAdmins/hooks/useAllArchivedAdmins";
import { deleteArchivedAdmin } from "@/services/api/admin/deleteArchivedAdmin";

export function DeleteAccountConfirmationAlertDialog({ userType, userId }) {
  let refetchStudents;
  let refetchTeachers;
  let refetchAdmins;

  if (userType === "student") {
    ({ refetchStudents } = useAllStudents());
  }
  if (userType === "teacher") {
    ({ refetchTeachers } = useAllArchivedTeachers());
  }
  if (userType === "admin") {
    ({ refetchAdmins } = useAllArchivedAdmins());
  }

  const handleSubmit = async (data) => {
    if (userType === "student") {
      const response = await deleteArchivedStudent(userId);
      if (response) {
        refetchStudents();
      }
    }

    if (userType === "teacher") {
      const response = await deleteArchivedTeacher(userId);
      if (response) {
        refetchTeachers();
      }
    }

    if (userType === "admin") {
      const response = await deleteArchivedAdmin(userId);
      if (response) {
        refetchAdmins();
      }
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full border-destructive text-destructive"
        >
          Delete {userType}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the{" "}
            {userType} account and remove the data from our server.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button variant="destructive" onClick={handleSubmit}>
            Delete {userType}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
