import React from "react";
import * as yup from "yup";
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
import moment from "moment";

const checkOverlap = (schedules) => {
  for (let i = 0; i < schedules.length - 1; i++) {
    for (let j = i + 1; j < schedules.length; j++) {
      const schedule1 = schedules[i];
      const schedule2 = schedules[j];

      const start1 = moment(schedule1.startTime, "HH:mm");
      const end1 = moment(schedule1.endTime, "HH:mm");
      const start2 = moment(schedule2.startTime, "HH:mm");
      const end2 = moment(schedule2.endTime, "HH:mm");

      if (
        start1.isBetween(start2, end2) ||
        end1.isBetween(start2, end2) ||
        start2.isBetween(start1, end1) ||
        end2.isBetween(start1, end1)
      ) {
        const overlappingSchedule = `${schedule1.day} (${schedule1.startTime} - ${schedule1.endTime}) overlaps with ${schedule2.day} (${schedule2.startTime} - ${schedule2.endTime})`;
        return overlappingSchedule;
      }
    }
  }
  return false; // No overlapping schedules found
};

const schema = yup.object().shape({
  subjectName: yup
    .string()
    .min(2, "Subject name must be at least 2 characters")
    .max(255, "Subject name must be at most 255 characters")
    .required("Subject name is required"),
  selectedTeacher: yup.string().required("Teacher is required"),
  schedules: yup
    .array()
    .of(
      yup.object().shape({
        day: yup
          .string()
          .oneOf(
            ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "Invalid day",
          )
          .required("Day is required"),
        startTime: yup
          .string()
          .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid start time")
          .test({
            name: "start-time-validation",
            message: "Start time must be between 7am and 6pm",
            test: function (value) {
              const time = parseInt(value.split(":")[0]);
              return time >= 7 && time < 18;
            },
          })
          .required("Start time is required"),
        endTime: yup
          .string()
          .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid end time")
          .test({
            name: "end-time-validation",
            message: "End time must be between 7am and 6pm",
            test: function (value) {
              const time = parseInt(value.split(":")[0]);
              return time >= 7 && time < 18;
            },
          })
          .required("End time is required"),
      }),
    )
    .test(
      "check-overlap",
      "Oops! Looks like some schedules are overlapping. Please adjust your schedule so they don't overlap.",
      (value) => {
        return !checkOverlap(value);
      },
    ),
});

export default function AddSubjectModalForm() {
  const {
    subjectName,
    setSubjectName,
    setSelectedTeacher,
    schedules,
    handleSaveChanges,
    addSchedule,
    removeSchedule,
    updateSchedule,
  } = useAddSubjectModal();

  const form = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSaveChanges)}>
        <DialogHeader>
          <DialogTitle>Add a Subject</DialogTitle>

          <DialogDescription className="md:max-w-[80%]">
            Let's add a new subject. Fill in the details below.
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

          <Button
            variant="outline"
            type="button"
            onClick={addSchedule}
            className=""
          >
            Add another schedule
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

        <DialogFooter>
          <Button type="submit">Add subject</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
