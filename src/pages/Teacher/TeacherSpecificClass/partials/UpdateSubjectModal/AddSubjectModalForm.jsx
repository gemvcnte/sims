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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSaveChanges)}>
        <DialogHeader>
          <DialogTitle>Update a Subject</DialogTitle>

          <DialogDescription className="md:max-w-[80%]">
            Let's update a new subject. Update the details below.
          </DialogDescription>
        </DialogHeader>

        <main className="my-4 grid h-80 gap-4 overflow-y-auto py-4">
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

        {/* Add a conditional rendering for the error message */}
        {/* {form.formState.errors.schedules && (
          <div className="text-center text-red-500">
            <p>Overlapping schedules found:</p>
            {Array.isArray(form.formState.errors.schedules.message) ? (
              form.formState.errors.schedules.message.map((schedule, index) => (
                <p key={index}>
                  {schedule.day} ({schedule.startTime} - {schedule.endTime})
                </p>
              ))
            ) : (
              <p>
                {form.formState.errors.schedules.message.replace(/[[\]"]/g, "")}
              </p>
            )}
          </div>
        )} */}

        {/* Add a conditional rendering for the error message */}
        {form.formState.errors.schedules && (
          <p className="text-center text-red-500">
            {form.formState.errors.schedules.message}
          </p>
        )}

        <DialogFooter>
          <Button type="submit" disabled={loading}>
            Update subject
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
