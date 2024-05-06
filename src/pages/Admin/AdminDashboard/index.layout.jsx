import React, { useEffect } from "react";
import { DashboardAnalyticsProvider } from "./hooks/useDashboardAnalytics";

export default function AdminDashboardLayout({ children }) {
  useEffect(() => {
    const analyticsCacheInvalidationOnUnmount = () => {
      localStorage.removeItem("dashboardAnalyticsData");
    };

    return () => {
      analyticsCacheInvalidationOnUnmount();
    };
  }, []);

  return (
    <>
      <DashboardAnalyticsProvider>{children}</DashboardAnalyticsProvider>
    </>
  );
}
