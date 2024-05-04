import React, { useEffect } from "react";
import Analytics from ".";
import Topbar from "@/components/layout/Topbar";
import { AnalyticsProvider } from "./useAnalytics";

export default function AnalyticsLayout() {
  useEffect(() => {
    const analyticsCacheInvalidationOnUnmount = () => {
      localStorage.removeItem("analyticsData");
    };

    return () => {
      analyticsCacheInvalidationOnUnmount();
    };
  }, []);

  return (
    <>
      <AnalyticsProvider>
        <main className="w-full">
          <Topbar>ANALYTICS</Topbar>

          <Analytics />
        </main>
      </AnalyticsProvider>
    </>
  );
}
