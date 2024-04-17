import * as yup from "yup";
import { checkOverlap } from "./checkOverlap";

export const schema = yup.object().shape({
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
            message: "End time must be greater than start time",
            test: function (value, { parent }) {
              const startTime = parent.startTime;
              // Parse time strings into Date objects for comparison
              const startTimeObj = new Date(`2000-01-01T${startTime}`);
              const endTimeObj = new Date(`2000-01-01T${value}`);
              // Compare the parsed times
              return endTimeObj > startTimeObj;
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
