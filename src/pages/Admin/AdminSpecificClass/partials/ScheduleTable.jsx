import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useClassDetails } from "../contexts/ClassDetailsContext";
import AddSubjectModal from "./AddSubjectModal";
import UpdateSubjectModal from "./UpdateSubjectModal";
import { Icon } from "@iconify/react";
import { DeleteSubjectModal } from "./DeleteSubjectModal";

export default function ScheduleTable() {
  const classDetailsContext = useClassDetails();
  const { classDetails, loading, fetchClassDetails } = classDetailsContext;

  return (
    <main className="p-4">
      <Table>
        {classDetails.subjects.length === 0 && (
          <TableCaption className="pb-4">No Subjects Found</TableCaption>
        )}
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead className="text-center">Monday</TableHead>
            <TableHead className="text-center">Tuesday</TableHead>
            <TableHead className="text-center">Wednesday</TableHead>
            <TableHead className="text-center">Thursday</TableHead>
            <TableHead className="text-center">Friday</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 12 }, (_, index) => index + 7).map((hour) => (
            <TableRow key={hour}>
              <TableCell className="font-medium">
                {hour < 12
                  ? `${hour === 0 ? 12 : hour}:00 AM`
                  : hour === 12
                    ? `12:00 PM`
                    : `${hour - 12}:00 PM`}
              </TableCell>
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
                (day) => {
                  const subjectForDayAndHour = classDetails.subjects.find(
                    (subject) => {
                      const subjectSchedule = subject.schedules.find(
                        (schedule) =>
                          schedule.day === day &&
                          parseInt(schedule.startTime.split(":")[0]) === hour,
                      );
                      return subjectSchedule;
                    },
                  );

                  return (
                    <TableCell className="text-center" key={`${day}-${hour}`}>
                      {subjectForDayAndHour ? (
                        <div>
                          <p>{subjectForDayAndHour.subjectName}</p>
                          <p>
                            {convertTo12HourFormat(
                              subjectForDayAndHour.schedules
                                .find(
                                  (schedule) =>
                                    schedule.day === day &&
                                    parseInt(
                                      schedule.startTime.split(":")[0],
                                    ) === hour,
                                )
                                .startTime.replace(/^0/, ""),
                            )}{" "}
                            <br className="sm:hidden" />-
                            <br className="sm:hidden" />{" "}
                            {convertTo12HourFormat(
                              subjectForDayAndHour.schedules
                                .find(
                                  (schedule) =>
                                    schedule.day === day &&
                                    parseInt(
                                      schedule.startTime.split(":")[0],
                                    ) === hour,
                                )
                                .endTime.replace(/^0/, ""),
                            )}
                          </p>
                        </div>
                      ) : (
                        ""
                      )}
                    </TableCell>
                  );
                },
              )}
            </TableRow>
          ))}
        </TableBody>

        <TableFooter></TableFooter>
      </Table>
    </main>
  );
}

function convertTo12HourFormat(time) {
  const [hours, minutes] = time.split(":");
  const period = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  //   return `${formattedHours}:${minutes} ${period}`;
  return `${formattedHours}:${minutes}`;
}