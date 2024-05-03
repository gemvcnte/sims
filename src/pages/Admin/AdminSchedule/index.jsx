// AdminSchedule.js
import React, { useEffect, useState } from "react";
import { useAdminSchedule } from "./useAdminSchedule";
import AdminScheduleSkeleton from "./index.skeleton";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import generatePDF, { Resolution, Margin } from "react-to-pdf";

const localizer = momentLocalizer(moment);

const minimumStartTime7am = new Date();
minimumStartTime7am.setHours(7, 0, 0);

const maximumEndTime6pm = new Date();
maximumEndTime6pm.setHours(18, 0, 0);

export default function AdminSchedule() {
  const { schedule, loading } = useAdminSchedule();
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

  if (loading) {
    return <AdminScheduleSkeleton />;
  }

  const generateEvents = () => {
    const events = [];

    for (const dayOfWeek in schedule) {
      if (Object.hasOwnProperty.call(schedule, dayOfWeek)) {
        const daySchedule = schedule[dayOfWeek];
        daySchedule.forEach((classItem) => {
          events.push({
            id: `${classItem.class}-${classItem.subject}-${classItem.startTime}-${classItem.endTime}`,
            title: isMobile
              ? `${abbreviateSubject(classItem.subject)}`
              : `${classItem.subject} - ${classItem.class.toUpperCase()}`,
            start: moment()
              .day(dayOfWeek)
              .hour(Number(classItem.startTime.split(":")[0]))
              .minute(Number(classItem.startTime.split(":")[1]))
              .toDate(),
            end: moment()
              .day(dayOfWeek)
              .hour(Number(classItem.endTime.split(":")[0]))
              .minute(Number(classItem.endTime.split(":")[1]))
              .toDate(),
            allDay: false,
          });
        });
      }
    }

    return events;
  };

  const abbreviateSubject = (subjectName) => {
    const words = subjectName.split(" ");
    return words.map((word) => word[0]?.toUpperCase()).join(".");
  };

  const dayFormat = (date, culture, localizer) =>
    localizer.format(date, "ddd").toUpperCase();

  const options = {
    method: "open",
    resolution: Resolution.LOW,
    page: {
      margin: Margin.SMALL,
      format: "letter",
      orientation: "portrait",
    },
    canvas: {
      mimeType: "image/jpeg",
      qualityRatio: 1,
    },
    overrides: {
      pdf: {
        compress: true,
      },
    },
  };

  const getTargetElement = () => document.getElementById("admin-schedule");

  return (
    <>
      <header className="flex justify-between gap-2 px-4 pt-4">
        <div></div>

        <Button
          variant="outline"
          onClick={() => generatePDF(getTargetElement, options)}
        >
          <Download className="h-4 w-4" />{" "}
          <span className="hidden sm:ml-[1ch] sm:inline-block">Export</span>{" "}
          <span className="hidden sm:ml-[1ch] sm:inline-block"> PDF</span>{" "}
        </Button>
      </header>

      <main className="p-4" id="admin-schedule">
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
    </>
  );
}
