import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SelectTeacherCombobox from "../SelectTeacherCombobox";
import { Button } from "@/components/ui/button";
import useAddSubjectModal from "./useAddSubjectModal";
import { schema } from "./schema";
import { useCheckOverlap } from "./useCheckOverlap";
import {
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export default function AddSubjectModalForm(subject) {
  const {
    subjectName,
    setSubjectName,
    selectedTeacher,
    setSelectedTeacher,
    schedules,
    handleSaveChanges,
    addSchedule,
    removeSchedule,
    updateSchedule,
    loading,
  } = useAddSubjectModal(subject);

  const { checkOverlap } = useCheckOverlap(selectedTeacher);

  const form = useForm({
    resolver: yupResolver(schema(checkOverlap)),
    defaultValues: subject.subject, // Set default values here
  });

  const isOnUatEnvironment = import.meta.env.VITE_ENVIRONMENT === "uat";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSaveChanges)}>
        <SheetHeader>
          <SheetTitle>Update Subject</SheetTitle>

          <SheetDescription className="md:max-w-[80%]">
            Let's update the subject details below.
          </SheetDescription>
        </SheetHeader>

        <main className="my-4 flex flex-col gap-4 overflow-auto py-4">
          <FormField
            control={form.control}
            name="subjectName"
            render={({ field }) => (
              <FormItem>
                <section className="grid grid-cols-4 items-center gap-4">
                  <FormLabel htmlFor="name" className="text-right">
                    Subject <span className="hidden sm:inline">Name</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      maxLength={isOnUatEnvironment ? 40 : null}
                      {...field}
                      id="name"
                      className="col-span-3"
                      placeholder="Enter Subject Name"
                      value={subjectName}
                      onChange={(e) => {
                        field.onChange(e); // This should be sufficient for controlled inputs
                        setSubjectName(e.target.value);
                      }}
                    />
                  </FormControl>
                </section>
                <FormMessage className="text-center" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="selectedTeacher"
            render={({ field }) => (
              <FormItem>
                <section className="grid grid-cols-4 items-center gap-4">
                  <FormLabel htmlFor="teacher" className="text-right">
                    Teacher
                  </FormLabel>
                  <FormControl>
                    <SelectTeacherCombobox
                      subject={subject}
                      field={field}
                      onSelectTeacher={setSelectedTeacher}
                    />
                  </FormControl>
                </section>
                <FormMessage className="text-center" />
              </FormItem>
            )}
          />
        </main>

        {form.formState.errors.schedules && (
          <p className="text-center text-red-500">
            {form.formState.errors.schedules.message}
          </p>
        )}

        <SheetFooter>
          <Button type="submit" disabled={loading}>
            Save changes
          </Button>
        </SheetFooter>
      </form>
    </Form>
  );
}
