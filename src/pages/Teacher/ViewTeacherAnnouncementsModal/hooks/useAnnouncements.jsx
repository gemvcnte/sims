import { getTeacherAnnouncementsEndpoint } from "@/config/teacherEndpoints";
import axiosInstance from "@/utils/axios";
import { useEffect, useState } from "react";

const useAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axiosInstance(getTeacherAnnouncementsEndpoint);
        setAnnouncements(response.data.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  return { announcements, loading, error };
};

export default useAnnouncements;
