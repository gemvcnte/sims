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

export function DeleteAccountConfirmationAlertDialog({ userType, userId }) {
  const { refetchStudents: refetchArchivedStudents } = useAllStudents();

  const handleSubmit = async (data) => {
    if (userType === "student") {
      const response = await deleteArchivedStudent(userId);
      if (response) {
        refetchArchivedStudents();
      }
    } else {
      return;
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full border-destructive text-destructive"
        >
          Delete Student
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
            Delete Account
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
