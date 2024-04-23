import React, { useEffect, useState } from "react";
import { useClassDetails } from "../contexts/ClassDetailsContext";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import AdminScheduleSkeleton from "@/pages/Admin/AdminSchedule/index.skeleton";

const localizer = momentLocalizer(moment);

const minimumStartTime7am = new Date();
minimumStartTime7am.setHours(7, 0, 0);

const maximumEndTime6pm = new Date();
maximumEndTime6pm.setHours(18, 0, 0);

export default function ScheduleTable() {
  const classDetailsContext = useClassDetails();
  const { classDetails, loading, fetchClassDetails } = classDetailsContext;

  if (loading) {
    return <AdminScheduleSkeleton />;
  }

  const [isMobile, setIsMobile] = useState(false);

  const checkIsMobile = () => {
    const width = window.innerWidth;
    setIsMobile(width <= 768);
  };

  useEffect(() => {
    window.addEventListener("resize", checkIsMobile);
    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  const generateEvents = () => {
    const events = [];

    if (classDetails && classDetails.subjects) {
      classDetails.subjects.forEach((subject) => {
        subject.schedules.forEach((schedule) => {
          if (
            ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].includes(
              schedule.day,
            )
          ) {
            events.push({
              id: `${classDetails._id}-${subject._id}-${schedule._id}`,
              title: isMobile
                ? abbreviateSubject(subject.subjectName)
                : subject.subjectName,
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

  const abbreviateSubject = (subjectName) => {
    const words = subjectName.split(" ");
    return words.map((word) => word[0]?.toUpperCase()).join(".");
  };

  const dayFormat = (date, culture, localizer) =>
    localizer.format(date, "ddd").toUpperCase();

  return (
    <main className="p-4">
      <Calendar
        localizer={localizer}
        events={generateEvents()}
        formats={{ dayFormat }}
        min={minimumStartTime7am}
        max={maximumEndTime6pm}
        step={15}
        startAccessor="start"
        endAccessor="end"
        toolbar={false}
        views={{ work_week: true }}
        defaultView="work_week"
        titleAccessor={"title"}
      />
    </main>
  );
}
