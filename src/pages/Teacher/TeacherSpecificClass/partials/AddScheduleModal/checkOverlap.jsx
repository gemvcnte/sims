import showErrorNotification from "@/utils/ShowErrorNotification";
import moment from "moment";

export const checkOverlap = (schedules) => {
  for (let i = 0; i < schedules.length - 1; i++) {
    for (let j = i + 1; j < schedules.length; j++) {
      const schedule1 = schedules[i];
      const schedule2 = schedules[j];

      // Convert start and end times to moment objects
      const start1 = moment(schedule1.startTime, "HH:mm");
      const end1 = moment(schedule1.endTime, "HH:mm");
      const start2 = moment(schedule2.startTime, "HH:mm");
      const end2 = moment(schedule2.endTime, "HH:mm");

      // Check if the schedules are on different days
      if (schedule1.day !== schedule2.day) {
        continue; // Skip if schedules are on different days
      }

      // Check for exact same schedule
      if (
        schedule1.startTime === schedule2.startTime &&
        schedule1.endTime === schedule2.endTime
      ) {
        // If schedules are exactly the same, return the overlapping schedule message
        const overlappingSchedule = `${schedule1.day} (${schedule1.startTime} - ${schedule1.endTime}) is the same as ${schedule2.day} (${schedule2.startTime} - ${schedule2.endTime})`;
        showErrorNotification(overlappingSchedule);
        return overlappingSchedule;
      }

      // Check for overlap within the same day
      if (
        start1.isBetween(start2, end2) ||
        end1.isBetween(start2, end2) ||
        start2.isBetween(start1, end1) ||
        end2.isBetween(start1, end1)
      ) {
        // If overlap found, construct and return the overlapping schedule message
        const overlappingSchedule = `${schedule1.day} (${schedule1.startTime} - ${schedule1.endTime}) overlaps with ${schedule2.day} (${schedule2.startTime} - ${schedule2.endTime})`;
        showErrorNotification(overlappingSchedule);
        return overlappingSchedule;
      }
    }
  }
  return false;
};
