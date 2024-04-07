// AdminSchedule.js
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAdminSchedule } from "./useAdminSchedule";

export default function AdminSchedule() {
  const { schedule, loading } = useAdminSchedule();

  if (loading) {
    return <p>loading..</p>;
  }

  return (
    <main className="p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell></TableCell>
            <TableCell className="text-center">Monday</TableCell>
            <TableCell className="text-center">Tuesday</TableCell>
            <TableCell className="text-center">Wednesday</TableCell>
            <TableCell className="text-center">Thursday</TableCell>
            <TableCell className="text-center">Friday</TableCell>
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
                (day) => (
                  <TableCell className="text-center" key={`${day}-${hour}`}>
                    {schedule[day]?.map((subject) => {
                      const startTime = subject.startTime.replace(/^0/, "");
                      const endTime = subject.endTime.replace(/^0/, "");
                      if (
                        parseInt(startTime.split(":")[0]) <= hour &&
                        parseInt(endTime.split(":")[0]) > hour
                      ) {
                        return (
                          <div key={subject.subject}>
                            <p>{subject.subject}</p>
                            <p>
                              {convertTo12HourFormat(startTime)} -{" "}
                              {convertTo12HourFormat(endTime)}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </TableCell>
                ),
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}

function convertTo12HourFormat(time) {
  const [hours, minutes] = time.split(":");
  const period = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  return `${formattedHours}:${minutes} ${period}`;
}
