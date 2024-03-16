import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { AlertDialogCancel } from "../ui/alert-dialog";
import { archiveStudent } from "@/services/api/admin/archiveStudent";

const schema = yup.object().shape({
  remarks: yup
    .string()
    .required("Remarks are required")
    .max(255, "Remarks must be at most 255 characters"),
});

export default function ArchiveAccountForm({
  userType,
  userId,
  closeAlertDialog,
}) {
  const form = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    if (userType === "student") {
      console.log(userId);
      archiveStudent(userId, data.remarks);
    }

    console.log(data.remarks);
    closeAlertDialog();
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    form.handleSubmit(onSubmit)();
  };

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="remarks"
          render={({ field }) => (
            <FormItem className="space-y-0 py-4">
              <FormLabel>Archive Remarks</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  id="remarks"
                  placeholder={`Add remarks for archiving the ${userType} account.`}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button onClick={handleSubmit}>Continue</Button>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
      </form>
    </Form>
  );
}
