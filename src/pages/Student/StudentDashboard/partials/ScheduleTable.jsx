import React, { useEffect, useState } from "react";
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

export default function ScheduleTable() {
  const classDetailsContext = useClassDetails();
  const { classDetails: fetchedClass, loading } = classDetailsContext;

  const [classDetails, setClassDetails] = useState(null);

  useEffect(() => {
    if (fetchedClass && fetchedClass.length > 0) {
      const sortedClasses = [...fetchedClass].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );
      setClassDetails(sortedClasses[0]);
    }
  }, [fetchedClass]);

  if (loading) {
    return <main className="order-2 min-w-[60%]">loading schedule...</main>;
  }

  const currentDay = new Date().toLocaleString("en-us", { weekday: "long" });

  return (
    <main className="order-2 min-w-[60%]">
      <Table>
        {!classDetails && (
          <TableCaption className="pb-6 pt-4">No Schedule Found</TableCaption>
        )}
        <TableHeader>
          <TableRow>
            {classDetails && <TableHead></TableHead>}
            <TableHead className="text-center">{currentDay}</TableHead>
          </TableRow>
        </TableHeader>
        {classDetails && (
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
                <TableCell
                  className="text-center"
                  key={`${currentDay}-${hour}`}
                >
                  {classDetails.subjects.map((subject) => {
                    const subjectSchedule = subject.schedules.find(
                      (schedule) =>
                        schedule.day === currentDay &&
                        parseInt(schedule.startTime.split(":")[0]) === hour,
                    );
                    return subjectSchedule ? (
                      <div key={subject._id}>
                        <p>{subject.subjectName}</p>
                        <p>
                          {convertTo12HourFormat(
                            subjectSchedule.startTime.replace(/^0/, ""),
                          )}{" "}
                          <br className="sm:hidden" />-
                          <br className="sm:hidden" />{" "}
                          {convertTo12HourFormat(
                            subjectSchedule.endTime.replace(/^0/, ""),
                          )}
                        </p>
                      </div>
                    ) : null;
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
        <TableFooter></TableFooter>
      </Table>
    </main>
  );
}

function convertTo12HourFormat(time) {
  const [hours, minutes] = time.split(":");
  const period = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  return `${formattedHours}:${minutes}`;
}
