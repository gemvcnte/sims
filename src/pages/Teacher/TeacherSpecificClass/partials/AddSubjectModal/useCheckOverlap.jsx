import moment from "moment";
import { useClassDetails } from "../../contexts/ClassDetailsContext";
import { useSelectedTeacherSchedule } from "./useSelectedTeacherSchedule";
import SonnerShowErrorNotification from "@/utils/SonnerShowErrorNotification";

export const useCheckOverlap = (selectedTeacher) => {
  const { classDetails } = useClassDetails();
  const { schedule: selectedTeacherScheduleResult } =
    useSelectedTeacherSchedule(selectedTeacher);

  const selectedTeacherSchedule = Array.isArray(selectedTeacherScheduleResult)
    ? selectedTeacherScheduleResult
    : [];

  const schedulesFromDb = classDetails.subjects.reduce((acc, subject) => {
    subject.schedules.forEach((schedule) => {
      acc.push({
        day: schedule.day,
        startTime: schedule.startTime,
        endTime: schedule.endTime,
        subjectId: schedule.subjectId,
      });
    });
    return acc;
  }, []);

  const checkOverlap = (schedules) => {
    const checkOverlapWithinNewSchedules = (newSchedules) => {
      for (let i = 0; i < newSchedules.length - 1; i++) {
        for (let j = i + 1; j < newSchedules.length; j++) {
          const schedule1 = newSchedules[i];
          const schedule2 = newSchedules[j];

          const start1 = moment(schedule1.startTime, "HH:mm");
          const end1 = moment(schedule1.endTime, "HH:mm");
          const start2 = moment(schedule2.startTime, "HH:mm");
          const end2 = moment(schedule2.endTime, "HH:mm");

          const isSameDay = schedule1.day === schedule2.day;

          if (!isSameDay) {
            continue;
          }

          // Check for exact same schedule
          if (
            schedule1.startTime === schedule2.startTime &&
            schedule1.endTime === schedule2.endTime
          ) {
            const overlappingSchedule = `${schedule1.day} (${schedule1.startTime} - ${schedule1.endTime}) is the same as ${schedule2.day} (${schedule2.startTime} - ${schedule2.endTime})`;
            SonnerShowErrorNotification(overlappingSchedule);
            return overlappingSchedule;
          }

          // Check for overlapping schedules
          if (
            start1.isBetween(start2, end2) ||
            end1.isBetween(start2, end2) ||
            start2.isBetween(start1, end1) ||
            end2.isBetween(start1, end1)
          ) {
            const overlappingSchedule = `${schedule1.day} (${schedule1.startTime} - ${schedule1.endTime}) overlaps with ${schedule2.day} (${schedule2.startTime} - ${schedule2.endTime})`;
            SonnerShowErrorNotification(overlappingSchedule);
            return overlappingSchedule;
          }
        }
      }
      return false;
    };

    const checkOverlapWithSchedulesFromDb = (newSchedules) => {
      const newSchedulesWithSchedulesFromDb = [
        ...newSchedules,
        ...schedulesFromDb,
      ];

      for (let i = 0; i < newSchedulesWithSchedulesFromDb.length - 1; i++) {
        for (let j = i + 1; j < newSchedulesWithSchedulesFromDb.length; j++) {
          const schedule1 = newSchedulesWithSchedulesFromDb[i];
          const schedule2 = newSchedulesWithSchedulesFromDb[j];

          const start1 = moment(schedule1.startTime, "HH:mm");
          const end1 = moment(schedule1.endTime, "HH:mm");
          const start2 = moment(schedule2.startTime, "HH:mm");
          const end2 = moment(schedule2.endTime, "HH:mm");

          const isSameDay = schedule1.day === schedule2.day;

          if (!isSameDay) {
            continue;
          }

          // Check for exact same schedule
          if (
            schedule1.startTime === schedule2.startTime &&
            schedule1.endTime === schedule2.endTime
          ) {
            const overlappingSchedule = `${schedule1.day} (${schedule1.startTime} - ${schedule1.endTime}) is the same as ${schedule2.day} (${schedule2.startTime} - ${schedule2.endTime}) from existing class schedule`;
            SonnerShowErrorNotification(overlappingSchedule);
            return overlappingSchedule;
          }

          // Check for overlapping schedules
          if (
            start1.isBetween(start2, end2) ||
            end1.isBetween(start2, end2) ||
            start2.isBetween(start1, end1) ||
            end2.isBetween(start1, end1)
          ) {
            const overlappingSchedule = `${schedule1.day} (${schedule1.startTime} - ${schedule1.endTime}) overlaps with ${schedule2.day} (${schedule2.startTime} - ${schedule2.endTime}) from existing class schedule`;
            SonnerShowErrorNotification(overlappingSchedule);
            return overlappingSchedule;
          }
        }
      }
      return false;
    };

    const checkOverlapWithSelectedTeacherSchedule = (newSchedules) => {
      const newSchedulesWithTeacherSchedules = [
        ...newSchedules,
        ...selectedTeacherSchedule,
      ];

      for (let i = 0; i < newSchedulesWithTeacherSchedules.length - 1; i++) {
        for (let j = i + 1; j < newSchedulesWithTeacherSchedules.length; j++) {
          const schedule1 = newSchedulesWithTeacherSchedules[i];
          const schedule2 = newSchedulesWithTeacherSchedules[j];

          const start1 = moment(schedule1.startTime, "HH:mm");
          const end1 = moment(schedule1.endTime, "HH:mm");
          const start2 = moment(schedule2.startTime, "HH:mm");
          const end2 = moment(schedule2.endTime, "HH:mm");

          const isSameDay = schedule1.day === schedule2.day;

          if (!isSameDay) {
            continue;
          }

          // Check for exact same schedule
          if (
            schedule1.startTime === schedule2.startTime &&
            schedule1.endTime === schedule2.endTime
          ) {
            const overlappingSchedule = `${schedule1.day} (${schedule1.startTime} - ${schedule1.endTime}) is the same as ${schedule2.day} (${schedule2.startTime} - ${schedule2.endTime}) from the subject teacher's schedule`;
            SonnerShowErrorNotification(overlappingSchedule);
            return overlappingSchedule;
          }

          // Check for overlapping schedules
          if (
            start1.isBetween(start2, end2) ||
            end1.isBetween(start2, end2) ||
            start2.isBetween(start1, end1) ||
            end2.isBetween(start1, end1)
          ) {
            const overlappingSchedule = `${schedule1.day} (${schedule1.startTime} - ${schedule1.endTime}) overlaps with ${schedule2.day} (${schedule2.startTime} - ${schedule2.endTime}) from the subject teacher's schedule`;
            SonnerShowErrorNotification(overlappingSchedule);
            return overlappingSchedule;
          }
        }
      }
      return false;
    };

    const overlapWithinNewSchedules = checkOverlapWithinNewSchedules(schedules);
    if (overlapWithinNewSchedules) {
      return overlapWithinNewSchedules;
    }

    const overlapWithSchedulesFromDb =
      checkOverlapWithSchedulesFromDb(schedules);
    if (overlapWithSchedulesFromDb) {
      return overlapWithSchedulesFromDb;
    }

    const overlapWithSelectedTeacherSchedule =
      checkOverlapWithSelectedTeacherSchedule(schedules);
    if (overlapWithSelectedTeacherSchedule) {
      return overlapWithSelectedTeacherSchedule;
    }

    return false;
  };

  return { checkOverlap };
};
