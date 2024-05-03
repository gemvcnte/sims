import React, { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "@/utils/axios";
import { getAllAnalyticsEndpoint } from "@/config/adminEndpoints";

const AnalyticsContext = createContext();

export const useAnalyticsContext = () => {
  return useContext(AnalyticsContext);
};

const useAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await axiosInstance.get(getAllAnalyticsEndpoint);
        setAnalyticsData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  return { analyticsData, loading, error };
};

export const AnalyticsProvider = ({ children }) => {
  const { analyticsData, loading, error } = useAnalytics();

  return (
    <AnalyticsContext.Provider value={{ analyticsData, loading, error }}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export default useAnalytics;
