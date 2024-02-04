import { createContext, useContext } from "react";
import useAnalytics from "../hooks/useAnalytics";

const AnalyticsContext = createContext();

export const useAnalyticsContext = () => {
  return useContext(AnalyticsContext);
};

export const AnalyticsProvider = ({ children }) => {
  const { analyticsData, loading, error } = useAnalytics();

  const analyticsContextValue = {
    analyticsData,
    loading,
    error,
  };

  return (
    <AnalyticsContext.Provider value={analyticsContextValue}>
      {children}
    </AnalyticsContext.Provider>
  );
};
