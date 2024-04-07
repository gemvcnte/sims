// useAdminSchedule.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "@/utils/axios";
import { getScheduleEndpoint } from "@/config/adminEndpoints";

const AdminScheduleContext = createContext();

export const AdminScheduleProvider = ({ children }) => {
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSchedule = async () => {
    try {
      const response = await axiosInstance.get(getScheduleEndpoint);

      setSchedule(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

  return (
    <AdminScheduleContext.Provider value={{ schedule, loading, error }}>
      {children}
    </AdminScheduleContext.Provider>
  );
};

export const useAdminSchedule = () => {
  const context = useContext(AdminScheduleContext);
  if (!context) {
    throw new Error(
      "useAdminSchedule must be used within a AdminScheduleProvider",
    );
  }
  return context;
};
