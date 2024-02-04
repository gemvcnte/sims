import { getAllAnalyticsEndpoint } from "@/config/adminEndpoints";
import axiosInstance from "@/utils/axios";
import { useEffect, useState } from "react";

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

export default useAnalytics;
