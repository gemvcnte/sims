import React, { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "@/utils/axios";
import { getDashboardAnalyticsEndpoint } from "@/config/adminEndpoints";

const DashboardAnalyticsContext = createContext();

export const useDashboardAnalyticsContext = () => {
  return useContext(DashboardAnalyticsContext);
};

const useDashboardAnalytics = () => {
  const [dashboardAnalyticsData, setDashboardAnalyticsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardAnalyticsData = async () => {
      try {
        setLoading(true);

        const response = await axiosInstance.get(getDashboardAnalyticsEndpoint);
        const data = response.data;

        localStorage.setItem("dashboardAnalyticsData", JSON.stringify(data));
        setDashboardAnalyticsData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    const storedData = localStorage.getItem("dashboardAnalyticsData");

    if (!storedData) {
      fetchDashboardAnalyticsData();
      return;
    }

    setDashboardAnalyticsData(JSON.parse(storedData));
  }, []);

  return { dashboardAnalyticsData, loading, error };
};

export const DashboardAnalyticsProvider = ({ children }) => {
  const { dashboardAnalyticsData, loading, error } = useDashboardAnalytics();

  return (
    <DashboardAnalyticsContext.Provider
      value={{ dashboardAnalyticsData, loading, error }}
    >
      {children}
    </DashboardAnalyticsContext.Provider>
  );
};

export default useDashboardAnalytics;
