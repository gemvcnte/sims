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
import { Skeleton } from "@/components/ui/skeleton";
import AdminScheduleSkeleton from "@/pages/Admin/AdminSchedule/index.skeleton";

export default function ScheduleTable() {
  const classDetailsContext = useClassDetails();
  const { classDetails: fetchedClass, loading } = classDetailsContext;

  const [classDetails, setClassDetails] = useState(null);

  useEffect(() => {
    if (fetchedClass && fetchedClass.length > 0) {
      // Sort classes by createdAt in descending order
      const sortedClasses = [...fetchedClass].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );
      // Take the most lastest class
      setClassDetails(sortedClasses[0]);
    }
  }, [fetchedClass]);

  if (loading) {
    return <AdminScheduleSkeleton />;
  }

  return (
    <main className="p-4">
      <Table>
        {!classDetails && (
          <TableCaption className="pb-6 pt-4">No Schedule Found</TableCaption>
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
  //   return `${formattedHours}:${minutes} ${period}`;
  return `${formattedHours}:${minutes}`;
}
