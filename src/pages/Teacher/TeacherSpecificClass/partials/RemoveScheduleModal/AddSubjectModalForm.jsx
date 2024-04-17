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

export default function AddSubjectModalForm(subject) {
  const {
    subjectName,
    setSubjectName,
    setSelectedTeacher,
    schedules,
    handleSaveChanges,
    addSchedule,
    removeSchedule,
    updateSchedule,
  } = useAddSubjectModal(subject);

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: subject.subject,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSaveChanges)}>
        <DialogHeader>
          <DialogTitle>Remove Schedule</DialogTitle>

          <DialogDescription className="md:max-w-[80%]">
            Click the corresponding remove button to remove a schedule.
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
                      disabled
                      {...field}
                      id="name"
                      className="col-span-3"
                      placeholder="Enter Subject Name"
                      value={subjectName}
                      onChange={(e) => {
                        field.onChange(e);
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
                      disabled={true}
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

          {schedules.map((schedule, index) => (
            <div key={index} className="mt-8 flex flex-col gap-4">
              {schedules.length > 1 && (
                <Button
                  variant="ghost"
                  className="col-span-4 text-red-600"
                  onClick={() => removeSchedule(index)}
                >
                  Remove
                </Button>
              )}

              <FormField
                control={form.control}
                name={`schedules[${index}].day`}
                render={({ field }) => (
                  <FormItem>
                    <section className="grid grid-cols-4 items-center gap-4">
                      <FormLabel
                        htmlFor={`day-${index}`}
                        className="text-right"
                      >
                        Day
                      </FormLabel>
                      <FormControl>
                        <select
                          disabled
                          {...field}
                          className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          id={`day-${index}`}
                          value={schedule.day}
                          onChange={(e) => {
                            updateSchedule(index, "day", e.target.value);
                            field.onChange(e);
                          }}
                        >
                          <option value="" disabled>
                            Select Day
                          </option>
                          <option value="Monday">Monday</option>
                          <option value="Tuesday">Tuesday</option>
                          <option value="Wednesday">Wednesday</option>
                          <option value="Thursday">Thursday</option>
                          <option value="Friday">Friday</option>
                        </select>
                      </FormControl>
                    </section>
                    <FormMessage className="text-center" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`schedules[${index}].startTime`}
                render={({ field }) => (
                  <FormItem>
                    <section className="grid grid-cols-4 items-center gap-4">
                      <FormLabel
                        htmlFor={`startTime-${index}`}
                        className="text-right"
                      >
                        Start Time
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled
                          {...field}
                          className="col-span-3"
                          id={`startTime-${index}`}
                          type="time"
                          value={schedule.startTime}
                          onChange={(e) => {
                            field.onChange(e);
                            updateSchedule(index, "startTime", e.target.value);
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
                name={`schedules[${index}].endTime`}
                render={({ field }) => (
                  <FormItem>
                    <section className="grid grid-cols-4 items-center gap-4">
                      <FormLabel
                        htmlFor={`endTime-${index}`}
                        className="text-right"
                      >
                        End Time
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled
                          {...field}
                          className="col-span-3"
                          id={`endTime-${index}`}
                          type="time"
                          value={schedule.endTime}
                          onChange={(e) => {
                            updateSchedule(index, "endTime", e.target.value);
                            field.onChange(e);
                          }}
                        />
                      </FormControl>
                    </section>
                    <FormMessage className="text-center" />
                  </FormItem>
                )}
              />
            </div>
          ))}
        </main>

        {form.formState.errors.schedules && (
          <p className="text-center text-red-500">
            {form.formState.errors.schedules.message}
          </p>
        )}

        <DialogFooter>
          <Button type="submit">Save Changes</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
