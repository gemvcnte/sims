import React from "react";
import Topbar from "@/components/layout/Topbar";
import DashboardAnnouncementCard from "./partials/DashboardAnnouncementCard";
import ProfileProgressCard from "./partials/ProfileProgressCard";
import { useAdminProfile } from "../AdminProfile/components/AdminProfileDisplayAndEditSection/hooks";
import { useTeacherAdminMode } from "@/hooks/useTeacherAdminMode";
import AdminDashboardLayout from "./index.layout";
import useDashboardAnalytics from "./hooks/useDashboardAnalytics";

export default function AdminDashboard() {
  const { dashboardAnalyticsData, loading, error } = useDashboardAnalytics();
  const { isAdminMode } = useTeacherAdminMode();

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <AdminDashboardLayout>
      <main className="w-full">
        <Topbar>DASHBOARD</Topbar>

        {isAdminMode ? (
          <section className="p-4">
            <p>{dashboardAnalyticsData.totalStudents}</p>
          </section>
        ) : null}

        <section className="flex flex-col gap-4 p-4 md:flex-row">
          <ProfileProgressCard />
          <DashboardAnnouncementCard />
        </section>
      </main>
    </AdminDashboardLayout>
  );
}
