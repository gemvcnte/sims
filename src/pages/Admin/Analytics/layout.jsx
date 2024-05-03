import React from "react";
import Analytics from ".";
import Topbar from "@/components/layout/Topbar";
import { AnalyticsProvider } from "./useAnalytics";

export default function AnalyticsLayout() {
  return (
    <>
      <AnalyticsProvider>
        <main className="w-full ">
          <Topbar>ANALYTICS</Topbar>

          <Analytics />
        </main>
      </AnalyticsProvider>
    </>
  );
}
