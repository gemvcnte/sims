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
import { BadgePlus } from "lucide-react";

export default function AddSubjectModalForm() {
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
  } = useAddSubjectModal();

  const { checkOverlap } = useCheckOverlap(selectedTeacher);

  const form = useForm({
    resolver: yupResolver(schema(checkOverlap)),
  });

  const scrollToEmptyDiv = () => {
    setTimeout(() => {
      const emptyDiv = document.getElementById("scrollHere");
      if (emptyDiv) {
        emptyDiv.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const isOnUatEnvironment = import.meta.env.VITE_ENVIRONMENT === "uat";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSaveChanges)}>
        <SheetHeader>
          <SheetTitle>Add a New Subject</SheetTitle>

          <SheetDescription className="md:max-w-[80%]">
            Let's add a new subject. Fill in the details below.
          </SheetDescription>
        </SheetHeader>

        <main className="my-4 grid h-[60svh] gap-4 overflow-y-auto py-4">
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
              {/* {schedules.length > 1 && (
                <Button
                  variant="text"
                  className="col-span-4 text-red-600"
                  onClick={() => removeSchedule(index)}
                >
                  Remove
                </Button>
              )} */}

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
                          {...field}
                          className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          id={`day-${index}`}
                          value={schedule.day}
                          onChange={(e) => {
                            updateSchedule(index, "day", e.target.value);
                            field.onChange(e); // This should be sufficient for controlled inputs
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
                          {...field}
                          className="col-span-3"
                          id={`startTime-${index}`}
                          type="time"
                          value={schedule.startTime}
                          onChange={(e) => {
                            field.onChange(e); // This should be sufficient for controlled inputs
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
                          {...field}
                          className="col-span-3"
                          id={`endTime-${index}`}
                          type="time"
                          value={schedule.endTime}
                          onChange={(e) => {
                            updateSchedule(index, "endTime", e.target.value);
                            field.onChange(e); // This should be sufficient for controlled inputs
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

          <div id="scrollHere"></div>

          <Button
            variant="outline"
            type="button"
            // onClick={addSchedule}
            onClick={() => {
              addSchedule();
              scrollToEmptyDiv();
            }}
            className=""
          >
            <BadgePlus className="mr-2 h-4 w-4" /> Add another schedule
          </Button>
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

        <SheetFooter className="mt-4">
          <Button type="submit" disabled={loading}>
            Add subject
          </Button>
        </SheetFooter>
      </form>
    </Form>
  );
}
