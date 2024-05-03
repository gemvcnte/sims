import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useClassDetails } from "../contexts/ClassDetailsContext";
import AdminScheduleSkeleton from "@/pages/Admin/AdminSchedule/index.skeleton";
import { Button } from "@/components/ui/button";
import generatePDF, { Resolution, Margin } from "react-to-pdf";
import FilterSchedule from "./FilterSchedule";
import { Download } from "lucide-react";
import useIsMobile from "@/hooks/useIsMobile";

const localizer = momentLocalizer(moment);

const minTimeSevenAm = new Date();
minTimeSevenAm.setHours(7, 0, 0);

const maxTimeSixPm = new Date();
maxTimeSixPm.setHours(18, 0, 0);

const ScheduleTable = () => {
  const classDetailsContext = useClassDetails();
  const { classDetails: fetchedClassDetails, loading } = classDetailsContext;

  const isMobile = useIsMobile();

  if (loading) {
    return <AdminScheduleSkeleton />;
  }

  const generateEvents = () => {
    const generatedEvents = [];
    const firstFetchedClassDetail =
      fetchedClassDetails && fetchedClassDetails[0];

    if (
      !firstFetchedClassDetail ||
      !Array.isArray(firstFetchedClassDetail.subjects)
    ) {
      return generatedEvents;
    }

    const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

    firstFetchedClassDetail.subjects.forEach((subject) => {
      if (!subject || !Array.isArray(subject.schedules)) {
        return;
      }

      subject.schedules.forEach((schedule) => {
        const { day: scheduleDay, startTime, endTime } = schedule || {};

        if (!weekdays.includes(scheduleDay)) {
          return;
        }

        const eventStartTime = calculateEventTime(scheduleDay, startTime);
        const eventEndTime = calculateEventTime(scheduleDay, endTime);

        generatedEvents.push({
          id: generateEventId(firstFetchedClassDetail, subject, schedule),
          title: isMobile
            ? abbreviateSubject(subject.subjectName)
            : subject.subjectName,
          start: eventStartTime,
          end: eventEndTime,
          allDay: false,
        });
      });
    });

    return generatedEvents;
  };

  const calculateEventTime = (day, timeString) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    return moment().day(day).hour(hours).minute(minutes).toDate();
  };

  const generateEventId = (classDetail, subject, schedule) => {
    return `${classDetail._id}-${subject._id}-${schedule._id}`;
  };

  const abbreviateSubject = (subjectFullName) => {
    const wordsInFullName = subjectFullName.split(" ");
    const abbreviatedLetters = wordsInFullName.map((word) =>
      word[0]?.toUpperCase(),
    );
    const abbreviatedSubject = abbreviatedLetters.join(".");
    return abbreviatedSubject;
  };

  const dayFormat = (date, culture, localizer) =>
    localizer.format(date, "ddd").toUpperCase();

  const options = {
    method: "open",
    resolution: Resolution.LOW,
    page: {
      margin: Margin.SMALL,
      format: "letter",
      orientation: "landscape",
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

  const getTargetElement = () => document.getElementById("content-id");

  return (
    <>
      <FilterSchedule>
        <Button
          variant="outline"
          onClick={() => generatePDF(getTargetElement, options)}
        >
          <Download className="h-4 w-4" />{" "}
          <span className="hidden sm:ml-[1ch] sm:inline-block">Export</span>{" "}
          <span className="hidden sm:ml-[1ch] sm:inline-block"> PDF</span>{" "}
        </Button>
      </FilterSchedule>

      <div className="p-4" id="content-id">
        <Calendar
          localizer={localizer}
          events={generateEvents()}
          formats={{ dayFormat }}
          min={minTimeSevenAm}
          max={maxTimeSixPm}
          step={15} // Interval between time slots
          startAccessor="start" // Start time accessor
          endAccessor="end" // End time accessor
          toolbar={false} // Hide the toolbar
          views={{ work_week: true }} // Show only the work_week view
          defaultView="work_week" // Default view set to work_week
          titleAccessor={isMobile ? "title" : undefined}
        />
      </div>
    </>
  );
};

export default ScheduleTable;
