import React from "react";
import Topbar from "@/components/layout/Topbar";
import DashboardAnnouncementCard from "./partials/DashboardAnnouncementCard";
import ProfileProgressCard from "./partials/ProfileProgressCard";
import { useTeacherProfile } from "../TeacherProfile/components/TeacherProfileDisplayAndEditSection/hooks";

export default function TeacherDashboard() {
  const { teacherProfile, error } = useTeacherProfile();

  return (
    <main className="w-full">
      <Topbar>DASHBOARD</Topbar>
      <section className="flex flex-col gap-4 p-4 md:flex-row">
        <ProfileProgressCard />
        <DashboardAnnouncementCard />
      </section>
    </main>
  );
}
