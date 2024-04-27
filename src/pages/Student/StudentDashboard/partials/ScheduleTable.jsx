import React, { useEffect, useState } from "react";

import { useClassDetails } from "../contexts/ClassDetailsContext";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const minimumStartTime7am = new Date();
minimumStartTime7am.setHours(7, 0, 0);

const maximumEndTime6pm = new Date();
maximumEndTime6pm.setHours(18, 0, 0);

export default function ScheduleTable() {
  const classDetailsContext = useClassDetails();
  const { classDetails: fetchedClass, loading } = classDetailsContext;

  useEffect(() => {
    const styleElement = document.createElement("style");
    styleElement.textContent = ".rbc-time-header { display: none; }";
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  if (loading) {
    return (
      <main className="order-2 min-w-[60%]">
        <Skeleton className="h-[100svh]"></Skeleton>
      </main>
    );
  }

  const generateEvents = () => {
    const events = [];
    let firstClassDetails;

    if (fetchedClass && fetchedClass.length > 0) {
      const sortedClasses = [...fetchedClass].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );
      firstClassDetails = sortedClasses[0];
    }

    if (firstClassDetails && firstClassDetails.subjects) {
      firstClassDetails.subjects.forEach((subject) => {
        subject.schedules.forEach((schedule) => {
          if (
            ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].includes(
              schedule.day,
            )
          ) {
            events.push({
              id: `${firstClassDetails._id}-${subject._id}-${schedule._id}`,
              title: subject.subjectName,
              start: moment()
                .day(schedule.day)
                .hour(Number(schedule.startTime.split(":")[0]))
                .minute(Number(schedule.startTime.split(":")[1]))
                .toDate(),
              end: moment()
                .day(schedule.day)
                .hour(Number(schedule.endTime.split(":")[0]))
                .minute(Number(schedule.endTime.split(":")[1]))
                .toDate(),
              allDay: false,
            });
          }
        });
      });
    }

    return events;
  };

  return (
    <main className="order-2 min-w-[60%]">
      <Calendar
        localizer={localizer}
        events={generateEvents()}
        min={minimumStartTime7am}
        max={maximumEndTime6pm}
        step={15}
        startAccessor="start"
        endAccessor="end"
        toolbar={false}
        views={{ work_week: true, day: true }}
        defaultView="day"
        titleAccessor={"title"}
      />
    </main>
  );
}
