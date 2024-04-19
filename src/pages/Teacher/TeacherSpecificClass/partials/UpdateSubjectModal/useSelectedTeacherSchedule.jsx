import React, { useEffect, useState } from "react";
import axiosInstance from "@/utils/axios";
import { getScheduleEndpoint } from "@/config/adminEndpoints";

export const useSelectedTeacherSchedule = (subjectTeacher) => {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await axiosInstance.get(
          `${getScheduleEndpoint}/${subjectTeacher}`,
        );
        setSchedule(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [subjectTeacher]);

  return { schedule, loading, error };
};
