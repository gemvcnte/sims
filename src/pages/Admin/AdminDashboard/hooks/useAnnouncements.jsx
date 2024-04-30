import React, { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "@/utils/axios";
import { getTeacherAnnouncementsEndpoint } from "@/config/teacherEndpoints";

const AnnouncementsContext = createContext();

export const useAnnouncementsContext = () => useContext(AnnouncementsContext);

export const AnnouncementsProvider = ({ children }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAnnouncements = async () => {
    try {
      const response = await axiosInstance(getTeacherAnnouncementsEndpoint);
      localStorage.setItem("announcements", JSON.stringify(response.data.data));
      setAnnouncements(response.data.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const refetchAnnouncements = () => {
    fetchAnnouncements();
  };

  return (
    <AnnouncementsContext.Provider
      value={{ announcements, loading, error, refetchAnnouncements }}
    >
      {children}
    </AnnouncementsContext.Provider>
  );
};
