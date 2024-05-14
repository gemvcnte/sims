import React from "react";
import Topbar from "@/components/layout/Topbar";
import DashboardAnnouncementCard from "./partials/DashboardAnnouncementCard";
import ProfileProgressCard from "./partials/ProfileProgressCard";
import { useTeacherAdminMode } from "@/hooks/useTeacherAdminMode";
import AdminDashboardLayout from "./index.layout";
import TotalStudentsCard from "./partials/TotalStudentsCard";
import TotalSectionsCard from "./partials/TotalSectionsCard";
import TotalPendingEnrollmentApplicationsCard from "./partials/TotalPendingEnrollmentApplicationsCard";

export default function AdminDashboard() {
  const { isAdminMode } = useTeacherAdminMode();

  const isOnUatEnvironment = import.meta.env.VITE_ENVIRONMENT === "uat";

  return (
    <AdminDashboardLayout>
      <main className="w-full">
        <Topbar>DASHBOARD</Topbar>

        <div className="flex flex-col gap-0">
          {isAdminMode ? (
            <main className="order-2 flex w-full flex-col gap-4 p-4 pb-0 pt-0 sm:order-1 sm:flex-row sm:pt-4">
              <TotalStudentsCard />
              <TotalPendingEnrollmentApplicationsCard />
              <TotalSectionsCard />
            </main>
          ) : null}
          <section className="order-1 flex flex-col gap-4 p-4 sm:order-2 md:flex-row">
            {!isOnUatEnvironment ? <ProfileProgressCard /> : null}
            <DashboardAnnouncementCard />
          </section>
        </div>
      </main>
    </AdminDashboardLayout>
  );
}
