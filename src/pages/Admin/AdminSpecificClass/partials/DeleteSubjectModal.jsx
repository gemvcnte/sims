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
import { TableCell } from "@/components/ui/table";
import showErrorNotification from "@/utils/ShowErrorNotification";
import showSuccessNotification from "@/utils/ShowSuccessNotification";
import { Icon } from "@iconify/react";
import deleteSubjectApi from "../helpers/deleteSubjectApi";

export function DeleteSubjectModal({ onSuccess, subject }) {
  const handleDelete = async () => {
    try {
      const deletionData = { data: { subjectId: subject._id } };

      const response = await deleteSubjectApi(deletionData);

      showSuccessNotification(response.data.message);
      onSuccess();
    } catch (error) {
      showErrorNotification("Error deleting subject:", error.message);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <TableCell className="hover:cursor-pointer">
          <span className="flex items-center gap-2">
            <span className="border-b border-background py-0 hover:border-foreground">
              Delete
            </span>
            <Icon
              icon="ant-design:delete-outlined"
              className="hidden sm:inline"
            />
          </span>
        </TableCell>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            subject.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}