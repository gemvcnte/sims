import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import ArchiveAccountForm from "./ArchiveAccountForm";

export function ArchiveAccountConfirmationAlertDialog({ userType, userId }) {
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);

  const closeAlertDialog = () => {
    setIsAlertDialogOpen(false);
  };

  return (
    <AlertDialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Move to Archive</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will archive the {userType} account. Once archived, the{" "}
            {userType} will no longer be able to log in to the system.
          </AlertDialogDescription>

          {/* Imported form component */}
          <ArchiveAccountForm
            userType={userType}
            userId={userId}
            closeAlertDialog={closeAlertDialog}
          />
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}
