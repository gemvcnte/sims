// import React, { useEffect, useState } from "react";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import { useClassDetails } from "../contexts/ClassDetailsContext";
// import AdminScheduleSkeleton from "@/pages/Admin/AdminSchedule/index.skeleton";

// const localizer = momentLocalizer(moment);

// export default function ScheduleTable() {
//   const classDetailsContext = useClassDetails();
//   const { classDetails: fetchedClassDetails, loading } = classDetailsContext;

//   const [events, setEvents] = useState([]);

//   console.log(`fetchedClassDetails`, fetchedClassDetails);

//   useEffect(() => {
//     if (!loading && fetchedClassDetails.length > 0) {
//       console.log(`fetchedClassDetails`, fetchedClassDetails);

//       console.log(
//         `   fetchedClassDetails[0].subjects`,
//         fetchedClassDetails[0].subjects,
//       );

//       const transformedEvents = transformEvents(
//         fetchedClassDetails[0].subjects,
//       );
//       setEvents(transformedEvents);
//       console.log(`transformedEvents`, transformedEvents);
//     }
//   }, [fetchedClassDetails, loading]);

//   useEffect(() => {
//     console.log(`events`, events);
//   }, [events]);

//   if (loading) {
//     return <AdminScheduleSkeleton />;
//   }

//   return (
//     <main className="p-4">
//       <Calendar
//         localizer={localizer}
//         // events={events}
//         // startAccessor="startTime"
//         // endAccessor="endTime"
//         // views={["week"]}
//         style={{ height: 500 }}
//       />
//     </main>
//   );
// }

// function transformEvents(classDetails) {
//   const events = [];

//   const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

//   classDetails.forEach((classDetail) => {
//     if (classDetail.subjects && Array.isArray(classDetail.subjects)) {
//       classDetail.subjects.forEach((subject) => {
//         if (subject.schedules && Array.isArray(subject.schedules)) {
//           subject.schedules.forEach((schedule) => {
//             const dayOfWeek = schedule.day;
//             const startTime = moment(schedule.startTime, "HH:mm");
//             const endTime = moment(schedule.endTime, "HH:mm");

//             // If the day of the week from the schedule matches one of the days in daysOfWeek
//             if (daysOfWeek.includes(dayOfWeek)) {
//               const event = {
//                 id: `${classDetail._id}-${subject._id}-${schedule._id}`,
//                 title: "test",
//                 start: startTime.toDate(),
//                 end: endTime.toDate(),
//                 // Add an extra property to store the day of the week
//                 dayOfWeek: dayOfWeek,
//               };
//               events.push(event);
//             }
//           });
//         }
//       });
//     }
//   });

//   return events;
// }

import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useClassDetails } from "../contexts/ClassDetailsContext";
import AdminScheduleSkeleton from "@/pages/Admin/AdminSchedule/index.skeleton";

const localizer = momentLocalizer(moment);

const minTime = new Date();
minTime.setHours(7, 0, 0); // Minimum time set to 7am

const maxTime = new Date();
maxTime.setHours(18, 0, 0); // Maximum time set to 6pm

const ScheduleTable = () => {
  const classDetailsContext = useClassDetails();
  const { classDetails: fetchedClassDetails, loading } = classDetailsContext;

  // State to track device width
  const [isMobile, setIsMobile] = useState(false);

  // Function to check if the device width is less than or equal to a certain threshold
  const checkIsMobile = () => {
    const width = window.innerWidth;
    setIsMobile(width <= 768); // Adjust threshold as needed
  };

  useEffect(() => {
    // Add event listener on component mount to check device width
    window.addEventListener("resize", checkIsMobile);
    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  if (loading) {
    return <AdminScheduleSkeleton />;
  }

  // Function to generate events dynamically for all Mondays and Fridays
  const generateEvents = () => {
    const events = [];
    const firstClassDetail = fetchedClassDetails[0]; // Get the first class detail

    // Check if the first class detail exists and has subjects
    if (firstClassDetail && firstClassDetail.subjects) {
      // Loop through subjects array of the first class detail
      firstClassDetail.subjects.forEach((subject) => {
        // Loop through schedules array for each subject
        subject.schedules.forEach((schedule) => {
          // Check if the schedule day is Monday, Tuesday, Wednesday, Thursday, or Friday
          if (
            ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].includes(
              schedule.day,
            )
          ) {
            // Push event for the subject with appropriate start and end times
            events.push({
              id: `${firstClassDetail._id}-${subject._id}-${schedule._id}`,
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

  // Function to abbreviate subject title
  const abbreviateSubject = (subjectName) => {
    // Split subject name by space
    const words = subjectName.split(" ");
    // Take the first character of each word and join them
    return words.map((word) => word[0]?.toUpperCase()).join(".");
  };

  const dayFormat = (date, culture, localizer) =>
    localizer.format(date, "ddd").toUpperCase();

  return (
    <div className="p-4">
      <Calendar
        localizer={localizer}
        events={generateEvents()}
        formats={{ dayFormat }}
        min={minTime} // Set minimum time
        max={maxTime} // Set maximum time
        step={15} // Interval between time slots
        startAccessor="start" // Start time accessor
        endAccessor="end" // End time accessor
        toolbar={false} // Hide the toolbar
        views={{ work_week: true }} // Show only the work_week view
        defaultView="work_week" // Default view set to work_week
        // view="work_week" // Default view set to work_week
        // Conditionally set title accessor based on device width
        titleAccessor={isMobile ? "title" : undefined}
      />
    </div>
  );
};

export default ScheduleTable;
